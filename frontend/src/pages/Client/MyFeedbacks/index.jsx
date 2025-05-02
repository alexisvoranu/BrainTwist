import React, { useState, useEffect } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { ToastContainer } from "react-toastify";
import StarDisplay from "../../../Components/Feedback/StarDisplay";
import "react-toastify/dist/ReactToastify.css";
import { NavbarHome } from "../../../Components/Client/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  const getFeedbacks = () => {
    if (userDetails) {
      setLoading(true);
      fetch(`${SERVER_URL}/feedbacks/getUserFeedbacks/${userDetails?.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFeedbacks(data);
        })
        .catch((error) => {
          console.error("Internal error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getPuzzle = (puzzleType, collection, productId) => {
    fetch(
      `${SERVER_URL}/products/getProductById/${puzzleType}/${collection}/${productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const puzzleDetails = data;
        navigate("/client/puzzleDetails", {
          state: {
            puzzleDetails,
          },
        });
      })
      .catch((error) => {
        console.error("Eroare la preluarea salilor:", error);
      });
  };

  useEffect(() => {
    if (userDetails) {
      getFeedbacks();
    }
  }, [userDetails]);

  const handleDelete = (puzzleType, collectionName, productId, feedbackId) => {
    const url = `${SERVER_URL}/feedbacks/deleteFeedback/${puzzleType}/${collectionName}/${productId}/${feedbackId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload();
        } else {
          console.error("Eroare la stergerea feedbackului:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="main-organizer">
        <NavbarHome />
        <h1 style={{ padding: "3rem" }}>Recenziile mele</h1>
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
            Se încarcă recenziile...
          </h5>
        ) : feedbacks.length > 0 ? (
          <div>
            <ToastContainer />
            <div
              className="container-paralel myF"
              style={{ paddingBottom: "10%" }}
            >
              <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
              />
              <div className="row fb">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className={
                      feedbacks.length === 1
                        ? "col-10 mb-4 mx-auto"
                        : "col-8 mb-4 mx-auto"
                    }
                  >
                    <div
                      className="cardF"
                      style={{ padding: "1.5rem", margin: "1rem" }}
                    >
                      <div class="cardF-body">
                        <div class="d-flex align-items-center position-relative pb-3">
                          <button
                            className="btn btn-danger btn-top-right dF"
                            onClick={() =>
                              handleDelete(
                                feedback.puzzleType,
                                feedback.collection,
                                feedback.productId,
                                feedback.feedbackId
                              )
                            }
                          >
                            Șterge recenzia
                          </button>
                          <div class="flex-grow-1 ms-3">
                            <a
                              class="h5 stretched-link btn-link"
                              onClick={() =>
                                getPuzzle(
                                  feedback.puzzleType,
                                  feedback.collection,
                                  feedback.productId
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {feedback.productName}
                            </a>
                            <p class="text m-0">
                              {new Date(feedback.timestamp).toLocaleString(
                                "ro-RO",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div class="flex-grow-1 ms-3">
                          <p>{feedback.comment}</p>
                        </div>
                        <div className="row text-center mt-2 pt-2 border-top">
                          <div className="col-12 col-sm-6 col-md-3 my-2">
                            <div className="my-2">Dificultatea percepută</div>
                            <StarDisplay rating={feedback.difficulty} />
                          </div>
                          <div className="col-12 col-sm-6 col-md-3 my-2">
                            <div className="my-2">Calitatea materialelor</div>
                            <StarDisplay rating={feedback.materialQuality} />
                          </div>
                          <div className="col-12 col-sm-6 col-md-3 my-2">
                            <div className="my-2">Experiența de rezolvare</div>
                            <StarDisplay rating={feedback.solvingExperience} />
                          </div>
                          <div className="col-12 col-sm-6 col-md-3 my-2">
                            <div className="my-2">Raport calitate-preț</div>
                            <StarDisplay rating={feedback.valueForMoney} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <h5
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              Nu ai acordat nicio recenzie.
            </h5>

            <div style={{ flexGrow: 1 }} />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export { MyFeedbacks };
