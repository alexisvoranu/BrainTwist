import React, { useState, useEffect } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import { NavbarHome } from "../../../Components/Client/Navbar";
import Footer from "../../../Components/Footer";
import InvoiceButton from "../../../Components/Invoice";
const { DateTime } = require("luxon");

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const productsCost = order.products.reduce((total, puzzle) => {
    return total + puzzle.price * puzzle.quantity;
  }, 0);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

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
        return "bg-secondary";
    }
  }

  return (
    <div>
      <NavbarHome />
      <div style={{ paddingTop: "3vw" }}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
          integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
          crossorigin="anonymous"
        />
        <div className="container" style={{ scale: "90%" }}>
          <div className="row">
            <div className="col-12">
              <div className="card-320534">
                <div className="card-320534-body" style={{ padding: "2rem" }}>
                  <div className="invoice-title d-flex justify-content-between align-items-center">
                    <h4 className="font-size-15 m-0">
                      Comanda <b>#{order.orderId}</b>
                    </h4>
                    <span
                      style={{ fontSize: "1.1rem" }}
                      className={`badge font-size-12 ms-2 ${getBadgeClass(
                        order.orderState
                      )}`}
                    >
                      {order.orderState}
                    </span>
                  </div>
                  <hr className="my-4" />
                  <div className="row">
                    <div className="col-sm-6 col-12">
                      <div className="text-muted">
                        <h4
                          className="font-size-15 mb-2"
                          style={{ color: "black" }}
                        >
                          Detalii de facturare
                        </h4>
                        <h5 className="font-size-12 mb-2">
                          {userDetails?.surname} {userDetails?.name}
                        </h5>
                        <p className="mb-1">{order.shippingAddress}</p>
                        <p className="mb-1">{userDetails?.email}</p>
                        <p>{userDetails?.phone}</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-12 text-sm-end">
                      <div className="mt-4">
                        <h5 className="font-size-15 mb-1">Data facturării</h5>
                        <p>
                          {DateTime.fromISO(order.orderDate, { zone: "UTC" })
                            .setZone("Europe/Bucharest")
                            .minus({ hours: 3 })
                            .toFormat("dd.LL.yyyy, HH:mm")}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-size-15 mb-1">
                          Modalitatea de plată
                        </h5>
                        <p>{order.paymentType}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="py-2">
                    <h5 className="font-size-15">Sumarul comenzii</h5>
                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap table-centered mb-0">
                        <thead>
                          <tr>
                            <th>Nr. crt.</th>
                            <th>Denumire produs</th>
                            <th className="text-center">Preț unitar</th>
                            <th className="text-center">Cantitate</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((puzzle, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <div>
                                  <h6 className="text-truncate font-size-14 mb-1">
                                    {puzzle.name}
                                  </h6>
                                </div>
                              </td>
                              <td className="text-center">
                                {puzzle.price.toFixed(2)}
                              </td>
                              <td className="text-center">{puzzle.quantity}</td>
                              <td className="text-end">
                                {(puzzle.price * puzzle.quantity).toFixed(2)}{" "}
                                <b>ron</b>
                              </td>
                            </tr>
                          ))}

                          <tr>
                            <th scope="row" colspan="4" className="text-end">
                              Subtotal produse
                            </th>
                            <td className="text-end">
                              {productsCost.toFixed(2)} <b>ron</b>
                            </td>
                          </tr>
                          {order.discount < 1 && (
                            <tr>
                              <th scope="row" colspan="4" className="text-end">
                                Reducere
                              </th>
                              <td className="text-end">
                                {(productsCost * (1 - order.discount)).toFixed(
                                  2
                                )}{" "}
                                <b>ron</b>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <th scope="row" colspan="4" className="text-end">
                              Preț transport
                            </th>
                            <td className="text-end">
                              {(
                                order.totalValue -
                                productsCost * order.discount
                              ).toFixed(2)}{" "}
                              <b>ron</b>
                            </td>
                          </tr>

                          <tr>
                            <th
                              scope="row"
                              colspan="4"
                              className="border-0 text-end"
                            >
                              Total
                            </th>
                            <td className="border-0 text-end">
                              <h4 className="m-0 fw-semibold">
                                {order.totalValue.toFixed(2)} ron
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <InvoiceButton
                        order={order}
                        userDetails={userDetails}
                        productsCost={productsCost}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
