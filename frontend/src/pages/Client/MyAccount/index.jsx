import React, { useState, useEffect } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarHome } from "../../../Components/Client/Navbar";
import { getAuth, updatePassword } from "firebase/auth";
import Footer from "../../../Components/Footer";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orderDiscountMessage, setOrderDiscountMessage] = useState("");

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
      if (storedUserDetails) {
        const userData = JSON.parse(storedUserDetails);
        setUserDetails(userData);
        setName(userData.name);
        setSurname(userData.surname);
        setEmail(userData.email);
        setPhone(userData.phone);
      }
    }
  };

  const getClientOrderSummary = (userId) => {
    fetch(`${SERVER_URL}/users/getClientOrderSummary/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalProducts(data?.totalProducts || 0);
        setTotalOrders(data?.totalOrders || 0);
      });
  };

  const getFeedbacks = (userId) => {
    if (userDetails) {
      fetch(`${SERVER_URL}/feedbacks/getUserFeedbacks/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFeedbacks(data?.length || 0);
        })
        .catch((error) => {
          console.error("Eroare la preluarea salilor:", error);
        });
    }
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (userDetails) {
      getClientOrderSummary(userDetails.id);
      getFeedbacks(userDetails.id);
    }
  }, [userDetails]);

  useEffect(() => {
    console.log(totalOrders);
    if (totalOrders !== null) {
      switch (totalOrders) {
        case 0:
          setOrderDiscountMessage(
            `Încă 2 comenzi până beneficiezi de transport gratuit! 🥳`
          );
          break;
        case 1:
          setOrderDiscountMessage(
            `Încă o comandă până beneficiezi de transport gratuit! 🥳`
          );
          break;
        case 2:
          setOrderDiscountMessage(
            `La următoarea comandă beneficiezi de transport gratuit! 🥳`
          );
          break;
        case 3:
          setOrderDiscountMessage(
            `Încă 2 comenzi până la un voucher de 25% reducere! 🥳`
          );
          break;
        case 4:
          setOrderDiscountMessage(
            `La următoarea comandă primești un voucher de 25% reducere! 🥳`
          );
          break;
        case 8:
          setOrderDiscountMessage(`Încă o comandă până la 40% reducere! 🥳`);
          break;
        case 9:
          setOrderDiscountMessage(
            `La următoarea comandă beneficiezi de 40% reducere! 🥳`
          );
          break;
        default:
          if (totalOrders < 9) {
            setOrderDiscountMessage(
              `Încă ${10 - totalOrders} comenzi până la 40% reducere!`
            );
          } else {
            setOrderDiscountMessage("");
          }
          break;
      }
    }
  }, [totalOrders]);

  const handleSaveChanges = async () => {
    if (password && password !== confirmPassword) {
      toast.warn("Parolele nu coincid.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const updatedUserDetails = {
      ...userDetails,
      name,
      surname,
      email,
      phone,
    };

    localStorage.setItem("user", JSON.stringify(updatedUserDetails));

    fetch(`${SERVER_URL}/users/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserDetails),
    });

    if (password) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          await updatePassword(user, password);
        } catch (error) {
          console.error(error);
          toast.error(`Parola trebuie să conțină cel puțin 6 caractere.`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }

      toast.success("Datele au fost actualizate cu success.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div>
      <NavbarHome />
      <div className="name">
        <h2 style={{ color: "black", marginTop: "4%", marginBottom: "5%" }}>
          Activitatea mea
        </h2>
      </div>
      <div
        className="bar-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "0 4% 0% 4%",
        }}
      >
        <div
          className="vertical-bar-wrapper"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            margin: "1rem",
            width: "12%",
          }}
        >
          <div className="vertical-bar">
            <i className="bi bi-calendar2-day" style={{ fontSize: "40px" }} />
            <p className="centered-text">
              Membru din{" "}
              <div>
                <b>
                  {userDetails?.createdAt &&
                    new Date(
                      userDetails.createdAt.seconds * 1000
                    ).toLocaleString("ro-RO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </b>
              </div>
            </p>
          </div>
        </div>

        <div
          className="vertical-bar-wrapper"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            margin: "1rem",
            width: "12%",
          }}
        >
          <div className="vertical-bar">
            <i class="bi bi-box-seam-fill" style={{ fontSize: "40px" }} />
            <p className="centered-text">
              <b>{totalOrders}</b>
              <br />
              comenzi plasate
            </p>
          </div>
        </div>

        <div
          className="vertical-bar-wrapper"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            margin: "1rem",
            width: "12%",
          }}
        >
          <div className="vertical-bar">
            <i class="bi bi-puzzle-fill" style={{ fontSize: "40px" }} />
            <p className="centered-text">
              <b>{totalProducts}</b>
              <br />
              produse comandate
            </p>
          </div>
        </div>

        <div
          className="vertical-bar-wrapper"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            margin: "1rem",
            width: "12%",
          }}
        >
          <div className="vertical-bar">
            <i class="bi bi-bookmark-heart-fill" style={{ fontSize: "40px" }} />
            <p className="centered-text">
              <b>{feedbacks} </b>
              <br />
              recenzii acordate
            </p>
          </div>
        </div>
      </div>
      <div className="name pt-5">
        <h6>{orderDiscountMessage}</h6>
      </div>

      <hr
        style={{
          color: "grey",
          height: "1px",
          backgroundColor: "bisque",
          opacity: "1",
          margin: "3rem 0 5rem",
        }}
      />

      <div class="container-xl px-4 mt-4" style={{ paddingBottom: "10%" }}>
        <div class="row">
          <div class="col-xl-12">
            <div class="cardCM mb-4">
              <div class="cardCM-header" style={{ marginBottom: "1.5rem" }}>
                Detaliile contului
              </div>
              <div class="cardCM-body">
                <form>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        Prenume
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Nume
                      </label>
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputOrgName">
                        Adresa de email
                      </label>
                      <input
                        class="form-control"
                        id="inputOrgName"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLocation">
                        Numărul de telefon
                      </label>
                      <input
                        class="form-control"
                        id="inputLocation"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div
                      class="cardCM-header"
                      style={{ margin: "1.5rem 0 1.5rem 0" }}
                    >
                      Schimbă parola
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Parola nouă
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Repetă parola nouă
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        type="password"
                        name="birthday"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    style={{ marginTop: "1rem" }}
                    class="btn btn-primary"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Salvează modificările
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export { MyAccount };
