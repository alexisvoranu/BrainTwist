import React from "react";
import { SERVER_URL } from "../../constants";

const InvoiceButton = ({ order, userDetails, productsCost }) => {
  const handleDownload = async () => {
    const response = await fetch(`${SERVER_URL}/orders/generateInvoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, userDetails, productsCost }),
    });

    if (!response.ok) {
      console.error("Internal error.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "factura.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button className="btn btn-primary" onClick={handleDownload}>
      Descarcă Factura
    </button>
  );
};

export default InvoiceButton;
