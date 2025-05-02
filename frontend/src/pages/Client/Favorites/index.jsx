import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import { NavbarHome } from "../../../Components/Client/Navbar";
import Footer from "../../../Components/Footer";

const Favorites = () => {
  const [puzzleList, setPuzzleList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      setLoading(true);
      fetch(`${SERVER_URL}/favorites/getAllFavoriteProducts/${userDetails.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPuzzleList(data.favorites);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Internal error: ", error);
        });
    } else {
      setPuzzleList(JSON.parse(localStorage.getItem("favorites")) || []);
    }
  }, [userDetails]);

  const puzzleDetails = (puzzleDetails) => {
    fetch(
      `${SERVER_URL}/products/getProductById/${puzzleDetails.puzzleType}/${
        puzzleDetails.subCollection
      }/${puzzleDetails.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const puzzleDetails = data;
        navigate("/client/puzzleDetails", {
          state: {
            puzzleDetails,
          },
        });
      })
      .catch((error) => {
        console.error("Internal error:", error);
      });
  };

  const handleFavoriteToggle = (puzzle) => {
    if (!userDetails) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex(
        (fav) => fav.productId === puzzle.productId
      );

      if (index !== -1) {
        favorites.splice(index, 1);
        setIsFavorite(false);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      window.location.reload();
    } else {
      const url = `${SERVER_URL}/favorites/deleteProductFromFavorites/${
        userDetails.id
      }/${puzzle.id}`;

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsFavorite(!isFavorite);
            window.location.reload();
          } else {
            console.error("Eroare la gestionarea sălii:", res.statusText);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <NavbarHome />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
        integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
        crossOrigin="anonymous"
      />

      <h1 style={{ padding: "3rem" }}>Produse favorite</h1>

      <div className="puzzleList" style={{ paddingBottom: "5rem" }}>
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
          puzzleList.map((puzzle) => (
            <section className="section" key={puzzle.id}>
              <div className="containerr" style={{ padding: "0 15%" }}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="candidate-list">
                      <div className="candidate-list-box card-072c09 mt-4">
                        <div className="p-4 card-072c09-body">
                          <div className="align-items-center row">
                            <div className="col-auto">
                              <div
                                className="candidate-list-images"
                                onClick={() => puzzleDetails(puzzle)}
                              >
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={`/${puzzle.name}.jpg`}
                                  alt=""
                                  className="avatar-md img-thumbnail"
                                />
                              </div>
                            </div>
                            <div className="col-lg">
                              <div className="candidate-list-content mt mt-lg-0">
                                <div
                                  className="candidate-list-images"
                                  onClick={() => puzzleDetails(puzzle)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <h5 className="fs-19 mb-0">{puzzle.name}</h5>
                                </div>
                                <br />
                                <ul className="list-inline mb-0 text-muted">
                                  <li className="list-inline-item">
                                    începând de la&nbsp;
                                    <b>{puzzle.price} ron</b>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1" />
                            </div>
                          </div>
                          <div className="favorite-icon">
                            <button
                              className="btn btn-warning btn-top-right"
                              onClick={() => handleFavoriteToggle(puzzle)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-bookmark-heart-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
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
            Nu ai niciun produs favorit.
          </h5>
        )}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "70vh" }}
      >
        <div style={{ flexGrow: 1 }} />
        <Footer />
      </div>
    </div>
  );
};

export default Favorites;
