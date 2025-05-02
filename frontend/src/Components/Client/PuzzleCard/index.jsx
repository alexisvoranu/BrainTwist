import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import StarDisplay from "../../Feedback/StarDisplay";

export const PuzzleCard = ({ puzzleDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [averageRating, setAverageRating] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const stringURL = `/${puzzleDetails.name}.jpg`;

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    fetch(
      `${SERVER_URL}/feedbacks/getAverageRating/${puzzleDetails?.puzzleType}/${
        puzzleDetails?.collection
      }/${puzzleDetails?.productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAverageRating(data.averageRating);
      })
      .catch((error) => {
        console.error("Internal error:", error);
      });
  });

  useEffect(() => {
    if (userDetails) {
      fetch(
        `${SERVER_URL}/favorites/isProductInFavorites/${userDetails.id}/${
          puzzleDetails.productId
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          const favorita = data.isFavorite;
          setIsFavorite(favorita);
        })
        .catch((error) => {
          console.error("Internal error", error);
        });
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(
        favorites.some((fav) => fav.productId === puzzleDetails.productId)
      );
    }
  }, [userDetails, puzzleDetails.productId]);

  const handlePuzzleDetails = () => {
    navigate("/client/puzzleDetails", {
      state: {
        puzzleDetails,
      },
    });
  };

  const saveProductLocallyIfNoUser = (puzzle, isFavorite, setIsFavorite) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(
      (fav) => fav.productId === puzzle.productId
    );
    if (index !== -1) {
      favorites.splice(index, 1);
      setIsFavorite(false);
    } else {
      favorites.push(puzzle);
      setIsFavorite(true);
    }
    const updatedFavorites = favorites.map((fav) => ({
      ...fav,
      id: fav.productId,
      subCollection: fav.collection,
    }));

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleFavoriteToggle = () => {
    if (!userDetails) {
      saveProductLocallyIfNoUser(puzzleDetails, isFavorite, setIsFavorite);
    } else {
      if (!userDetails) {
        toast.warn(
          "Este necesar să fii autentificat pentru a adăuga săli la favorite.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return;
      }

      if (isFavorite) {
        const url = `${SERVER_URL}/favorites/deleteProductFromFavorites/${
          userDetails.id
        }/${puzzleDetails.productId}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              setIsFavorite(!isFavorite);
            } else {
              console.error("Internal error:", res.statusText);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        const puzzle = {
          clientId: userDetails.id,
          puzzleId: puzzleDetails.productId,
          puzzleName: puzzleDetails.name,
          price: puzzleDetails.price,
          subCollection: puzzleDetails.collection,
          puzzleType: puzzleDetails.puzzleType,
        };

        fetch(`${SERVER_URL}/favorites/saveProductToFavorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(puzzle),
        })
          .then((res) => {
            if (res.ok) {
              setIsFavorite(true);
            }
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    }
  };

  return (
    <div className="card">
      <div
        className="card-img-wrapper"
        onClick={handlePuzzleDetails}
        style={{ cursor: "pointer" }}
      >
        <img src={stringURL} className="card-img" alt={puzzleDetails.name} />
      </div>
      <div className="card-body">
        <button
          className="btn btn-warning btn-top-right"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? (
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bookmark-heart"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
              />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
          )}
        </button>
        <h5
          className="card-title"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {puzzleDetails.name}
        </h5>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ margin: "5px 0" }}>
              <b>{puzzleDetails.brand}</b>
            </p>
          </div>
          <StarDisplay rating={Math.ceil(averageRating)} />
        </div>

        <p
          className={
            puzzleDetails.stock > 8
              ? "text-success"
              : puzzleDetails.stock > 0
              ? "text-warning"
              : "text-danger"
          }
          style={{
            marginTop: "0.5rem",
          }}
        >
          {puzzleDetails.stock > 8
            ? "Produs disponibil"
            : puzzleDetails.stock === 1
            ? "Ultimul produs în stoc"
            : puzzleDetails.stock > 1 && puzzleDetails.stock <= 8
            ? "Ultimele bucăți în stoc"
            : "Produs indisponibil"}
        </p>
        <p
          className="card-text locatie"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b>{puzzleDetails.price} ron</b>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};
