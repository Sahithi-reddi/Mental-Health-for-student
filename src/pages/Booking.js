import React, { useState } from "react";

function Booking() {
  const [date, setDate] = useState("");

  const handleBooking = () => {
    alert("Appointment booked for " + date);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Book Appointment</h2>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;
