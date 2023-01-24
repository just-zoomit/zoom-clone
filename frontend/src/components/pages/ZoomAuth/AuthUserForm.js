import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export const AuthUserForm = ({ setToken }) =>{
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  };

  return (
    <div
      style={{
        color: "#aaa",
        lineHeight: "30px",
        fontSize: "80%",
        position: "relative",
        margin: "auto",
        textAlign: "center",
        width: "auto",
        textDecoration: "none",
      }}
    >
      <h1>Log In With Zoom</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br />
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

AuthUserForm.propTypes = {
  setToken: PropTypes.func.isRequired
};
