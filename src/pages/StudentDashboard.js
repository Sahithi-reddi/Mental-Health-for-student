import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [sessionDate, setSessionDate] = useState("");
  const [issue, setIssue] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [profile, setProfile] = useState({
    education: "",
    age: "",
    dob: "",
    email: "",
  });

  // ✅ Load current user only once
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);

      // Load bookings
      const storedBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];
      const userBookings = storedBookings.filter(
        (b) => b.userId === user.userId
      );
      setBookings(userBookings);

      // Load chat
      const storedChat =
        JSON.parse(localStorage.getItem("chatMessages")) || [];
      setChatMessages(storedChat);

      // Load profile
      const savedProfile =
        JSON.parse(
          localStorage.getItem(`profile_${user.userId}`)
        ) || {
          education: "",
          age: "",
          dob: "",
          email: "",
        };

      setProfile(savedProfile);
    }
  }, [navigate]);

  // ✅ Book Session
  const handleBooking = () => {
    if (!sessionDate || !issue) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      userId: currentUser.userId,
      date: sessionDate,
      issue: issue,
      status: "Pending",
    };

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = [...allBookings, newBooking];

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(
      updatedBookings.filter(
        (b) => b.userId === currentUser.userId
      )
    );

    alert("Session booked successfully!");
    setSessionDate("");
    setIssue("");
  };

  // ✅ Send Chat Message
  const handleSendMessage = () => {
    if (!message) return;

    const newMessage = {
      sender: currentUser.userId,
      text: message,
    };

    const updatedMessages = [
      ...chatMessages,
      newMessage,
    ];

    setChatMessages(updatedMessages);

    localStorage.setItem(
      "chatMessages",
      JSON.stringify(updatedMessages)
    );

    setMessage("");
  };

  // ✅ Save Profile
  const handleProfileSave = () => {
    localStorage.setItem(
      `profile_${currentUser.userId}`,
      JSON.stringify(profile)
    );

    alert("Profile saved successfully!");
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) return null;

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div>
            <h2>My Profile</h2>

            <p><strong>User ID:</strong> {currentUser.userId}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>

            <input
              type="text"
              placeholder="Education"
              value={profile.education}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: e.target.value,
                })
              }
            />
            <br /><br />

            <input
              type="number"
              placeholder="Age"
              value={profile.age}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  age: e.target.value,
                })
              }
            />
            <br /><br />

            <input
              type="date"
              value={profile.dob}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  dob: e.target.value,
                })
              }
            />
            <br /><br />

            <input
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />
            <br /><br />

            <button onClick={handleProfileSave}>
              Save Profile
            </button>
          </div>
        );

      case "booking":
        return (
          <div>
            <h2>Book Counselling Session</h2>

            <input
              type="date"
              value={sessionDate}
              onChange={(e) =>
                setSessionDate(e.target.value)
              }
            />
            <br /><br />

            <textarea
              placeholder="Describe your issue"
              value={issue}
              onChange={(e) =>
                setIssue(e.target.value)
              }
            />
            <br /><br />

            <button onClick={handleBooking}>
              Book Session
            </button>
          </div>
        );

      case "viewBookings":
        return (
          <div>
            <h2>My Bookings</h2>

            {bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              <ul>
                {bookings.map((b, index) => (
                  <li key={index}>
                    Date: {b.date} | Issue: {b.issue} |
                    Status: {b.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "chat":
        return (
          <div>
            <h2>Chat with Counsellor</h2>

            <div
              style={{
                border: "1px solid gray",
                height: "200px",
                overflowY: "scroll",
                padding: "10px",
              }}
            >
              {chatMessages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>

            <br />

            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <button onClick={handleSendMessage}>
              Send
            </button>
          </div>
        );

      default:
        return (
          <h2>Welcome, {currentUser.userId}</h2>
        );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "250px",
          background: "#2f4050",
          color: "white",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <h2>Student Panel</h2>

        <p onClick={() => setActiveSection("home")}>Home</p>
        <p onClick={() => setActiveSection("profile")}>My Profile</p>
        <p onClick={() => setActiveSection("booking")}>
          Book Counselling Session
        </p>
        <p onClick={() => setActiveSection("viewBookings")}>
          View My Bookings
        </p>
        <p onClick={() => setActiveSection("chat")}>
          Chat with Counsellor
        </p>
        <p
          style={{ color: "red" }}
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>

      <div style={{ flex: 1, padding: "30px" }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentDashboard;