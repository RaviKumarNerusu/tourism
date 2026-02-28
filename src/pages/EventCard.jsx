import React, { useState, useRef } from 'react';
import './EventCard.css';

function EventCard({ event }) {
  const [tickets, setTickets] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const timerRef = useRef(null);

  const increaseTickets = () => setTickets(prev => prev + 1);
  const decreaseTickets = () => setTickets(prev => (prev > 1 ? prev - 1 : 1));

  const formattedDate = event.date.toDateString();

  const handleBook = () => {
    setShowSuccess(true);

    // Clear previous timer if clicked multiple times
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} />
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Cost per ticket:</strong> {event.cost}</p>

      <div className="tickets-control">
        <span><strong>Tickets:</strong></span>
        <button onClick={decreaseTickets}>-</button>
        <span className="ticket-count">{tickets}</span>
        <button onClick={increaseTickets}>+</button>
      </div>

      <button className="book-btn" onClick={handleBook}>
        Book
      </button>

      {showSuccess && (
        <div className="success-popup">
          🎉 Booking Successful!
        </div>
      )}
    </div>
  );
}

export default EventCard;