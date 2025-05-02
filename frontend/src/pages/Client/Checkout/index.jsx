import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51QxBG0PkU7DKJtB980ep3FCBNOlPijEJOTjiW2oqAW6cFl6vAXtVrYPBmuRMM5YV0fah6le5XvJsuUP1VZQKaXxR00HNNJKgt5"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { state } = useLocation();
  const { totalWithDiscount } = state || {};
  const { discountTotal } = state || {};
  const { orderId } = state || {};
  const { productList } = state || {};
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
    console.log(productList);
  }, []);

  const handleNavigate = () => {
    navigate("/client/createOrder", {
      state: { totalWithDiscount, discountTotal },
    });
  };

  const updateOrderAndProducts = async () => {
    try {
      const updateRequests = productList.map(async (product) => {
        try {
          const response = await fetch(
            `${SERVER_URL}/products/getProductById/${product.puzzleType}/${
              product.subcollection
            }/${product.puzzleId}`
          );

          if (!response.ok) {
            console.log(`Failed to fetch product ${product.puzzleId}`);
            return;
          }

          const productData = await response.json();
          const newStock = (productData.stock || 0) - product.quantity;

          if (newStock < 0) {
            console.log(
              `Stock insuficient pentru produsul ${product.puzzleId}`
            );
            return;
          }

          const updateResponse = await fetch(
            `${SERVER_URL}/products/update/${product.puzzleType}/${
              product.subcollection
            }/${product.puzzleId}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ stock: newStock }),
            }
          );

          const updatedUserDetails = {
            ...userDetails,
            totalOrders: userDetails.totalOrders + 1,
          };

          localStorage.setItem("user", JSON.stringify(updatedUserDetails));

          fetch(`${SERVER_URL}/users/update`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserDetails),
          });

          fetch(`${SERVER_URL}/carts/clearCart/${userDetails?.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          if (!updateResponse.ok) {
            console.log(`Failed to update product ${product.puzzleId}`);
          }
        } catch (error) {
          console.error(`Error updating product ${product.puzzleId}:`, error);
        }
      });

      await Promise.all(updateRequests);

      console.log("Order and products updated successfully!");
    } catch (error) {
      console.error("Error updating order and products:", error);
    } finally {
      localStorage.removeItem("orderDetails");
      localStorage.removeItem("cart");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/orders/createPaymentIntent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round((Number(totalWithDiscount) * 100) / 4.6),
        }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        switch (result.error.message) {
          case "Your card number is incomplete.":
          case "Numărul cardului dvs. nu este complet.":
            toast.error(`Vă rugăm completați datele cardului.`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "Your card’s expiration date is incomplete.":
          case "Data de expirare a cardului dvs. este în trecut.":
          case "Data de expirare a cardului dvs. este incompletă.":
            toast.error("Vă rugăm completați data de expirare a cardului.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "Your card’s expiration year is in the past.":
          case "Anul de expirare al cardului dvs. este în trecut.":
            toast.error(
              "Data de valabilitate a cardului este în trecut, cardul este expirat.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            break;
          case "Your card has insufficient funds. Try a different card.":
          case "Cardul dvs. are fonduri insuficiente. Încercați un alt card.":
            toast.error("Fonduri insuficiente. Vă rugăm încercați alt card.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "Your postal code is incomplete.":
          case "Codul dvs. poștal nu este complet.":
            toast.error("Vă rugăm completați codul poștal.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            break;
          case "Your card’s security code is incomplete.":
          case "Codul de securitate al cardului dvs. este incomplet.":
            toast.error(
              "Vă rugăm completați codul de securitate al cardului.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            break;
          case "We are unable to authenticate your payment method. Please choose a different payment method and try again.":
          case "Nu vă putem autentifica metoda de plată. Alegeți o altă metodă de plată și încercați din nou.":
            toast.error(
              "Autorizarea a fost respinsă. Vă rugăm încercați din nou.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            break;
          default:
            toast.error(
              "A apărut o eroare necunoscută. Te rugăm să încerci din nou.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            break;
        }

        if (userDetails) {
          fetch(`${SERVER_URL}/orders/update/${userDetails?.id}/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderState: "Plată respinsă" }),
          });
        }
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Plata a fost efectuată cu succes.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        if (userDetails) {
          fetch(`${SERVER_URL}/orders/update/${userDetails?.id}/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderState: "Confirmată" }),
          });
        }

        updateOrderAndProducts();

        setTimeout(() => {
          if (userDetails) navigate("/client/orders");
          else {
            navigate("/");
          }
        }, 5000);
      } else if (result.paymentIntent.status === "requires_payment_method") {
        toast.error("Plata a fost respinsă, încearcă alt card.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        alert("Status necunoscut al plății");
      }
    } catch (error) {
      console.log(
        "A apărut o eroare la procesarea plății. Te rugăm să încerci din nou."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Finalizează Plata</h2>

      <label>
        Email
        <input
          type="email"
          required
          placeholder="exemplu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Detalii card
        <div className="card-element-container">
          <CardElement />
        </div>
      </label>

      <label>
        Total de plată
        <div className="card-element-container">
          {totalWithDiscount.toFixed(2)}
        </div>
      </label>

      <button className="mt-2" type="submit" disabled={loading || !stripe}>
        {loading ? "Se procesează..." : "Plătește"}
      </button>

      <div className="mt-4">
        <button
          style={{
            color: "#4F46E5",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleNavigate}
        >
          Schimbă modalitatea de plată
        </button>
      </div>
    </form>
  );
};

export default function Checkout() {
  return (
    <div className="checkout-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <ToastContainer />
    </div>
  );
}
