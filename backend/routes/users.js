import express from "express";
import * as userController from "../controllers/users.js";

export const router = express.Router();

router.get("/getClientById/:clientId", userController.getClientById);

router.get("/getClientOrderSummary/:clientId", userController.getClientOrderSummary);

router.patch("/update", userController.update);
