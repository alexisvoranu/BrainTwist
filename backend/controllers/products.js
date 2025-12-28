import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const getAllProducts = async (req, res) => {
  try {
    const puzzlesRef = collection(db, "puzzles");
    const puzzleSnapshot = await getDocs(puzzlesRef);

    if (puzzleSnapshot.empty) {
      return res.status(404).json({ error: "No puzzles found" });
    }

    let allProducts = [];
    const subCollections = [
      "2x2",
      "3x3",
      "4x4",
      "5x5",
      "6x6",
      "7x7",
      "500",
      "1000",
      "2000",
      "3000",
      "5000",
      "Metal",
      "Plastic",
      "Lemn",
    ];

    for (const puzzleDoc of puzzleSnapshot.docs) {
      const puzzleType = puzzleDoc.id;

      for (const subCollectionName of subCollections) {
        const productsRef = collection(
          db,
          "puzzles",
          puzzleType,
          subCollectionName
        );
        const productsSnapshot = await getDocs(productsRef);

        productsSnapshot.docs.forEach((productDoc) => {
          const productData = productDoc.data() || {};

          allProducts.push({
            path: `/puzzles/${puzzleType}/${subCollectionName}/${productDoc.id}`,
            puzzleType,
            collection: subCollectionName,
            productId: productDoc.id,
            ...Object.fromEntries(
              Object.entries(productData).map(([key, value]) => [
                key,
                value ?? null,
              ])
            ),
          });
        });
      }
    }

    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { puzzleType, subCollectionName, productId } = req.params;

    if (!puzzleType || !subCollectionName || !productId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const productRef = doc(
      db,
      "puzzles",
      puzzleType,
      subCollectionName,
      productId
    );
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productData = productDoc.data() || {};
    res.status(200).json({
      path: `/puzzles/${puzzleType}/${subCollectionName}/${productId}`,
      puzzleType,
      collection: subCollectionName,
      productId: productDoc.id,
      ...Object.fromEntries(
        Object.entries(productData).map(([key, value]) => [key, value ?? null])
      ),
    });
  } catch (error) {
    console.error("Error getting product by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductsByPuzzleType = async (req, res) => {
  try {
    const { puzzleType } = req.params;

    if (!puzzleType) {
      return res.status(400).json({ error: "Missing puzzle type" });
    }

    const subCollections = [
      "2x2",
      "3x3",
      "4x4",
      "5x5",
      "6x6",
      "7x7",
      "500",
      "1000",
      "2000",
      "3000",
      "5000",
      "Metal",
      "Plastic",
      "Lemn",
    ];

    let allProducts = [];

    for (const subCollectionName of subCollections) {
      const productsRef = collection(
        db,
        "puzzles",
        puzzleType,
        subCollectionName
      );
      const productsSnapshot = await getDocs(productsRef);

      productsSnapshot.docs.forEach((productDoc) => {
        const productData = productDoc.data() || {};

        allProducts.push({
          path: `/puzzles/${puzzleType}/${subCollectionName}/${productDoc.id}`,
          puzzleType,
          collection: subCollectionName,
          productId: productDoc.id,
          ...Object.fromEntries(
            Object.entries(productData).map(([key, value]) => [
              key,
              value ?? null,
            ])
          ),
        });
      });
    }

    if (allProducts.length === 0) {
      return res
        .status(404)
        .json({ error: `No products found for puzzle type: ${puzzleType}` });
    }

    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error getting products by puzzle type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductsBySubCollection = async (req, res) => {
  try {
    const { puzzleType, subCollectionName } = req.params;

    if (!puzzleType || !subCollectionName) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const validSubCollections = [
      "2x2",
      "3x3",
      "4x4",
      "5x5",
      "6x6",
      "7x7",
      "500",
      "1000",
      "2000",
      "3000",
      "5000",
      "Metal",
      "Plastic",
      "Lemn",
    ];

    if (!validSubCollections.includes(subCollectionName)) {
      return res.status(400).json({ error: "Invalid subcollection name" });
    }

    const productsRef = collection(
      db,
      "puzzles",
      puzzleType,
      subCollectionName
    );
    const productsSnapshot = await getDocs(productsRef);

    if (productsSnapshot.empty) {
      return res.status(404).json({
        error: `No products found in ${puzzleType}/${subCollectionName}`,
      });
    }

    let allProducts = productsSnapshot.docs.map((productDoc) => {
      const productData = productDoc.data() || {};

      return {
        path: `/puzzles/${puzzleType}/${subCollectionName}/${productDoc.id}`,
        puzzleType,
        collection: subCollectionName,
        productId: productDoc.id,
        ...Object.fromEntries(
          Object.entries(productData).map(([key, value]) => [
            key,
            value ?? null,
          ])
        ),
      };
    });

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(
      "Error getting products by puzzle type and subcollection:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      puzzleType,
      subCollectionName,
      brand,
      name,
      price,
      description,
      stock,
      ...rest
    } = req.body;

    if (!puzzleType || !subCollectionName || !brand || !name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const productId = `${new Date().getTime()}-${Math.random()
      .toString(36)
      .substring(7)}`;
    const productRef = doc(
      db,
      "puzzles",
      puzzleType,
      subCollectionName,
      productId
    );

    const productData = {
      brand,
      name,
      price,
      stock,
      ...rest,
    };

    await setDoc(productRef, productData);

    res
      .status(201)
      .json({ message: "Puzzle added successfully", id: productId });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const { puzzleType, subCollectionName, productId } = req.params;
    const updatedData = req.body;

    if (!puzzleType || !subCollectionName || !productId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const productRef = doc(
      db,
      "puzzles",
      puzzleType,
      subCollectionName,
      productId
    );
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return res.status(404).json({ error: "Product not found" });
    }

    await updateDoc(productRef, updatedData);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
