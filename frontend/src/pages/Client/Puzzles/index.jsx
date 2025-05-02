import React, { useState, useEffect } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { NavbarHome } from "../../../Components/Client/Navbar";
import { PuzzleCard } from "../../../Components/Client/PuzzleCard";
import { useLocation } from "react-router-dom";
import Footer from "../../../Components/Footer";
import SideBar from "../../../Components/Client/SideBar";

const Puzzles = () => {
  const [puzzleList, setPuzzleList] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(puzzleList);
  const handleViewSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

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
        setFilteredProducts(data);
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
      <NavbarHome />
      <div className={`content ${sidebarOpen ? "open" : ""}`}>
        <SideBar
          isOpen={sidebarOpen}
          toggleSidebar={handleViewSidebar}
          products={puzzleList}
          setFilteredProducts={setFilteredProducts}
        />
        <h6
          id="complete"
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            marginTop: "3rem",
            whiteSpace: "normal",
            wordWrap: "break-word",
            display: "block",
            width: "100%",
            padding: "0 10px",
          }}
        >
          La achiziția unui set complet&nbsp;<b>(Puzzle + Rubik + IQ)</b>
          &nbsp;beneficiați de 20% reducere 🥳
        </h6>
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
              {filteredProducts.map((puzzle) => (
                <PuzzleCard key={puzzle.id} puzzleDetails={puzzle} />
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
      </div>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </div>
  );
};

export { Puzzles };
