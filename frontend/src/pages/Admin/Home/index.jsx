import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import { NavbarAdmin } from "../../../Components/Admin/Navbar";
import OrderCard from "../../../Components/Admin/OrderCard";

const AdminHome = () => {
  const [puzzleList, setPuzzleList] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [comenziPredateCurierului, setComenziPredateCurierului] = useState([]);
  const [comenziConfirmate, setComenziConfirmate] = useState([]);
  const [comenziInPregatire, setComenziInPregatire] = useState([]);
  const [comenziCuPlataRespinsa, setComenziCuPlataRespinsa] = useState([]);

  const navigate = useNavigate();

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  const orderDetails = (order) => {
    navigate("/admin/orderDetails", { state: { order } });
  };

  const handleChangeState = (order, state) => {
    fetch(`${SERVER_URL}/orders/update/${order.clientId}/${order.orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderState: state }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const getAllOrders = () => {
    fetch(`${SERVER_URL}/orders/getAllOrdersFromAllClients`)
      .then((res) => res.json())
      .then((data) => {
        const orders = data;
        setPuzzleList(data);
        setComenziConfirmate(
          orders.filter((order) => order.orderState === "Confirmată")
        );
        setComenziCuPlataRespinsa(
          orders.filter((order) => order.orderState === "Plată respinsă")
        );

        setComenziInPregatire(
          orders.filter((order) => order.orderState === "În pregătire")
        );

        setComenziPredateCurierului(
          orders.filter((order) => order.orderState === "Predată curierului")
        );
      });
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (userDetails) {
      getAllOrders();
    }
  }, [userDetails]);

  return (
    <div id="backgroundGri">
      <div className="main-organizer">
        <NavbarAdmin />
        {puzzleList && puzzleList.length > 0 ? (
          <div className="puzzleList-138beb" style={{ paddingBottom: "10rem" }}>
            {comenziConfirmate.length > 0 && (
              <OrderCard
                orders={comenziConfirmate}
                title="Comenzi confirmate"
                orderDetails={orderDetails}
                handleChangeState={handleChangeState}
              />
            )}

            {comenziInPregatire.length > 0 && (
              <OrderCard
                orders={comenziInPregatire}
                title="Comenzi în pregătire"
                orderDetails={orderDetails}
                handleChangeState={handleChangeState}
              />
            )}

            {comenziPredateCurierului.length > 0 && (
              <OrderCard
                orders={comenziPredateCurierului}
                title="Comenzi predate curierului"
                orderDetails={orderDetails}
              />
            )}

            {comenziCuPlataRespinsa.length > 0 && (
              <OrderCard
                orders={comenziCuPlataRespinsa}
                title="Comenzi cu plată respinsă"
                orderDetails={orderDetails}
              />
            )}
          </div>
        ) : (
          <p style={{ padding: "5rem" }} className="no-events-message">
            Nu există nicio comandă.
          </p>
        )}
      </div>
    </div>
  );
};

export { AdminHome };
