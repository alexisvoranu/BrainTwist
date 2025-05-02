import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const NavbarHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    getUserDetailsFromLocalStorage();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("user");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  const handleLogout = async () => {
    navigate("/login");
    await signOut(auth);
    localStorage.removeItem("user");
  };

  const [dropdownClasicOpen, setDropdownClasicOpen] = useState(false);
  const [dropdownRubikOpen, setDropdownRubikOpen] = useState(false);
  const [dropdownIQOpen, setDropdownIQOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="" onClick={() => navigate("/")}>
          BrainTwist
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link active"
                role="button"
                href=""
                onClick={() => navigate("/aboutUs")}
              >
                Despre noi
                <svg
                  style={{ marginLeft: "5px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-puzzle"
                  viewBox="0 0 16 18"
                >
                  <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .039-.063v-.009l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003a.2.2 0 0 0-.039-.064.9.9 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.039.063v.003l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.5.5 0 0 0-.118-.115l-.025-.012L1.5 6.5h-.003a.2.2 0 0 0-.064.039.9.9 0 0 0-.193.27C1.1 7.09 1 7.51 1 8s.1.912.24 1.19c.07.14.14.225.194.271a.2.2 0 0 0 .063.039H1.5l.006-.001.025-.012a.5.5 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115l.025.012.006.001h.003a.2.2 0 0 0 .064-.039.9.9 0 0 0 .193-.27c.14-.28.24-.7.24-1.191s-.1-.912-.24-1.19a.9.9 0 0 0-.194-.271.2.2 0 0 0-.063-.039H14.5l-.006.001-.025.012a.5.5 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557z" />
                </svg>
              </a>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => !isMobile && setDropdownClasicOpen(true)}
              onMouseLeave={() => !isMobile && setDropdownClasicOpen(false)}
            >
              <button
                className="nav-link active flex items-center gap-1 text-xl md:text-base peer"
                onClick={() => {
                  if (!isMobile) {
                    navigate("/client/Jigsaw");
                    window.location.reload();
                  } else {
                    setDropdownClasicOpen(!dropdownClasicOpen);
                  }
                }}
              >
                Puzzle (Jigsaw)
                <span
                  className="text-2xl md:text-base cursor-pointer"
                  onClick={() =>
                    isMobile && setDropdownClasicOpen(!dropdownClasicOpen)
                  }
                >
                  &nbsp;▼
                </span>
              </button>
              {dropdownClasicOpen && (
                <ul
                  className="dropdown-menu show"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Jigsaw/500");
                        window.location.reload();
                      }}
                    >
                      500 piese
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Jigsaw/1000");
                        window.location.reload();
                      }}
                    >
                      1000 piese
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Jigsaw/2000");
                        window.location.reload();
                      }}
                    >
                      2000 piese
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Jigsaw/3000");
                        window.location.reload();
                      }}
                    >
                      3000 piese
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Jigsaw/5000");
                        window.location.reload();
                      }}
                    >
                      5000 piese
                    </button>
                  </li>
                  {isMobile && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          navigate("/client/Jigsaw");
                          window.location.reload();
                        }}
                        style={{ color: "#1CAC78" }}
                      >
                        Vezi toate produsele...
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => !isMobile && setDropdownRubikOpen(true)}
              onMouseLeave={() => !isMobile && setDropdownRubikOpen(false)}
            >
              <button
                className="nav-link active flex items-center gap-1 text-xl md:text-base peer"
                onClick={() => {
                  if (!isMobile) {
                    navigate("/client/Rubik");
                    window.location.reload();
                  } else {
                    setDropdownRubikOpen(!dropdownRubikOpen);
                  }
                }}
              >
                Rubik's
                <span
                  className="text-2xl md:text-base cursor-pointer"
                  onClick={() =>
                    isMobile && setDropdownRubikOpen(!dropdownRubikOpen)
                  }
                >
                  &nbsp;▼
                </span>
              </button>
              {dropdownRubikOpen && (
                <ul
                  className="dropdown-menu show"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/2x2");
                        window.location.reload();
                      }}
                    >
                      2x2
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/3x3");
                        window.location.reload();
                      }}
                    >
                      3x3
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/4x4");
                        window.location.reload();
                      }}
                    >
                      4x4
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/5x5");
                        window.location.reload();
                      }}
                    >
                      5x5
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/6x6");
                        window.location.reload();
                      }}
                    >
                      6x6
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/Rubik/7x7");
                        window.location.reload();
                      }}
                    >
                      7x7
                    </button>
                  </li>
                  {isMobile && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          navigate("/client/Rubik");
                          window.location.reload();
                        }}
                        style={{ color: "#1CAC78" }}
                      >
                        Vezi toate produsele...
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => !isMobile && setDropdownIQOpen(true)}
              onMouseLeave={() => !isMobile && setDropdownIQOpen(false)}
            >
              <button
                className="nav-link active flex items-center gap-1 text-xl md:text-base peer"
                onClick={() => {
                  if (!isMobile) {
                    navigate("/client/IQ");
                    window.location.reload();
                  } else {
                    setDropdownIQOpen(!dropdownIQOpen);
                  }
                }}
              >
                IQ Puzzles
                <span
                  className="text-2xl md:text-base cursor-pointer"
                  onClick={() => isMobile && setDropdownIQOpen(!dropdownIQOpen)}
                >
                  &nbsp;▼
                </span>
              </button>

              {dropdownIQOpen && (
                <ul
                  className="dropdown-menu show"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/IQ/Lemn");
                        window.location.reload();
                      }}
                    >
                      Lemn
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/IQ/Metal");
                        window.location.reload();
                      }}
                    >
                      Metal
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/client/IQ/Plastic");
                        window.location.reload();
                      }}
                    >
                      Plastic
                    </button>
                  </li>
                  {isMobile && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          navigate("/client/IQ");
                          window.location.reload();
                        }}
                        style={{ color: "#1CAC78" }}
                      >
                        Vezi toate produsele...
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>

          {/* Right side items (Login & Sign Up) */}
          <ul className="navbar-nav ms-auto">
            {!userDetails && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  role="button"
                  href=""
                  onClick={() => navigate("/client/favorites")}
                >
                  Produse favorite
                  <svg
                    style={{ marginLeft: "5px", marginRight: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-bag-heart"
                    viewBox="0 0 16 18"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
                    />
                  </svg>
                </a>
              </li>
            )}
            <li className="nav-item">
              <a
                className="nav-link active"
                role="button"
                href=""
                onClick={() => navigate("/client/myCart")}
              >
                Coșul meu
                <svg
                  style={{ marginLeft: "5px", marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-cart"
                  viewBox="0 0 16 18"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </a>
            </li>
            {userDetails != null ? (
              <>
                <li className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link active dropdown-toggle"
                      role="button"
                      id="navbarDropdown"
                      onClick={toggleDropdown}
                    >
                      Bună, {userDetails.name}!
                    </a>
                    <ul
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/client/account">
                          Contul meu
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/client/favorites">
                          Produse favorite
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/client/orders">
                          Comenzile mele
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/client/myFeedbacks">
                          Recenziile mele
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { NavbarHome };
