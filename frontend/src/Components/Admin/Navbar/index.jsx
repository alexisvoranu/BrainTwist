import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const NavbarAdmin = () => {
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
        <a className="navbar-brand">BrainTwist</a>
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
            <li className="nav-item">
              <a
                className="nav-link active"
                role="button"
                href=""
                onClick={() => navigate("/admin/dashboard")}
              >
                Comenzi
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
                    navigate("/admin/Jigsaw");
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
                        navigate("/admin/Jigsaw/500");
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
                        navigate("/admin/Jigsaw/1000");
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
                        navigate("/admin/Jigsaw/2000");
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
                        navigate("/admin/Jigsaw/3000");
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
                        navigate("/admin/Jigsaw/5000");
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
                          navigate("/admin/Jigsaw");
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
                    navigate("/admin/Rubik");
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
                        navigate("/admin/Rubik/2x2");
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
                        navigate("/admin/Rubik/3x3");
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
                        navigate("/admin/Rubik/4x4");
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
                        navigate("/admin/Rubik/5x5");
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
                        navigate("/admin/Rubik/6x6");
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
                        navigate("/admin/Rubik/7x7");
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
                          navigate("/admin/Rubik");
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
                    navigate("/admin/IQ");
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
                        navigate("/admin/IQ/Lemn");
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
                        navigate("/admin/IQ/Metal");
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
                        navigate("/admin/IQ/Plastic");
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
                          navigate("/admin/IQ");
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
                  onClick={() => navigate("/admin/favorites")}
                >
                  Produse favorite
                  <svg
                    style={{ marginLeft: "5px", marginRight: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-bag-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
                    />
                  </svg>
                </a>
              </li>
            )}

            {userDetails != null ? (
              <>
                <li className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link active"
                      role="button"
                      id="navbarDropdown"
                      onClick={toggleDropdown}
                    >
                      Bună, {userDetails.name}!
                    </a>
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

export { NavbarAdmin };
