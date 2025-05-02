import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const getClientById = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const clientRef = doc(db, "clients", clientId);
    const clientDoc = await getDoc(clientRef);

    if (!clientDoc.exists()) {
      return res.status(404).json({ error: "Client not found" });
    }

    const clientData = clientDoc.data();

    res.status(200).json({
      id: clientId,
      name: clientData.name,
      surname: clientData.surname,
      email: clientData.email,
      phone: clientData.phone,
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getClientOrderSummary = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const ordersSnapshot = await getDocs(
      collection(db, "clients", clientId, "orders")
    );

    if (ordersSnapshot.empty) {
      return res.status(404).json({ error: "No orders found for this client" });
    }

    let totalOrders = 0;
    let totalProducts = 0;

    ordersSnapshot.forEach((orderDoc) => {
      totalOrders += 1;
      const orderData = orderDoc.data();

      orderData.products.forEach((product) => {
        totalProducts += product.quantity;
      });
    });

    res.status(200).json({
      totalOrders,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching client orders summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const { id, name, surname, email, phone, totalOrders } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    if (!name && !surname && !email && !phone) {
      return res
        .status(400)
        .json({ error: "At least one property is required to update" });
    }

    const clientRef = doc(db, "clients", id);

    const clientDoc = await getDoc(clientRef);
    if (!clientDoc.exists()) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (surname) updatedData.surname = surname;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (totalOrders) updatedData.totalOrders = totalOrders;

    await updateDoc(clientRef, updatedData);

    res.status(200).json({
      message: "Client updated successfully",
      updatedData,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
