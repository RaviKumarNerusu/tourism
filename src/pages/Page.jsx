import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./bg.jpg"; // 👈 Import your image from src/pages

function Page() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div style={{ ...styles.wrapper, backgroundImage: `url(${bgImage})` }}>
      {/* Dark overlay */}
      <div style={styles.overlay}></div>

      {/* Card Content */}
      <div style={styles.card}>
        <h1 style={styles.title}>
          🌄 Welcome {user.username ? user.username : "Traveller"}!
        </h1>
        <h2 style={styles.subtitle}>Experience the Beauty of Sikkim Tourism</h2>

        <p style={styles.desc}>
          This platform is your <b>Digital Heritage Guide to Sikkim</b>.  
          Discover sacred monasteries, explore 360° VR views, learn history,  
          and access cultural events, hotels, weather updates, and more — all in one place.
        </p>

        <div style={styles.links}>
          <p>
            Already a user?{" "}
            <span style={styles.linkText} onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>
          <p>
            New to the platform?{" "}
            <span style={styles.linkText} onClick={() => navigate("/register")}>
              Register now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "1rem",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
    zIndex: 1,
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)", // glassy effect
    padding: "2.5rem",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    maxWidth: "800px",
    width: "90%",
    textAlign: "center",
    animation: "fadeIn 1.2s ease-out",
    zIndex: 2,
    backdropFilter: "blur(15px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#fff",
  },
  subtitle: {
    fontSize: "1.4rem",
    fontWeight: "500",
    color: "#f1c40f",
    marginBottom: "1.5rem",
  },
  desc: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#f0f0f0",
    marginBottom: "2rem",
  },
  links: {
    fontSize: "1rem",
    color: "#fff",
  },
  linkText: {
    color: "#00aced",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Page;
