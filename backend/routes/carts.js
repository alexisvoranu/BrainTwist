import express from "express";
import * as cartController from "../controllers/carts.js";

export const router = express.Router();

router.get("/getCartProducts/:clientId", cartController.getCartProducts);

router.post("/addProductToCart", cartController.addProductToCart);

router.patch("/updateCart", cartController.updateCart);

router.delete("/deleteProductFromCart", cartController.deleteProductFromCart);

router.delete("/clearCart/:clientId", cartController.clearCart);


