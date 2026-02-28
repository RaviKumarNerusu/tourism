import React, { useState, useEffect } from "react";
import monasteries from "../../public/monasteries.json";
import events from "../data/events"; // make sure this exists
import { Link } from "react-router-dom";

function Home() {
  const bgImage = "/bg.jpg";

  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState(null);

  // Check for new event on load
  useEffect(() => {
    const latestEvent = events.find(e => e.isNew);
    if (latestEvent) {
      setNewEvent(latestEvent);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 4000);
    }
  }, []);

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          padding: 30px;
          background: #f9fafb url(${bgImage}) no-repeat center center;
          background-size: cover;
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #2c3e50;
          font-weight: 900;
          font-size: 2.5rem;
          text-shadow: 1px 1px 3px rgba(255,255,255,0.8);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .card {
          position: relative;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 16px;
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #34495e;
        }

        .desc {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 12px;
        }

        .link {
          text-decoration: none;
          color: white;
          background: #007bff;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-block;
          transition: background 0.3s ease;
        }

        .link:hover {
          background: #0056b3;
        }

        .new-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #e74c3c;
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 6px;
        }

        /* ===== NEW EVENT POPUP ===== */
        .event-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ff9800;
          color: white;
          padding: 15px 20px;
          border-radius: 10px;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          animation: slideIn 0.5s ease;
          z-index: 999;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* 🔔 New Event Popup */}
      {showPopup && newEvent && (
        <div className="event-popup">
          🔔 New Event: {newEvent.name} is now available!
        </div>
      )}

      <h1>Explore Sikkim Monasteries</h1>

      <div className="grid">
        {monasteries.map((m) => (
          <div key={m.id} className="card">
            {m.isNew && <span className="new-badge">NEW</span>}
            <img src={m.image} alt={m.name} />
            <div className="title">{m.name}</div>
            <div className="desc">
              {m.description.slice(0, 100)}...
            </div>
            <Link className="link" to={`/monastery/${m.id}`}>
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;