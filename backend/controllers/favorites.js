import { db } from "../firebase.js";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export const getAllFavoriteProducts = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: clientId" });
    }

    const favoritesRef = collection(db, "clients", clientId, "favorites");
    const snapshot = await getDocs(favoritesRef);

    if (snapshot.empty) {
      return res.status(200).json({ favorites: [] });
    }

    const favorites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ favorites });
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const isProductInFavorites = async (req, res) => {
  try {
    const { clientId, puzzleId } = req.params;

    if (!clientId || !puzzleId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const puzzleRef = doc(db, "clients", clientId, "favorites", puzzleId);
    const puzzleDoc = await getDoc(puzzleRef);

    res.status(200).json({ isFavorite: puzzleDoc.exists() });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveProductToFavorites = async (req, res) => {
  try {
    const { clientId, puzzleId, puzzleName, price, puzzleType, subCollection } =
      req.body;

    if (
      !clientId ||
      !puzzleId ||
      !puzzleName ||
      !price ||
      !puzzleType ||
      !subCollection
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartRef = doc(db, "clients", clientId);
    const cartCollectionRef = collection(cartRef, "favorites");
    const puzzleRef = doc(cartCollectionRef, puzzleId);

    const puzzleDoc = await getDoc(puzzleRef);
    if (puzzleDoc.exists()) {
      await setDoc(puzzleRef, {
        name: puzzleName,
        puzzleType: puzzleType,
        subCollection: subCollection,
        price,
      });
    } else {
      await setDoc(puzzleRef, {
        name: puzzleName,
        puzzleType: puzzleType,
        subCollection: subCollection,
        price,
      });
    }

    res.status(200).json({ message: "Puzzle saved to favorites successfully" });
  } catch (error) {
    console.error("Error saving puzzle to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProductFromFavorites = async (req, res) => {
  try {
    const { clientId, puzzleId } = req.params;

    if (!clientId || !puzzleId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const puzzleRef = doc(db, "clients", clientId, "favorites", puzzleId);
    await deleteDoc(puzzleRef);

    res
      .status(200)
      .json({ message: "Puzzle removed from favorites successfully" });
  } catch (error) {
    console.error("Error deleting puzzle from favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
