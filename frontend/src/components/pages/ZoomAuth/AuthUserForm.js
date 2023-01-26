import React, { useState } from "react";
import PropTypes from "prop-types";

import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from "../Forms/FormComponents";

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
      <StyledForm  onSubmit={handleSubmit}>
        <StyledLabel>
          <p>Username</p>
          <StyledInput  type="text" onChange={(e) => setUserName(e.target.value)} />
        </StyledLabel>
        <br />
        <StyledLabel>
          <p>Password</p>
          <StyledInput 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledLabel>
        <div>
          <StyledButton type="submit">Submit</StyledButton>
        </div>
      </StyledForm>
    </div>
  );
}

AuthUserForm.propTypes = {
  setToken: PropTypes.func.isRequired
};
