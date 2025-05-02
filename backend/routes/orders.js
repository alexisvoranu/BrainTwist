import express from "express";
import * as orderController from "../controllers/orders.js";

export const router = express.Router();

router.get("/getAllOrders/:clientId", orderController.getAllOrders);

router.get(
  "/getAllOrdersFromAllClients",
  orderController.getAllOrdersFromAllClients
);

router.get(
  "/getOrderDetails/:clientId/:orderId",
  orderController.getOrderDetails
);

router.post("/createOrder", orderController.createOrder);

router.post("/sendOrderEmail", async (req, res) => {
  const orderDetails = req.body;

  await orderController.sendOrderEmail(orderDetails);

  res.status(200).json({ message: "Email trimis cu succes!" });
});

router.post("/createPaymentIntent", orderController.createPaymentIntent);

router.post("/generateInvoice", orderController.generateInvoice);

router.patch("/update/:clientId/:orderId", orderController.updateOrder);
