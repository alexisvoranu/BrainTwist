import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarHome } from "../../../Components/Client/Navbar";
import Footer from "../../../Components/Footer";

const MyCart = () => {
  const [productList, setProductList] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [orderDiscountMessage, setOrderDiscountMessage] = useState("");
  const [order10Discount, setOrder10Discount] = useState(0);
  const [shippingType, setShippingType] = useState("NA");
  const [message, setMessage] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [categoriesDiscount, setCategoriesDiscount] = useState(0);
  const [shippingMessage, setShippingMessage] = useState("");
  const categories = ["Rubik", "Jigsaw", "IQ"];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const productCategories = new Set(
    Array.isArray(productList)
      ? productList.map((product) => product.puzzleType)
      : []
  );

  const missingCategories = categories.filter(
    (category) => !productCategories.has(category)
  );

  useEffect(() => {
    if (missingCategories.length === 0) {
      setCategoriesDiscount(0.2);
      setDiscountMessage(
        "🎉 Felicitări! Ai produse din toate categoriile și beneficiezi de 20% reducere!"
      );
    } else if (missingCategories.length === 1) {
      setCategoriesDiscount(0);
      setDiscountMessage(
        <>
          🔔 Cumpără un produs din categoria{" "}
          <strong>{missingCategories[0]}</strong> pentru a beneficia de 20%
          reducere!
        </>
      );
    } else if (missingCategories.length === 2) {
      setDiscountMessage(
        <>
          🔔 Cumpără un produs din categoriile{" "}
          <strong>{missingCategories[0]}</strong> și{" "}
          <strong>{missingCategories[1]}</strong> pentru a beneficia de 20%
          reducere!
        </>
      );
    }
  }, [productList]);

  const discountCodes = {
    DISCOUNT10: 0.1,
    SPRING15: 0.15,
    PUZZLE25: 0.25,
  };

  useEffect(() => {
    if (!userDetails) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setProductList(localCart);
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      setLoading(true);
      fetch(`${SERVER_URL}/carts/getCartProducts/${userDetails.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProductList(Array.isArray(data) ? data : []);
            setLoading(false);
          }
        });
    }
  }, [userDetails]);

  const updateCart = (newCart) => {
    setProductList(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const applyDiscount = (e) => {
    e.preventDefault();

    if (discountCodes[discountCode]) {
      setDiscount(discountCodes[discountCode]);
      const discountPercent = discountCodes[discountCode] * 100;
      setMessage(
        `Beneficiați de ${discountPercent}% reducere la prețul produselor!`
      );
    } else {
      setMessage("Codul de reducere este invalid.");
    }
  };

  const verifyFreeShipping = (productList) => {
    if (Array.isArray(productList) && productList.length > 0) {
      const total = (Array.isArray(productList) ? productList : []).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const totalProduseCuReducere =
        total *
        (1 - discount) *
        (1 - categoriesDiscount) *
        (1 - order10Discount);

      if (totalProduseCuReducere >= 250) {
        return "Transportul pentru această comandă este gratuit.";
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    if (productList) {
      const shippingMessage = verifyFreeShipping(productList);
      setShippingMessage(shippingMessage);
    }
  }, [productList, discount]);

  const total = (productList || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let totalWithDiscount =
    total * (1 - discount) * (1 - categoriesDiscount) * (1 - order10Discount);
  let costLivrare =
    totalWithDiscount >= 250
      ? 0
      : { NA: 0, Fan: 19.99, Cargus: 17.99, Sameday: 21.99 }[shippingType];
  if (userDetails?.totalOrders === 2) costLivrare = 0;
  totalWithDiscount += costLivrare;

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
      const totalOrders = JSON.parse(storedUserDetails).totalOrders;

      switch (totalOrders) {
        case 2:
          setOrderDiscountMessage(
            "La această comandă beneficiezi de transport gratuit! 🥳"
          );
          break;
        case 4:
          setOrderDiscountMessage(
            "Plasează comanda și vei primi un voucher de 25% reducere la următoarea comandă! 🥳"
          );
          break;
        case 9:
          setOrderDiscountMessage(
            "La această comandă beneficiezi de 40% reducere! 🥳"
          );
          setOrder10Discount(0.4);
          break;
        default:
          setOrderDiscountMessage("");
          break;
      }
    }
  }, []);

  const updateQuantity = (puzzleId, delta) => {
    if (userDetails) {
      fetch(`${SERVER_URL}/carts/updateCart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: userDetails.id,
          puzzleId: puzzleId,
          delta: delta,
        }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          return res.json();
        })
        .then((updatedCart) => {
          console.log("Updated cart:", updatedCart);

          setProductList((prevList) =>
            prevList.map((item) =>
              item.puzzleId === puzzleId
                ? { ...item, quantity: item.quantity + delta }
                : item
            )
          );
        })
        .catch((error) => console.error("Fetch error:", error));
    } else {
      const updatedCart = productList
        .map((item) =>
          item.puzzleId === puzzleId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeItem = (puzzleId) => {
    if (userDetails) {
      fetch(`${SERVER_URL}/carts/deleteProductFromCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: userDetails.id,
          puzzleId: puzzleId,
        }),
      })
        .then((res) => res.json())
        .then((updatedCart) => {
          setProductList(Array.isArray(updatedCart) ? updatedCart : []);
          window.location.reload();
        });
    } else {
      const updatedCart = productList.filter(
        (item) => item.puzzleId !== puzzleId
      );
      updateCart(updatedCart);
    }
  };

  const createOrder = () => {
    if (shippingType === "NA" || !shippingType) {
      toast.warn("Selectați modalitatea de livrare!", {
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
      let discountTotal =
        (1 - discount) * (1 - categoriesDiscount) * (1 - order10Discount);
      navigate("/client/createOrder", {
        state: { totalWithDiscount, discountTotal },
      });
    }
  };

  return (
    <div className="main-organizer">
      <NavbarHome />
      {loading ? (
        <h5 style={{ textAlign: "center", margin: "5% 0" }}>
          Se încarcă produsele...
        </h5>
      ) : productList.length > 0 ? (
        <>
          {discountMessage && (
            <h6 style={{ textAlign: "center", marginTop: "2rem" }}>
              {discountMessage}
            </h6>
          )}
          <div>
            <div className={`cartCard`}>
              <div className="row">
                <div className={`col-md-8 cart`}>
                  <div className={`title`}>
                    <div className="row">
                      <div className="col">
                        <h4>
                          <b>Coșul meu de cumpărături</b>
                        </h4>
                        <h6 className="pt-2">{orderDiscountMessage}</h6>
                      </div>
                    </div>
                  </div>
                  {productList.map((produs, index) => (
                    <div key={index} className="row border-top border-bottom">
                      <div className="row main align-items-center">
                        <div className="col-2">
                          <img
                            className="img-fluid"
                            src={`/${produs.name}.jpg`}
                            alt={produs.name}
                          />
                        </div>
                        <div className="col">
                          <div className="row text-muted">Puzzle</div>
                          <div className="row">{produs.name}</div>
                        </div>
                        <div className="col">
                          {produs.quantity > 1 && (
                            <a
                              style={{ cursor: "pointer" }}
                              className="quantity"
                              onClick={() =>
                                updateQuantity(produs.puzzleId, -1)
                              }
                            >
                              -
                            </a>
                          )}

                          <a href="" className="quantity">
                            {produs.quantity}
                          </a>
                          {produs.stock > 1 && (
                            <a
                              style={{ cursor: "pointer" }}
                              className="quantity"
                              onClick={() => updateQuantity(produs.puzzleId, 1)}
                            >
                              +
                            </a>
                          )}
                        </div>
                        <div className="col">
                          {produs.price.toFixed(2)} ron
                          <span
                            className="close"
                            style={{ marginLeft: "2rem", cursor: "pointer" }}
                            onClick={() => removeItem(produs.puzzleId)}
                          >
                            &#10005;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="back-to-shop">
                    <a style={{ color: "#4F46E5" }} href="/">
                      Înapoi la cumpărături
                    </a>
                  </div>
                  <div className="transport-gratuit">
                    {userDetails?.totalOrders !== 2 && (
                      <h6 className="pt-3">
                        La comenzi de peste 250 de lei beneficiezi de transport
                        gratuit! ✅
                      </h6>
                    )}
                  </div>
                </div>
                <div className="col-md-4 summary">
                  <div>
                    <h5>
                      <b>Sumarul comenzii</b>
                    </h5>
                    <p
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Prețul include toate taxele și TVA-ul aplicabil.
                    </p>

                    <hr />
                  </div>
                  <form>
                    <label style={{ marginBottom: "0.5rem" }}>Livrare</label>
                    <select
                      required
                      className="form-control"
                      onChange={(e) => setShippingType(e.target.value)}
                      value={shippingType}
                    >
                      <option value="NA">
                        Selectați modalitatea de livrare
                      </option>
                      <option value="Fan">FanCourier - 19.99 ron</option>
                      <option value="Cargus">Cargus - 17.99 ron</option>
                      <option value="Sameday">Sameday - 21.99 ron</option>
                    </select>
                    {shippingMessage && (
                      <div
                        className="mt-2"
                        style={{
                          color: "green",
                          fontSize: "13px",
                        }}
                      >
                        {shippingMessage}
                      </div>
                    )}
                    <label style={{ margin: "1.5rem 1rem 0.5rem 0" }}>
                      Introdu un cod promoțional
                    </label>
                    <div className="d-flex align-items-center w-100">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cod de reducere"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        style={{
                          marginBottom: "0",
                          marginRight: "1rem",
                          flexGrow: 1,
                        }}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={applyDiscount}
                      >
                        Aplică
                      </button>
                    </div>
                    {message && (
                      <div
                        className="mt-2"
                        style={{
                          color: message.includes("invalid") ? "red" : "green",
                          fontSize: "13px",
                        }}
                      >
                        {message}
                      </div>
                    )}
                  </form>
                  <hr />
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <div>
                        {productList &&
                          productList.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                        produse
                      </div>
                      <div>
                        {productList
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        RON
                      </div>
                    </div>
                    {(discount > 0 ||
                      categoriesDiscount > 0 ||
                      order10Discount > 0) && (
                      <div className="d-flex justify-content-between">
                        <div>Reducere:</div>
                        <div>
                          {(
                            productList.reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            ) -
                            productList.reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            ) *
                              (1 - discount) *
                              (1 - categoriesDiscount) *
                              (1 - order10Discount)
                          ).toFixed(2)}{" "}
                          RON
                        </div>
                      </div>
                    )}

                    <div className="d-flex justify-content-between">
                      <div>
                        <b>Subtotal:</b>
                      </div>
                      <div>
                        <b>
                          {(
                            productList.reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            ) *
                            (1 - discount) *
                            (1 - categoriesDiscount) *
                            (1 - order10Discount)
                          ).toFixed(2)}{" "}
                          RON
                        </b>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Costul livrării:</div>
                      <div>{costLivrare.toFixed(2)} RON</div>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <div>
                        <b>Total:</b>
                      </div>
                      <div>
                        <b>{totalWithDiscount.toFixed(2)} RON</b>
                      </div>
                    </div>
                  </div>

                  <button className="btnCart" onClick={() => createOrder()}>
                    Spre detaliile comenzii
                  </button>
                </div>
              </div>
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ textAlign: "center", margin: "5% 0" }}>
            Coșul de cumpărături este gol.
          </h5>
          <div style={{ flexGrow: 1 }} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export { MyCart };
