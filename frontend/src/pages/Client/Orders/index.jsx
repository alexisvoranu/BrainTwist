import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import { NavbarHome } from "../../../Components/Client/Navbar";
import OrderCard from "../../../Components/Client/OrderCard";
import Footer from "../../../Components/Footer";

const Orders = () => {
  const [ordersList, setOrdersList] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  const orderDetails = (order) => {
    navigate("/client/orderDetails", { state: { order } });
  };

  const acordaRecenzie = (order) => {
    navigate("/client/creeazaRecenzie", { state: { order } });
  };

  const getOrders = () => {
    if (userDetails) {
      setLoading(true);
      fetch(`${SERVER_URL}/orders/getAllOrders/${userDetails?.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrdersList(data);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (userDetails) {
      getOrders();
    }
  }, [userDetails]);

  return (
    <div>
      <div className="main-organizer">
        <NavbarHome />
        <h1 style={{ padding: "3rem" }}>Comenzile mele</h1>
        {loading ? (
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            Se încarcă lista de comenzi...
          </h5>
        ) : ordersList && ordersList.length > 0 ? (
          <div>
            <div className="listaRezervari" style={{ paddingBottom: "5rem" }}>
              {[...ordersList]
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                .map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    acordaRecenzie={acordaRecenzie}
                    orderDetails={orderDetails}
                  />
                ))}
            </div>
            <Footer />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <h5
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              Nu ai plasat nicio comandă.
            </h5>

            <div style={{ flexGrow: 1 }} />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export { Orders };
