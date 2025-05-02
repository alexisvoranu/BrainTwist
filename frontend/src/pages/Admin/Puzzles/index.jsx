import React, { useState, useEffect } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { useLocation } from "react-router-dom";
import Footer from "../../../Components/Footer";
import { PuzzleCardAdmin } from "../../../Components/Admin/PuzzleCard";
import { NavbarAdmin } from "../../../Components/Admin/Navbar";

const PuzzlesAdmin = () => {
  const [puzzleList, setPuzzleList] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const pathSegments = location.pathname.split("/").filter(Boolean);

      try {
        let data = [];
        if (pathSegments.length === 2) {
          const type = pathSegments[1];
          const response = await fetch(
            `${SERVER_URL}/products/getProductsByPuzzleType/${type}`
          );
          data = await response.json();
        } else if (pathSegments.length === 3) {
          const type = pathSegments[1];
          const size = pathSegments[2];
          const response = await fetch(
            `${SERVER_URL}/products/getProductsBySubCollection/${type}/${size}`
          );
          data = await response.json();
        }
        setPuzzleList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavbarAdmin />
      <div
        className="main-container"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "5rem",
        }}
      >
        {loading ? (
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            Se încarcă produsele...
          </h5>
        ) : puzzleList.length > 0 ? (
          <div className="puzzle-grid">
            {puzzleList.map((puzzle) => (
              <PuzzleCardAdmin key={puzzle.id} puzzleDetails={puzzle} />
            ))}
          </div>
        ) : (
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            Nu există produse disponibile
          </h5>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { PuzzlesAdmin };
