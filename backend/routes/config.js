import express from "express";

import { router as cartRouter } from "./carts.js";
import { router as orderRouter } from "./orders.js";
import { router as productRouter } from "./products.js";
import { router as favoriteRouter } from "./favorites.js";
import { router as feedbackRouter } from "./feedbacks.js";
import { router as userRouter } from "./users.js";

export const router = express.Router();

router.use("/carts", cartRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/favorites", favoriteRouter);
router.use("/feedbacks", feedbackRouter);
router.use("/users", userRouter);