import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .nav {
          background: linear-gradient(to right, #2c3e50, #34495e);
          color: #fff;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Segoe UI', sans-serif;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: 700;
          cursor: pointer;
          color: #1abc9c;
          transition: color 0.3s ease;
        }

        .brand:hover {
          color: #16a085;
        }

        .links {
          display: flex;
          align-items: center;
          list-style: none;
        }

        .links a {
          color: #ecf0f1;
          text-decoration: none;
          margin-left: 1.25rem;
          font-weight: 500;
          font-size: 1rem;
          position: relative;
          transition: color 0.3s ease;
        }

        .links a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: #1abc9c;
          transition: width 0.3s ease;
        }

        .links a:hover {
          color: #1abc9c;
        }

        .links a:hover::after {
          width: 100%;
        }

        .logout-btn {
          cursor: pointer;
          margin-left: 1.5rem;
          font-weight: 500;
          color: #e74c3c;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .logout-btn:hover {
          text-decoration: underline;
          color: #c0392b;
        }

        @media (max-width: 768px) {
          .nav {
            flex-direction: column;
            align-items: flex-start;
          }
          .links {
            flex-wrap: wrap;
            margin-top: 0.5rem;
          }
          .links a,
          .logout-btn {
            margin: 0.5rem 0;
            margin-right: 1rem;
          }
        }
      `}</style>

      <nav className="nav" style={{ ariaLabel: "Main navigation" }}>
        <div className="brand" onClick={() => navigate("/home")}>Government of Sikkim</div>
        <div className="links">
          <Link to="/home">Home</Link>
          {isAuthenticated && <Link to="/explore">Explore</Link>}
          {isAuthenticated && <Link to="/hotels">Hotels & Cars</Link>}
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
          {isAuthenticated && <Link to="/cultural-calendar">Events</Link>}
          {isAuthenticated && <Link to="/weather">Weather</Link>}
          <Link to="/about">About Us</Link>
          {isAuthenticated && <Link to="/helpline">Helpline</Link>}
          {isAuthenticated && (
            <a href="#logout" className="logout-btn" onClick={handleLogout}>
              Logout
            </a>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;