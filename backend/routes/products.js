import express from "express";
import * as productController from "../controllers/products.js";

export const router = express.Router();

router.get("/getAllProducts", productController.getAllProducts);

router.get(
  "/getProductById/:puzzleType/:subCollectionName/:productId",
  productController.getProductById
);

router.get(
  "/getProductsByPuzzleType/:puzzleType",
  productController.getProductsByPuzzleType
);

router.get(
  "/getProductsBySubCollection/:puzzleType/:subCollectionName",
  productController.getProductsBySubCollection
);

router.post("/addProduct", productController.addProduct);

router.patch("/update/:puzzleType/:subCollectionName/:productId", productController.update);
