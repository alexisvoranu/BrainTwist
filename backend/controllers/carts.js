import { db } from "../firebase.js";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export const getCartProducts = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const cartRef = collection(db, "clients", clientId, "cart");
    const querySnapshot = await getDocs(cartRef);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const cartItems = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        puzzleId: doc.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        puzzleType: data.puzzleType,
        subcollection: data.subcollection,
        stock: data.stock,
      };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const {
      clientId,
      puzzleId,
      name,
      price,
      quantity,
      subcollection,
      puzzleType,
      stock,
    } = req.body;

    if (
      !clientId ||
      !puzzleId ||
      !name ||
      !price ||
      !quantity ||
      !subcollection ||
      !puzzleType ||
      !stock
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartRef = doc(db, "clients", clientId);
    const cartCollectionRef = collection(cartRef, "cart");
    const puzzleRef = doc(cartCollectionRef, puzzleId);

    const puzzleDoc = await getDoc(puzzleRef);

    if (puzzleDoc.exists()) {
      const existingQuantity = puzzleDoc.data().quantity || 0;
      await setDoc(puzzleRef, {
        name: name,
        price,
        quantity: existingQuantity + quantity,
        puzzleType,
        subcollection,
        stock,
      });
    } else {
      await setDoc(puzzleRef, {
        name: name,
        price,
        quantity,
        puzzleType,
        subcollection,
        stock,
      });
    }

    res.status(200).json({ message: "Puzzle added to cart successfully" });
  } catch (error) {
    console.error("Error adding puzzle to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { clientId, puzzleId, delta } = req.body;

    if (!clientId || !puzzleId || delta === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (delta !== 1 && delta !== -1) {
      return res
        .status(400)
        .json({ error: "Invalid value for 'delta', must be 1 or -1" });
    }

    const cartRef = doc(db, "clients", clientId, "cart", puzzleId);
    const puzzleDoc = await getDoc(cartRef);

    if (!puzzleDoc.exists()) {
      return res.status(404).json({ error: "Puzzle not found in cart" });
    }

    const currentQuantity = puzzleDoc.data().quantity || 0;

    let updatedQuantity = currentQuantity + delta;

    if (updatedQuantity < 0) {
      updatedQuantity = 0;
    }

    await setDoc(cartRef, { quantity: updatedQuantity }, { merge: true });

    res.status(200).json({
      message: `Puzzle quantity updated successfully`,
      quantity: updatedQuantity,
    });
  } catch (error) {
    console.error("Error updating puzzle quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { clientId, puzzleId } = req.body;

    if (!clientId || !puzzleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartRef = doc(db, "clients", clientId, "cart", puzzleId);
    const puzzleDoc = await getDoc(cartRef);

    if (!puzzleDoc.exists()) {
      return res.status(404).json({ error: "Puzzle not found in cart" });
    }

    await deleteDoc(cartRef);

    res.status(200).json({ message: "Puzzle removed from cart successfully" });
  } catch (error) {
    console.error("Error removing puzzle from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: "Missing client ID" });
    }

    const cartCollectionRef = collection(db, "clients", clientId, "cart");
    const querySnapshot = await getDocs(cartCollectionRef);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Cart is already empty" });
    }

    for (let doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
