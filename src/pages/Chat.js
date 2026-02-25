import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Chat with Counselor</h2>

      <div style={{ border: "1px solid gray", padding: "10px", height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <br />

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat