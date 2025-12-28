import express from "express";
import * as favoriteController from "../controllers/favorites.js";

export const router = express.Router();

router.get("/isProductInFavorites/:clientId/:puzzleId", favoriteController.isProductInFavorites);

router.get("/getAllFavoriteProducts/:clientId", favoriteController.getAllFavoriteProducts);

router.post("/saveProductToFavorites", favoriteController.saveProductToFavorites);

router.delete("/deleteProductFromFavorites/:clientId/:puzzleId", favoriteController.deleteProductFromFavorites);
