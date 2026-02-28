import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { eventName, tickets, location: eventLocation } =
    location.state || {};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 Booking Successful!</h1>

      {eventName && (
        <>
          <p style={styles.text}>
            You booked <strong>{tickets}</strong> ticket(s)
          </p>
          <p style={styles.text}>
            Event: <strong>{eventName}</strong>
          </p>
          <p style={styles.text}>
            Location: <strong>{eventLocation}</strong>
          </p>
        </>
      )}

      <button style={styles.button} onClick={() => navigate("/home")}>
        Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px"
  },
  title: {
    fontSize: "2.5rem",
    color: "#2ecc71"
  },
  text: {
    fontSize: "1.2rem",
    marginTop: "10px"
  },
  button: {
    marginTop: "30px",
    padding: "12px 25px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default BookingSuccess;