import React from "react";

const OrderCard = ({ orders, title, orderDetails, handleChangeState }) => {
  return (
    <div className="listaRezervarii" style={{ paddingBottom: "3rem" }}>
      {title && <h2 style={{ padding: "3rem" }}>{title}</h2>}
      {orders.map((order) => (
        <div className="container" key={order.orderId}>
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
                    <span className="badge bg-dark">
                      {new Date(order.orderDate).toLocaleString("ro-RO", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    &nbsp; &nbsp;
                    <span className="badge bg-warning">
                      {order.totalValue.toFixed(2)} ron
                    </span>
                  </div>
                  <div className="col-sm-2 py-2">
                    <span className={`badge font-size-12 ms-2 bg-info`}>
                      {order.paymentType}
                    </span>
                  </div>
                  <div className="col-sm-5 text-lg-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => orderDetails(order)}
                    >
                      Vezi detalii
                    </button>
                    {order.orderState === "Confirmată" && (
                      <>
                        &nbsp; &nbsp;
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleChangeState(order, "În pregătire")
                          }
                        >
                          Pregătește
                        </button>
                      </>
                    )}
                    {order.orderState === "În pregătire" && (
                      <>
                        &nbsp; &nbsp;
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleChangeState(order, "Predată curierului")
                          }
                        >
                          Trimite spre livrare
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
