import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8087/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert(`Account created for ${username}`);
        navigate("/login"); // Redirect to login after registration
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const bgImage = "/bg.jpg"; // Same background as Login (placed in public folder)

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />

      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "2.5rem",
          width: "350px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "700",
          }}
        >
          Register
        </h2>

        {error && (
          <p
            style={{
              color: "#ff6b6b",
              textAlign: "center",
              marginBottom: "1rem",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <label
          htmlFor="username"
          style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1.3rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "1rem",
            color: "#000", // Black text
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Light background
          }}
        />

        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "1rem",
            color: "#000", // Black text
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Light background
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#eee",
            fontSize: "0.9rem",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4CAF50", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
