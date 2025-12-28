import { db } from "../firebase.js";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import { DateTime } from "luxon";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllOrders = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const ordersRef = collection(db, "clients", clientId, "orders");

    const querySnapshot = await getDocs(ordersRef);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "No orders found" });
    }

    const orders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        orderId: doc.id,
        products: data.products,
        totalValue: data.totalValue,
        orderDate: data.orderDate.toDate(),
        orderState: data.orderState,
        shippingAddress: data.shippingAddress,
        paymentType: data.paymentType,
        discount: data.discount,
      };
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrdersFromAllClients = async (req, res) => {
  try {
    const clientsRef = collection(db, "clients");
    const clientsSnapshot = await getDocs(clientsRef);

    if (clientsSnapshot.empty) {
      return res.status(404).json({ error: "No clients found" });
    }

    let allOrders = [];

    for (const clientDoc of clientsSnapshot.docs) {
      const clientId = clientDoc.id;
      const ordersRef = collection(db, "clients", clientId, "orders");
      const ordersSnapshot = await getDocs(ordersRef);

      if (!ordersSnapshot.empty) {
        const orders = ordersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            clientId,
            orderId: doc.id,
            products: data.products,
            totalValue: data.totalValue,
            orderDate: data.orderDate.toDate(),
            orderState: data.orderState,
            shippingAddress: data.shippingAddress,
            paymentType: data.paymentType,
            discount: data.discount,
          };
        });

        allOrders = [...allOrders, ...orders];
      }
    }

    if (allOrders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error getting all orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { clientId, orderId } = req.params;

    if (!clientId || !orderId) {
      return res
        .status(400)
        .json({ error: "Client ID and Order ID are required" });
    }
    const orderRef = doc(db, "clients", clientId, "orders", orderId);

    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderData = orderDoc.data();

    const orderDetails = {
      orderId: orderDoc.id,
      products: orderData.products,
      totalValue: orderData.totalValue,
      orderDate: orderData.orderDate.toDate(),
      discount: orderData.discount,
    };

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error getting order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateRandomId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export const createOrder = async (req, res) => {
  try {
    const {
      clientId,
      shippingAddress,
      orderState,
      paymentType,
      discount,
      totalValue,
    } = req.body;

    if (
      !clientId ||
      !shippingAddress ||
      !orderState ||
      !paymentType ||
      !totalValue
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartCollectionRef = collection(db, "clients", clientId, "cart");
    const querySnapshot = await getDocs(cartCollectionRef);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "No products found in cart" });
    }

    const cartProducts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        puzzleId: doc.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      };
    });

    const ordersCollectionRef = collection(db, "clients", clientId, "orders");
    const orderId = generateRandomId();

    const orderData = {
      orderId,
      products: cartProducts,
      totalValue,
      orderDate: new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Bucharest" })
      ),
      shippingAddress,
      orderState,
      paymentType,
      discount,
    };

    const orderRef = doc(ordersCollectionRef, orderId);
    await setDoc(orderRef, orderData);

    res.status(200).json({ orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { clientId, orderId } = req.params;
    const { shippingAddress, orderState, paymentType, products } = req.body;

    if (!clientId || !orderId) {
      return res.status(400).json({ error: "Missing order or client ID" });
    }

    const orderRef = doc(db, "clients", clientId, "orders", orderId);

    const orderSnapshot = await getDoc(orderRef);
    if (!orderSnapshot.exists()) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedData = {};
    if (shippingAddress) updatedData.shippingAddress = shippingAddress;
    if (orderState) updatedData.orderState = orderState;
    if (paymentType) updatedData.paymentType = paymentType;
    if (products) updatedData.products = products;

    await updateDoc(orderRef, updatedData);

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendOrderEmail = async (orderDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const totalProduse = orderDetails.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const costLivrare = orderDetails.total - totalProduse;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: orderDetails.customerEmail,
    subject: "Confirmare Comandă",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2c3e50;">Bună ziua, ${
          orderDetails.customerName
        }!</h2>
        <p>Vă mulțumim că ați ales să cumpărați de la noi! Iată detaliile comenzii dumneavoastră:</p>
        
        <h3 style="color: #3498db;">Detalii comandă:</h3>
        
          <ul>
            ${orderDetails.items
              .map(
                (item) =>
                  `<li><strong>${item.name}</strong> x${item.quantity} - <strong>${item.price} lei</strong></li>`
              )
              .join("")}
          </ul>
          
          <p><strong>Cost livrare: ${costLivrare.toFixed(2)} lei</strong></p>
          <p><strong>Total: ${orderDetails.total} lei</strong></p>
        
        <h3 style="color: #3498db;">Informații suplimentare:</h3>
        <p><strong>Număr de telefon:</strong> ${orderDetails.phone}</p>
        <p><strong>Adresa de livrare:</strong> ${
          orderDetails.shippingAddress
        }</p>
        <p><strong>Tipul de plată:</strong> ${orderDetails.paymentType}</p>
        <p><strong>Starea comenzii:</strong> ${orderDetails.orderState}</p>
        
        <br />
        ${
          orderDetails.discountCode
            ? `
          <div style="background-color: #f39c12; color: white; padding: 5px; border-radius: 5px; font-weight: bold; margin: 8px 0px;">
            <h4>Codul pentru un discount de 25%: </h4>
            <p style="font-size: 1.2rem;">${orderDetails.discountCode}</p>
          </div>
        `
            : ""
        }

        <p style="font-size: 0.9rem;">Dacă aveți orice întrebări sau nelămuriri, nu ezitați să ne contactați.</p>
        <p style="font-size: 0.9rem;">Mulțumim că ați ales să cumpărați de la noi!</p>
        
        <footer style="color: #95a5a6; font-size: 0.8rem;">
          <p>&copy; 2025 BrainTwist. Toate drepturile rezervate.</p>
        </footer>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email trimis: ", info.response);
  } catch (error) {
    console.log("Eroare la trimiterea email-ului: ", error);
  }
};

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const generateInvoice = async (req, res) => {
  const { order, userDetails, productsCost } = req.body;

  const doc = new PDFDocument({ margin: 40 });
  const filePath = path.join(__dirname, "factura.pdf");
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.font(path.join(__dirname, "..", "fonts", "DejaVuSans.ttf"));

  // === HEADER ===
  doc.fontSize(24).text("FACTURĂ FISCALĂ", { align: "center" });
  doc.moveDown(2);
  doc
    .fontSize(12)
    .text(`© 2025 BrainTwist. Toate drepturile rezervate.`, { align: "right" });
  doc.fontSize(12).text(`Număr factură: ${order.orderId}`, { align: "right" });
  const adjustedDate = DateTime.fromISO(order.orderDate, { zone: "UTC" })
    .setZone("Europe/Bucharest")
    .minus({ hours: 3 });
  const formattedDate = adjustedDate.toLocaleString(DateTime.DATETIME_SHORT);

  doc.text(`Data: ${formattedDate}`, { align: "right" });

  doc.moveDown();
  doc
    .strokeColor("#444")
    .lineWidth(1)
    .moveTo(40, doc.y)
    .lineTo(580, doc.y)
    .stroke();

  doc.moveDown();
  doc.fontSize(16).text("Detalii de facturare", { underline: true });
  doc.fontSize(12).text(`${userDetails?.surname} ${userDetails?.name}`);
  doc.text(order.shippingAddress);
  doc.text(userDetails?.email);
  doc.text(userDetails?.phone);
  doc.moveDown();

  doc.fontSize(16).text("Metoda de plată", { underline: true });
  doc.fontSize(12).text(order.paymentType);
  doc.moveDown();

  doc.fontSize(16).text("Sumar comandă", { underline: true });
  doc.moveDown();

  const startX = 40;
  const startY = doc.y;
  const columnWidths = [40, 210, 110, 50, 130];

  doc
    .strokeColor("#444")
    .lineWidth(1)
    .moveTo(startX, startY)
    .lineTo(580, startY)
    .stroke()
    .fontSize(13);

  doc.text("Nr.", startX, startY + 5, {
    width: columnWidths[0],
    align: "left",
  });
  doc.text("Denumire produs", startX + columnWidths[0], startY + 5, {
    width: columnWidths[1],
    align: "left",
  });
  doc.text(
    "Preț unitar",
    startX + columnWidths[0] + columnWidths[1],
    startY + 5,
    { width: columnWidths[2], align: "center" }
  );
  doc.text(
    "Cant.",
    startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
    startY + 5,
    { width: columnWidths[3], align: "center" }
  );
  doc.text(
    "Subtotal",
    startX +
      columnWidths[0] +
      columnWidths[1] +
      columnWidths[2] +
      columnWidths[3],
    startY + 5,
    { width: columnWidths[4], align: "right" }
  );

  doc
    .strokeColor("#444")
    .moveTo(startX, startY + 20)
    .lineTo(580, startY + 20)
    .stroke();

  let yPos = startY + 25;
  order.products.forEach((puzzle, index) => {
    if (yPos > 700) {
      doc.addPage();
      yPos = 50;
    }

    doc.text(index + 1, startX, yPos, {
      width: columnWidths[0],
      align: "left",
    });
    doc.text(puzzle.name, startX + columnWidths[0], yPos, {
      width: columnWidths[1],
      align: "left",
    });
    doc.text(
      `${puzzle.price.toFixed(2)} RON`,
      startX + columnWidths[0] + columnWidths[1],
      yPos,
      { width: columnWidths[2], align: "center" }
    );
    doc.text(
      puzzle.quantity,
      startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
      yPos,
      { width: columnWidths[3], align: "center" }
    );
    doc.text(
      `${(puzzle.price * puzzle.quantity).toFixed(2)} RON`,
      startX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3],
      yPos,
      { width: columnWidths[4], align: "right" }
    );

    yPos += 20;
  });

  doc.strokeColor("#444").moveTo(startX, yPos).lineTo(580, yPos).stroke();

  doc.moveDown();

  if (yPos > 650) {
    doc.addPage();
    yPos = 50;
  }
  yPos += 20;

  doc.text("Subtotal:", 360, yPos, { width: 120, align: "right" });
  doc.text(`${productsCost.toFixed(2)} RON`, 480, yPos, {
    width: 100,
    align: "right",
  });

  if (order.discount < 1) {
    doc.text("Reducere:", 360, yPos + 20, { width: 120, align: "right" });
    doc.text(
      `${(productsCost * (1 - order.discount)).toFixed(2)} RON`,
      480,
      yPos + 20,
      { width: 100, align: "right" }
    );
  }

  doc.text("Preț transport:", 360, yPos + 40, { width: 120, align: "right" });
  doc.text(
    `${(order.totalValue - productsCost * order.discount).toFixed(2)} RON`,
    480,
    yPos + 40,
    { width: 100, align: "right" }
  );

  doc.moveDown();
  doc
    .fontSize(16)
    .text(`Total de plată: ${order.totalValue.toFixed(2)} RON`, 360, doc.y, {
      width: 220,
      align: "right",
    });

  doc
    .strokeColor("#444")
    .moveTo(40, doc.y + 10)
    .lineTo(580, doc.y + 10)
    .stroke();

  // === FOOTER ===
  doc.moveDown();
  doc
    .fontSize(10)
    .text(
      `Aceasta este o factură generată automat. Pentru întrebări, contactați serviciul de suport.`,
      65,
      doc.y,
      { width: 480, align: "center" }
    );
  doc.moveDown(7);
  doc
    .fontSize(10)
    .text(`BrainTwist, Strada Frumoasă, Nr. 1, București.`, 40, doc.y, {
      width: 480,
      align: "left",
    });
  doc.moveDown();
  doc
    .fontSize(10)
    .text(`Telefon: 0720055759`, 40, doc.y, { width: 480, align: "left" });
  doc.moveDown();
  doc.fontSize(10).text(`Email: ax.isvoranu@gmail.com`, 40, doc.y, {
    width: 480,
    align: "left",
  });
  doc.moveDown();

  doc.end();

  stream.on("finish", () => {
    res.download(filePath, "factura.pdf", (err) => {
      if (err) {
        console.error("Eroare la descarcare:", err);
        res.status(500).send("Eroare la generarea PDF-ului.");
      }
      fs.unlinkSync(filePath);
    });
  });
};
