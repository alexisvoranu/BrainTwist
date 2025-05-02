import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import StarDisplay from "../../../Components/Feedback/StarDisplay";
import Footer from "../../../Components/Footer";
import { NavbarAdmin } from "../../../Components/Admin/Navbar";

const PuzzleDetailsAdmin = () => {
  const [averageRating, setAverageRating] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const { state } = useLocation();
  const { puzzleId } = useParams();
  const { puzzleDetails } = state || {};
  const [puzzle, setPuzzle] = useState(puzzleDetails || null);

  const [brand, setBrand] = useState(puzzleDetails.brand);
  const [color, setColor] = useState(puzzleDetails.color);
  const [magnetStrength, setMangetStrength] = useState(
    puzzleDetails.magnetStrength
  );
  const [weight, setWeight] = useState(puzzleDetails.weight);
  const [dimensions, setDimensions] = useState(puzzleDetails.dimensions);
  const [description, setDescription] = useState(puzzleDetails.description);
  const [price, setPrice] = useState(puzzleDetails.price);
  const [stock, setStock] = useState(puzzleDetails.stock);

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleMagnetStrengthChange = (event) => {
    setMangetStrength(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleDimensionsChange = (event) => {
    setDimensions(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
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
  }, [puzzleId, puzzle]);

  useEffect(() => {
    fetch(
      `${SERVER_URL}/feedbacks/getFeedbacks/${puzzleDetails?.puzzleType}/${
        puzzleDetails?.collection
      }/${puzzleDetails?.productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((error) => {
        console.error("Internal error:", error);
      });
  }, [puzzleId, puzzle]);

  const handleUpdateProduct = (event) => {
    event.preventDefault();

    const updatedProduct = {};

    if (brand !== puzzleDetails.brand) updatedProduct.brand = brand;
    if (color !== puzzleDetails.color) updatedProduct.color = color;
    if (magnetStrength !== puzzleDetails.magnetStrength)
      updatedProduct.magnetStrength = magnetStrength;
    if (weight !== puzzleDetails.weight) updatedProduct.weight = weight;
    if (dimensions !== puzzleDetails.dimensions)
      updatedProduct.dimensions = dimensions;
    if (description !== puzzleDetails.description)
      updatedProduct.description = description;
    if (price !== puzzleDetails.price) updatedProduct.price = price;
    if (price !== puzzleDetails.stock) updatedProduct.stock = stock;

    if (Object.keys(updatedProduct).length === 0) {
      console.log("No changes detected.");
      return;
    } else {
      console.log(updatedProduct);
    }

    fetch(
      `${SERVER_URL}/products/update/${puzzleDetails.puzzleType}/${
        puzzleDetails.collection
      }/${puzzleDetails.productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        window.location.reload(false);
      });
  };

  if (!puzzle) {
    return <div>Detaliile despre puzzle nu sunt disponibile.</div>;
  }

  const stringURL = puzzle ? `/${puzzle.name}.jpg` : "";
  const stringURL2 = puzzle ? `/${puzzle.name} 2.jpg` : "";
  const stringURL3 = puzzle ? `/${puzzle.name} 3.jpg` : "";
  const stringURL4 = puzzle ? `/${puzzle.name} 4.jpg` : "";
  const images = [stringURL, stringURL2, stringURL3, stringURL4];

  const getVisibleImages = (puzzle) => {
    if (puzzle.puzzleType === "Jigsaw") return images.slice(0, 2);
    if (puzzle.collection === "Plastic") return [];
    if (puzzle.collection === "Metal") return images.slice(0, 3);
    return images;
  };

  const visibleImages = getVisibleImages(puzzle);

  return (
    <div>
      <NavbarAdmin />
      <div
        class="modal fade"
        style={{ marginTop: "3rem" }}
        id="addEventModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Editează produsul{" "}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div class="modal-body">
              <form onSubmit={handleUpdateProduct}>
                <div className="mb-2">
                  <label htmlFor="brand" className="form-label mb-1">
                    Marcă
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="brand"
                    placeholder="Please enter a name for the event group"
                    value={brand}
                    onChange={handleBrandChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="color" className="form-label mb-1">
                    Culoare
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="color"
                    placeholder="Please enter a name for the event group"
                    value={color}
                    onChange={handleColorChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="magnetStrength" className="form-label mb-1">
                    Putere magneți
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="magnetStrength"
                    value={magnetStrength}
                    onChange={handleMagnetStrengthChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="weight" className="form-label mb-1">
                    Greutate produs
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    value={weight}
                    onChange={handleWeightChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="dimensions" className="form-label mb-1">
                    Dimensiuni puzzle
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dimensions"
                    value={dimensions}
                    onChange={handleDimensionsChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="stock" className="form-label mb-1">
                    Stoc
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    value={stock}
                    onChange={handleStockChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="price" className="form-label mb-1">
                    Preț
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="eventStartDate" className="form-label mb-1">
                    Descriere
                  </label>
                  <textarea
                    className={`form-control`}
                    id="eventDescription"
                    rows="8"
                    placeholder="Please enter a description for the event group"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Anulează
                  </button>
                  <button type="submit" className="btn btn-success">
                    Actualizează
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="full-height-container">
        <div className="container-paralel">
          <div className="detalii-puzzle-container foto">
            <div className="detalii-puzzle-content">
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                {puzzle.name}
                &nbsp;&nbsp; <StarDisplay rating={Math.ceil(averageRating)} />
              </h2>
              <hr />
              <section>
                <div className="container">
                  <div className="carousel">
                    <input type="radio" name="slides" id="slide-1" />
                    <input type="radio" name="slides" id="slide-2" />
                    <input type="radio" name="slides" id="slide-3" />
                    <input type="radio" name="slides" id="slide-4" />
                    <ul className="carousel__slides">
                      <li className="carousel__slide">
                        <div>
                          <img src={stringURL} alt="" />
                        </div>
                      </li>
                      <li className="carousel__slide">
                        <div>
                          <img src={stringURL2} alt="" />
                        </div>
                      </li>
                      <li className="carousel__slide">
                        <div>
                          <img src={stringURL3} alt="" />
                        </div>
                      </li>
                      <li className="carousel__slide">
                        <div>
                          <img src={stringURL4} alt="" />
                        </div>
                      </li>
                    </ul>
                    <ul className="carousel__thumbnails">
                      {visibleImages.map((url, index) => (
                        <li key={index}>
                          <label htmlFor={`slide-${index + 1}`}>
                            <img src={url} alt="" />
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div
            className="detalii-puzzle-container details"
            style={{
              position: "relative",
            }}
          >
            <div className="detalii-puzzle-content content2">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.4rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                </svg>
                <div style={{ margin: 0 }}>
                  &nbsp;&nbsp;Marcă: <b>{puzzle.brand}</b>
                </div>
              </div>

              {puzzle.puzzleType === "Rubik" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-palette"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
                  </svg>
                  &nbsp;&nbsp;Culoare:&nbsp;
                  <b>{puzzle.color}</b>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  marginBottom: "0.4rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-boxes"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                </svg>
                {puzzle.puzzleType === "Jigsaw" ? (
                  <>&nbsp;&nbsp;Număr de piese:&nbsp; </>
                ) : (
                  <>&nbsp;&nbsp;Tip:&nbsp;</>
                )}

                <b>{puzzle.collection}</b>
              </div>

              {puzzle.puzzleType === "IQ" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-puzzle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .039-.063v-.009l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003a.2.2 0 0 0-.039-.064.9.9 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.039.063v.003l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.5.5 0 0 0-.118-.115l-.025-.012L1.5 6.5h-.003a.2.2 0 0 0-.064.039.9.9 0 0 0-.193.27C1.1 7.09 1 7.51 1 8s.1.912.24 1.19c.07.14.14.225.194.271a.2.2 0 0 0 .063.039H1.5l.006-.001.025-.012a.5.5 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115l.025.012.006.001h.003a.2.2 0 0 0 .064-.039.9.9 0 0 0 .193-.27c.14-.28.24-.7.24-1.191s-.1-.912-.24-1.19a.9.9 0 0 0-.194-.271.2.2 0 0 0-.063-.039H14.5l-.006.001-.025.012a.5.5 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557z" />
                  </svg>
                  Număr de piese:<b>{puzzle.noPieces}</b>
                </div>
              )}
              <hr />

              {puzzle.puzzleType === "Rubik" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-magnet"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a7 7 0 0 0-7 7v3h4V8a3 3 0 0 1 6 0v3h4V8a7 7 0 0 0-7-7m7 11h-4v3h4zM5 12H1v3h4zM0 8a8 8 0 1 1 16 0v8h-6V8a2 2 0 1 0-4 0v8H0z" />
                  </svg>
                  Putere magneți:<b>{puzzle.magnetStrength}/5</b>
                </div>
              )}

              {puzzle.puzzleType === "IQ" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-wrench-adjustable-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.496 8a4.5 4.5 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11q.04.3.04.61" />
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.5 4.5 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8m-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27z" />
                  </svg>
                  Dificultate:<b>{puzzle.difficulty}/5</b>
                </div>
              )}

              {puzzle.collection === "Lemn" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-stopwatch"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                  </svg>
                  TImp de asamblare:<b>{puzzle.assemblyTime} ore</b>
                </div>
              )}

              {puzzle.collection !== "Plastic" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-feather"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173" />
                  </svg>
                  Greutate produs:<b>{puzzle.weight} g</b>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "1rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-aspect-ratio"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                  <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z" />
                </svg>
                Dimenisuni puzzle:<b>{puzzle.dimensions}</b>
              </div>

              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "0.4rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-repeat"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                  <path
                    fill-rule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                  />
                </svg>
                Drept de retur: <b>14 zile</b>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "1rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-shield-lock"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415" />
                </svg>
                Garanție inclusă: <b>24 luni</b>
              </div>

              {puzzle.puzzleType !== "Jigsaw" && (
                <>
                  <hr />
                  <p
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      marginBottom: "1rem",
                    }}
                  >
                    {puzzle.description}
                  </p>
                </>
              )}
            </div>

            <div className="price">
              <h6
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0.5rem",
                }}
                className={
                  puzzleDetails.stock > 8
                    ? "text-success"
                    : puzzleDetails.stock > 0
                    ? "text-warning"
                    : "text-danger"
                }
              >
                {puzzleDetails.stock} produse
              </h6>

              <h5
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem 0 1.5rem 0",
                }}
              >
                <b>{puzzle.price} ron</b>
              </h5>

              <div className="buttondiv">
                <button
                  type="button"
                  class="btn btn-warning btn-add-group"
                  data-bs-toggle="modal"
                  data-bs-target="#addEventModal"
                >
                  Editează
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {feedbacks && feedbacks.length > 0 && (
        <>
          <hr style={{ marginTop: "4%" }} />
          <h1 style={{ margin: "4rem 12%" }}>Recenzii</h1>
          <ToastContainer />

          <div
            className="container-paralel feedbacks"
            style={{ paddingBottom: "10%" }}
          >
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            {feedbacks.map((feedback) => (
              <div class="col-sm-5 col-md-5  mb-3">
                <div class="cardF" style={{ padding: "1.5rem" }}>
                  <div class="cardF-body">
                    <div class="d-flex align-items-center position-relative pb-3">
                      <div class="flex-grow-1 ms-3">
                        <a class="h5 stretched-link btn-link">
                          {feedback.userName} {feedback.userSurname}
                        </a>
                        <p class="text-muted m-0">
                          {new Date(feedback.timestamp).toLocaleString(
                            "ro-RO",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div class="flex-grow-1 ms-3">
                      <p>{feedback.comment}</p>
                    </div>
                    <div className="mt-2 pt-2 text-center border-top">
                      <div className="d-flex justify-content-center gap-5">
                        <div className="text-center">
                          <div className="my-2">Dificultatea percepută</div>
                          <StarDisplay rating={feedback.difficulty} />
                        </div>
                        <div className="text-center">
                          <div className="my-2">Calitatea materialelor</div>
                          <StarDisplay rating={feedback.materialQuality} />
                        </div>
                        <div className="text-center">
                          <div className="my-2">Experiența de rezolvare</div>
                          <StarDisplay rating={feedback.solvingExperience} />
                        </div>
                        <div className="text-center">
                          <div className="my-2">Raport calitate-preț</div>
                          <StarDisplay rating={feedback.valueForMoney} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export { PuzzleDetailsAdmin };
