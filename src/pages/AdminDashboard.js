import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [meetingLinks, setMeetingLinks] = useState([]);

  const [newCounselor, setNewCounselor] = useState("");
  const [newResource, setNewResource] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [newMeetingLink, setNewMeetingLink] = useState("");

  // ✅ Load Admin Data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      setCurrentUser(user);

      setUsers(JSON.parse(localStorage.getItem("users")) || []);
      setBookings(JSON.parse(localStorage.getItem("bookings")) || []);
      setCounselors(JSON.parse(localStorage.getItem("counselors")) || []);
      setResources(JSON.parse(localStorage.getItem("resources")) || []);
      setGroups(JSON.parse(localStorage.getItem("groups")) || []);
      setMeetingLinks(JSON.parse(localStorage.getItem("meetingLinks")) || []);
    }
  }, [navigate]);

  // ✅ Update Booking Status
  const updateBookingStatus = (index, status) => {
    const updated = [...bookings];
    updated[index].status = status;
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // ✅ Add Counselor
  const addCounselor = () => {
    if (!newCounselor) return;
    const updated = [...counselors, newCounselor];
    setCounselors(updated);
    localStorage.setItem("counselors", JSON.stringify(updated));
    setNewCounselor("");
  };

  // ✅ Add Resource
  const addResource = () => {
    if (!newResource) return;
    const updated = [...resources, newResource];
    setResources(updated);
    localStorage.setItem("resources", JSON.stringify(updated));
    setNewResource("");
  };

  // ✅ Add Group
  const addGroup = () => {
    if (!newGroup) return;
    const updated = [...groups, newGroup];
    setGroups(updated);
    localStorage.setItem("groups", JSON.stringify(updated));
    setNewGroup("");
  };

  // ✅ Add Meeting Link
  const addMeetingLink = () => {
    if (!newMeetingLink) return;
    const updated = [...meetingLinks, newMeetingLink];
    setMeetingLinks(updated);
    localStorage.setItem("meetingLinks", JSON.stringify(updated));
    setNewMeetingLink("");
  };

  // ✅ Delete User
  const deleteUser = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) return null;

  const renderContent = () => {
    switch (activeSection) {

      case "counselors":
        return (
          <div>
            <h2>Manage Counselors</h2>
            <input
              type="text"
              placeholder="Counselor Name"
              value={newCounselor}
              onChange={(e) => setNewCounselor(e.target.value)}
            />
            <button onClick={addCounselor}>Add</button>

            <ul>
              {counselors.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        );

      case "sessions":
        return (
          <div>
            <h2>Manage Therapy Sessions</h2>
            {bookings.map((b, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>{b.userId}</strong> | {b.date} | {b.issue} | Status: {b.status}
                </p>

                {b.status === "Pending" && (
                  <>
                    <button onClick={() => updateBookingStatus(i, "Approved")}>
                      Approve
                    </button>
                    <button onClick={() => updateBookingStatus(i, "Rejected")}>
                      Reject
                    </button>
                  </>
                )}

                {b.status === "Approved" && (
                  <button onClick={() => updateBookingStatus(i, "Completed")}>
                    Mark Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case "resources":
        return (
          <div>
            <h2>Manage Mental Health Resources</h2>
            <input
              type="text"
              placeholder="Add Resource Title"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
            />
            <button onClick={addResource}>Add</button>

            <ul>
              {resources.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        );

      case "groups":
        return (
          <div>
            <h2>Manage Support Groups</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
            <button onClick={addGroup}>Create</button>

            <ul>
              {groups.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        );

      case "reports":
        return (
          <div>
            <h2>Reports & Analytics</h2>
            <p>Total Users: {users.length}</p>
            <p>Total Bookings: {bookings.length}</p>
            <p>Total Counselors: {counselors.length}</p>
            <p>Total Resources: {resources.length}</p>
            <p>Total Groups: {groups.length}</p>
          </div>
        );

      case "security":
        return (
          <div>
            <h2>Security & Settings</h2>
            {users.map((u, i) => (
              <div key={i}>
                {u.userId} ({u.role})
                <button onClick={() => deleteUser(i)}>Delete</button>
              </div>
            ))}
          </div>
        );

      case "online":
        return (
          <div>
            <h2>Online Therapy Sessions</h2>

            <input
              type="text"
              placeholder="Paste Google Meet / Zoom Link"
              value={newMeetingLink}
              onChange={(e) => setNewMeetingLink(e.target.value)}
            />
            <button onClick={addMeetingLink}>Add Link</button>

            <ul>
              {meetingLinks.map((link, i) => (
                <li key={i}>
                  🔗{" "}
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <h2>Welcome Admin, {currentUser.userId}</h2>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "260px",
          background: "#2f4050",
          color: "white",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <h2>Admin Panel</h2>

        <p onClick={() => setActiveSection("home")}>Home</p>
        <p onClick={() => setActiveSection("counselors")}>Manage Counselors</p>
        <p onClick={() => setActiveSection("sessions")}>Manage Therapy Sessions</p>
        <p onClick={() => setActiveSection("resources")}>Manage Resources</p>
        <p onClick={() => setActiveSection("groups")}>Manage Support Groups</p>
        <p onClick={() => setActiveSection("reports")}>Reports</p>
        <p onClick={() => setActiveSection("security")}>Security</p>
        <p onClick={() => setActiveSection("online")}>Online Sessions</p>

        <p style={{ color: "red" }} onClick={handleLogout}>
          Logout
        </p>
      </div>

      <div style={{ flex: 1, padding: "30px" }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;