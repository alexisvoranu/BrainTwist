import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import StarDisplay from "../../Feedback/StarDisplay";

export const PuzzleCardAdmin = ({ puzzleDetails }) => {
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
          console.log(data.isFavorite);
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
    navigate("/admin/puzzleDetails", {
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
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
              setIsFavorite(isFavorite);
              window.location.reload();
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
          {puzzleDetails.stock} produse disponibile
           
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
