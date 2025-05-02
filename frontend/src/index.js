import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./pages/Auth/Register";
import { Puzzles } from "./pages/Client/Puzzles";
import { PuzzleDetails } from "./pages/Client/PuzzleDetails";
import { MyCart } from "./pages/Client/MyCart";
import { CreateOrder } from "./pages/Client/CreateOrder";
import Favorites from "./pages/Client/Favorites";
import { Orders } from "./pages/Client/Orders";
import OrderDetails from "./pages/Client/OrderDetails";
import { MyFeedbacks } from "./pages/Client/MyFeedbacks";
import Checkout from "./pages/Client/Checkout";
import { CreateFeedback } from "./pages/Client/CreateFeedback";
import { AdminHome } from "./pages/Admin/Home";
import AdminOrderDetails from "./pages/Admin/OrderDetails";
import { MyAccount } from "./pages/Client/MyAccount";
import HomePage from "./pages/Home/Home";
import TransportPage from "./pages/Home/Shipping";
import AboutUs from "./pages/Home/AboutUs";
import Return from "./pages/Home/Return";
import DataProcessing from "./pages/Home/DataProcessing";
import { PuzzlesAdmin } from "./pages/Admin/Puzzles";
import { PuzzleDetailsAdmin } from "./pages/Admin/PuzzleDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shipping" element={<TransportPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/return" element={<Return />} />
      <Route path="/dataProcessing" element={<DataProcessing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/client/Rubik/*" element={<Puzzles />} />
      <Route path="/client/Jigsaw/*" element={<Puzzles />} />
      <Route path="/client/IQ/*" element={<Puzzles />} />
      <Route path="/client/puzzleDetails" element={<PuzzleDetails />} />
      <Route path="/client/puzzleDetails/:puzzleId" element={<PuzzleDetails />} />
      <Route path="/client/myCart" element={<MyCart />} />
      <Route path="/client/createOrder" element={<CreateOrder />} />
      <Route path="/client/favorites" element={<Favorites />} />
      <Route path="/client/orders" element={<Orders />} />
      <Route path="/client/orderDetails" element={<OrderDetails />} />
      <Route path="/client/myFeedbacks" element={<MyFeedbacks />} />
      <Route path="/client/checkout" element={<Checkout />} />
      <Route path="/client/createFeedback" element={<CreateFeedback />} />
      <Route path="/client/account" element={<MyAccount />} />
      <Route path="/admin/dashboard" element={<AdminHome />} />
      <Route path="/admin/orderDetails" element={<AdminOrderDetails />} />
      <Route path="/admin/Rubik/*" element={<PuzzlesAdmin />} />
      <Route path="/admin/Jigsaw/*" element={<PuzzlesAdmin />} />
      <Route path="/admin/IQ/*" element={<PuzzlesAdmin />} />
      <Route path="/admin/puzzleDetails" element={<PuzzleDetailsAdmin />} />
    </Routes>
  </Router>
);
