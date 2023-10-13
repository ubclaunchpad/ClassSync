import Header from "../../components/Header";
import Banner from "../../components/Banner";
import React, { useState, useEffect } from "react";

export default function AddTutor() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("/endpoint", {
        body: JSON.stringify({
          message:
            "You've been invited to volunteer for The C.O.D.E Initiative",
          destination: email,
          subject: "Testing",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
    console.log("email sent");
  };
  return (
    <div className="screen-container">
      <Header />
      <Banner />

      <div className="send-email-container">
        <form onSubmit={handleSubmit}>
          <div className="enter-email">Enter Invitee Email: </div>
          <input
            type="email"
            label="email"
            value={email}
            placeholder="Email"
            className="send-email"
            onChange={handleChange}
          />
          <button type="submit">Send email</button>
        </form>
      </div>
    </div>
  );
}
