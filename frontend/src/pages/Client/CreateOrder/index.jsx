import { SERVER_URL } from "../../../constants";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarHome } from "../../../Components/Client/Navbar";

const CreateOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalWithDiscount = 0, discountTotal = 1 } = location.state || {};
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [productList, setProductList] = useState([]);
  const [discount5Code, setDiscount5Code] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
      const parsedDetails = JSON.parse(storedUserDetails);
      setName(parsedDetails.name || "");
      setSurname(parsedDetails.surname || "");
      setEmail(parsedDetails.email || "");
      setPhone(parsedDetails.phone || "");
      if (parsedDetails.totalOrders === 4) setDiscount5Code("PUZZLE25" || "");
    }

    const savedOrderDetails = localStorage.getItem("orderDetails");
    if (savedOrderDetails) {
      const parsedDetails = JSON.parse(savedOrderDetails);
      setShippingAddress(parsedDetails.shippingAddress || "");
      setPaymentType(parsedDetails.paymentType || "");
      setName(parsedDetails.name || "");
      setSurname(parsedDetails.surname || "");
      setEmail(parsedDetails.email || "");
      setPhone(parsedDetails.phone || "");
    }
  }, []);

  useEffect(() => {
    if (!userDetails) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setProductList(localCart);
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetch(`${SERVER_URL}/carts/getCartProducts/${userDetails.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProductList(data);
          }
        });
    }
  }, [userDetails]);

  const handleNavigate = () => {
    navigate("/client/myCart", {
      state: { totalWithDiscount: totalWithDiscount },
    });
    localStorage.removeItem("orderDetails");
  };

  const onChangeShippingAddress = (event) => {
    setShippingAddress(event.target.value);
  };

  const onChangePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeSurname = (event) => {
    setSurname(event.target.value);
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
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

          localStorage.removeItem("orderDetails");
          localStorage.removeItem("cart");

          if (userDetails) {
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
          }
        } catch (error) {
          console.error(`Error updating product ${product.puzzleId}:`, error);
        }
      });

      await Promise.all(updateRequests);

      console.log("Order and products updated successfully!");
    } catch (error) {
      console.error("Error updating order and products:", error);
    }
  };

  const handleFinishOrder = async (event) => {
    event.preventDefault();
    let orderId = 0;

    if (!shippingAddress || shippingAddress === "") {
      toast.error("Vă rugăm completați adresa de livrare.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!paymentType || paymentType === "") {
      toast.error("Vă rugăm selectați tipul de plată.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (userDetails) {
      try {
        const createURL = SERVER_URL + `/orders/createOrder`;

        const orderDetails = {
          clientId: userDetails?.id,
          shippingAddress: shippingAddress,
          paymentType: paymentType,
          totalValue: Number(totalWithDiscount.toFixed(2)),
          discount: discountTotal.toFixed(2),
        };

        orderDetails.orderState =
          orderDetails.paymentType === "Card online"
            ? "Plată în așteptare"
            : "Confirmată";

        const res = await fetch(createURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        const data = await res.json();
        orderId = data.orderId;

        if (res.status === 200) {
          const orderDetails = {
            customerName: userDetails?.name,
            surname: userDetails?.surname,
            customerEmail: userDetails?.email,
            phone: userDetails?.phone,
            shippingAddress: shippingAddress,
            paymentType: paymentType,
            total: totalWithDiscount.toFixed(2),
            discountCode: discount5Code,
            items: productList.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: (item.price * item.quantity * discountTotal).toFixed(2),
            })),
          };

          orderDetails.orderState =
            orderDetails.paymentType === "Card online"
              ? "Plată în așteptare"
              : "Confirmată";

          fetch(`${SERVER_URL}/orders/sendOrderEmail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          })
            .then((response) => response.json())
            .then((data) => {
              if (paymentType !== "Card online") {
                toast.success("Comanda a fost finalizată cu succes.", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

                setTimeout(() => {
                  navigate("/client/orders");
                }, 5000);
              }
            })
            .catch((error) => {
              console.error("Eroare la trimiterea email-ului:", error);
            });
        } else {
          alert("A apărut o eroare la crearea comenzii!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const orderDetails = {
        customerName: name,
        surname: surname,
        customerEmail: email,
        phone: phone,
        shippingAddress: shippingAddress,
        paymentType: paymentType,
        total: totalWithDiscount.toFixed(2),
        discountCode: discount5Code,
        items: productList.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: (item.price * item.quantity * discountTotal).toFixed(2),
        })),
      };

      orderDetails.orderState =
        orderDetails.paymentType === "Card online"
          ? "Plată în așteptare"
          : "Confirmată";

      fetch(`${SERVER_URL}/orders/sendOrderEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          if (paymentType !== "Card online") {
            toast.success("Comanda a fost finalizată cu succes.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              navigate("/client/orders");
            }, 5000);
          }
        })
        .catch((error) => {
          console.error("Eroare la trimiterea email-ului:", error);
        });
    }

    if (paymentType === "Card online") {
      navigate("/client/checkout", {
        state: {
          totalWithDiscount,
          orderId,
          productList,
          discountTotal,
        },
      });
      const orderDetails = {
        shippingAddress,
        surname,
        name,
        paymentType,
        email,
        phone,
      };
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    } else {
      updateOrderAndProducts();
    }
  };

  return (
    <div>
      <NavbarHome />
      <div
        className="form-966c7d-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form className="form-966c7d" onSubmit={handleFinishOrder}>
          <p style={{ marginBottom: "3rem" }} className="form-966c7d-title">
            Finalizare comandă
          </p>

          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }}>Nume</label>
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                value={surname}
                onChange={onChangeSurname}
              />
            </div>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }}>Prenume</label>
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                onChange={onChangeName}
                value={name}
              />
            </div>
          </div>

          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }}>Număr de telefon</label>
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                onChange={onChangePhone}
                value={phone}
              />
            </div>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }}>Email</label>
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                onChange={onChangeEmail}
                value={email}
              />
            </div>
          </div>

          <div className="input-container">
            <label style={{ marginLeft: "0.9rem" }}>Adresă de livrare</label>
            <input
              required
              type="text"
              className="form-control"
              value={shippingAddress}
              onChange={onChangeShippingAddress}
              style={{ margin: "0.75rem", width: "96%" }}
            />
          </div>

          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }} for="inputEmail4">
                Total de plată
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                value={totalWithDiscount.toFixed(2)}
                style={{ marginBottom: "0.75rem" }}
              />
            </div>
            <div className="col-12 col-md-6">
              <label style={{ marginBottom: "0.5rem" }}>Tipul de plată</label>
              <select
                required
                className="form-control"
                onChange={onChangePaymentType}
                style={{ marginBottom: "0.75rem" }}
                value={paymentType}
              >
                <option value="">Selectează tipul de plată</option>
                <option value="Ramburs">Ramburs</option>
                <option value="Card online">Card online</option>
                <option value="Card la locație">
                  Card la primirea comenzii
                </option>
              </select>
            </div>
          </div>

          <button
            className="submit"
            type="submit"
            style={{ marginTop: "1rem" }}
            onClick={handleFinishOrder}
          >
            Plasează comanda
          </button>
          <div className="mt-2">
            <button
              style={{
                color: "#4F46E5",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleNavigate}
            >
              Revizuiește coșul de cumpărături
            </button>
          </div>
        </form>

        {alert.show && (
          <div
            className={`alert ${alert.type} d-flex align-items-center`}
            role="alert"
          >
            <div>{alert.message}</div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export { CreateOrder };
