import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!usuario || !contraseña) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, usuario, contraseña);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Registro</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            style={{
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#FF6B6B",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FF4B4B")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6B6B")}
          >
            Registrar
          </button>
        </form>

        {/* Botón para ir al Login */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #FF6B6B",
            backgroundColor: "white",
            color: "#FF6B6B",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#FF6B6B";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "#FF6B6B";
          }}
        >
          Ya tengo cuenta
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
