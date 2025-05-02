import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_URL } from "../../../constants";
import StarRating from "../../../Components/Feedback/StarRating";
import { NavbarHome } from "../../../Components/Client/Navbar";
import Footer from "../../../Components/Footer";

const CreateFeedback = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [materialQuality, setMaterialQuality] = useState(0);
  const [solvingExperience, setSolvingExperience] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const { puzzleDetails } = location.state || {};

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCreateFeedback = async () => {
    const feedbackDetails = {
      puzzleType: puzzleDetails.puzzleType,
      collectionName: puzzleDetails.collection,
      productId: puzzleDetails.productId,
      userId: userDetails?.id,
      difficulty: difficulty,
      materialQuality: materialQuality,
      solvingExperience: solvingExperience,
      valueForMoney: valueForMoney,
      comment: comment,
      userName: userDetails.name,
      userSurname: userDetails.surname,
      productName: puzzleDetails.name,
      productBrand: puzzleDetails.brand,
    };

    const res = await fetch(`${SERVER_URL}/feedbacks/addFeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackDetails),
    });

    if (res.status === 201) {
      toast.success("Recenzia a fost creată cu succes!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (res.status === 400) {
      toast.warn(
        "Te rugăm sa acorzi rating de la 1 la 5 la fiecare proprietate!",
        {
          position: "top-center",
          autoClose: 3000,
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

    setTimeout(() => {
      navigate("/client/myFeedbacks");
    }, 3000);
  };

  return (
    <div>
      <div>
        <NavbarHome />
        <h1 className="text-center py-5">Creează o recenzie</h1>
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          <div className="cardF p-4">
            <div className="cardF-body">
              <div className="d-flex align-items-center position-relative pb-3">
                <div className="candidate-list-images ms-3">
                  <a>
                    <img
                      src={`/${puzzleDetails.name}.jpg`}
                      alt={puzzleDetails.name}
                      className="img-fluid"
                      style={{
                        borderRadius: "5px",
                        width: "100%",
                        height: "5rem",
                      }}
                    />
                  </a>
                </div>
                <div className="flex-grow-1 ms-3">
                  <a className="h5">{puzzleDetails.name}</a>
                  <p className="text-muted m-0 mb-1">{puzzleDetails.brand}</p>
                </div>
              </div>

              <div className="flex-grow-1 ms-3 border-top">
                <div
                  className="d-flex flex-wrap justify-content-center my-4 flexx"
                  style={{ gap: "5rem" }}
                >
                  <div className="text-center">
                    <div className="my-2">Dificultatea percepută</div>
                    <div className="mt-3" style={{ transform: "scale(1.5)" }}>
                      <StarRating setNota={setDifficulty} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="my-2">Calitatea materialelor</div>
                    <div className="mt-3" style={{ transform: "scale(1.5)" }}>
                      <StarRating setNota={setMaterialQuality} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="my-2">Experiența de rezolvare</div>
                    <div className="mt-3" style={{ transform: "scale(1.5)" }}>
                      <StarRating setNota={setSolvingExperience} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="my-2">Raport calitate-preț</div>
                    <div className="mt-3" style={{ transform: "scale(1.5)" }}>
                      <StarRating setNota={setValueForMoney} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 text-center">
                <textarea
                  onChange={onCommentChange}
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "8rem",
                  }}
                  placeholder="Lasă un comentariu..."
                />
                <button
                  onClick={handleCreateFeedback}
                  className="btn btn-success mt-4"
                >
                  Creează recenzia
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export { CreateFeedback };
