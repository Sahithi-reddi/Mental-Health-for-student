import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  const [profile, setProfile] = useState({
    phone: "",
    age: "",
    weight: "",
    email: "",
    gender: "",
    height: "",
    bloodGroup: ""
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem(
      `profile_${currentUser}`,
      JSON.stringify(profile)
    );

    alert("Profile saved successfully!");
    navigate("/student-dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Profile</h2>

      <input name="phone" placeholder="Phone Number" onChange={handleChange} />
      <br /><br />

      <input name="age" placeholder="Age" onChange={handleChange} />
      <br /><br />

      <input name="weight" placeholder="Weight" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <br /><br />

      <input name="height" placeholder="Height" onChange={handleChange} />
      <br /><br />

      <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
      <br /><br />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}

export default Profile;
