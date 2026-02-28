import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8087/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.username || username })
        );
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        const data = await response.json();
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const bgImage = "/bg.jpg"; // Image should be placed in public folder

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

      {/* Glassmorphic container */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "2.5rem",
          width: "350px",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "700",
          }}
        >
          Login
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
          style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}
        >
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1.3rem",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            color: "#000", // Black text
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Light background for contrast
          }}
        />

        <label
          style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "none",
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
            background: "#1abc9c",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a085")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1abc9c")}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#eee" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ color: "#1abc9c", fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
