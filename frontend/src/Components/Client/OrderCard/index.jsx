import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { DateTime } = require("luxon");

const OrderCard = ({ order, acordaRecenzie, orderDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [hasFeedback, setHasFeedback] = useState(null);
  const navigate = useNavigate();

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  function getBadgeClass(state) {
    switch (state) {
      case "Confirmată":
        return "bg-success";
      case "Plată respinsă":
        return "bg-danger";
      case "În pregătire":
        return "bg-warning";
      case "Predată curierului":
        return "bg-primary";
      default:
        return "bg-dark";
    }
  }

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  return (
    <div className="container" key={order.id}>
      <div className="card-6ad47a mb-4">
        <div className="card-6ad47a-body">
          <div className="d-flex flex-column flex-lg-row">
            <div className="row flex-fill">
              <div className="col-sm-5">
                <h3 className="h5">
                  Comanda{" "}
                  <i>
                    <small>{order.orderId}</small>
                  </i>
                </h3>
                <span className="badge bg-secondary">
                  {DateTime.fromISO(order.orderDate, { zone: "UTC" })
                    .setZone("Europe/Bucharest")
                    .minus({ hours: 3 })
                    .toFormat("dd.LL.yyyy, HH:mm")}
                </span>
                &nbsp; &nbsp;
                <span className="badge bg-info">
                  {order.totalValue.toFixed(2)} ron
                </span>
              </div>
              <div className="col-sm-2 py-2">
                <span
                  className={`badge font-size-12 ms-2 ${getBadgeClass(
                    order.orderState
                  )}`}
                >
                  {order.orderState}
                </span>
              </div>
              <div className="col-sm-5 text-lg-end">
                {order.orderState === "Finalizată" && hasFeedback === false && (
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => acordaRecenzie(order)}
                  >
                    Acordă o recenzie
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => orderDetails(order)}
                >
                  Vezi detalii
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
