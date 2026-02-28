import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import events from "../data/events";
import EventCard from "./EventCard";
import "./CulturalCalendar.css";

const CulturalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const onBook = (event, tickets) => {
    setBookingMessage(`You booked ${tickets} ticket(s) for "${event.name}"!`);
    setTimeout(() => setBookingMessage(""), 4000);
  };

  // Dates with events (string form YYYY-MM-DD)
  const eventDates = events.map(e =>
    e.date.toISOString().slice(0, 10)
  );

  // Highlight dates with event
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().slice(0, 10);
      if (eventDates.includes(dateStr)) {
        return "highlight-date";
      }
    }
    return null;
  };

  return (
    <div className="cultural-calendar-page">
      <h1>Cultural Events</h1>

      <div className="events-list">
        {events.map(event => (
          <EventCard key={event.id} event={event} onBook={onBook} />
        ))}
      </div>

      <h2>Event Calendar</h2>
      <Calendar
        tileClassName={tileClassName}
        onClickDay={(date) => setSelectedDate(date)}
      />

      {selectedDate && (
        <div className="events-on-date">
          <h3>Events on {selectedDate.toDateString()}</h3>
          {events.filter(
            e =>
              e.date.toDateString() === selectedDate.toDateString()
          ).map(e => (
            <div key={e.id} className="event-on-date">
              <strong>{e.name}</strong> at {e.location}
            </div>
          ))}

          {events.filter(
            e => e.date.toDateString() === selectedDate.toDateString()
          ).length === 0 && <p>No events on this day.</p>}
        </div>
      )}

      {bookingMessage && <div className="booking-message">{bookingMessage}</div>}
    </div>
  );
};

export default CulturalCalendar;
