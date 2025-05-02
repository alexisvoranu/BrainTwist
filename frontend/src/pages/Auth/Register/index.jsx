import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { auth, db } from "../../../firebaseConfig";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (password !== repeatedPassword) {
      toast.warn("Parolele nu coincid.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    handleRegister();
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        surname,
        name,
        phone,
        email,
        createdAt: Timestamp.now(),
        totalOrders: 0,
      };

      await setDoc(doc(db, "clients", user.uid), userData);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.uid,
          ...userData,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div
      className="form-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2 style={{ marginTop: "1rem", marginBottom: "0vw", color: "black" }}>
        Bine ai venit pe{" "}
        <a style={{ color: "black", textDecoration: "underline" }} href="/">
          BrainTwist
        </a>
        !
      </h2>
      <form
        className="form-966c7d"
        onSubmit={handleSignUp}
        style={{ width: "900px", backgroundColor: "#eee" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="flex-columnn"
            style={{ flex: "1", marginRight: "0.5rem" }}
          >
            <label className="mb-3">Prenume </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți prenumele"
                className="inputt"
                type="text"
                onChange={(e) => setName(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
          <div className="flex-columnn" style={{ flex: "1" }}>
            <label className="mb-3">Nume </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți numele"
                className="inputt"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="flex-columnn"
            style={{ flex: "1", marginRight: "0.5rem" }}
          >
            <label className="mb-3">Număr de telefon </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți numărul de telefon"
                className="inputt"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
          <div className="flex-columnn" style={{ flex: "1" }}>
            <label className="mb-3">Email </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți emailul"
                className="inputt"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="flex-columnn"
            style={{ flex: "1", marginRight: "0.5rem" }}
          >
            <label className="mb-3">Parola </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți parola"
                className="inputt"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
          <div className="flex-columnn" style={{ flex: "1" }}>
            <label className="mb-3">Parola (confirmare) </label>
            <div className="inputFormm">
              <input
                placeholder="  Introduceți din nou parola"
                className="inputt"
                type="password"
                onChange={(e) => setRepeatedPassword(e.target.value)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button-submit mt-4" type="submit">
            Creează contul
          </button>
        </div>
        <p className="p">
          Ai deja un cont? Click <a href="/login">aici</a> pentru a te
          autentifica
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
