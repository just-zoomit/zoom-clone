import React from 'react';
import styled from 'styled-components';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel } from './FormComponents';

function UpdateForm() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate password and set passwordInvalid state accordingly
        if (password.length < 8) {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }
    }

    const usernameEntered = (e) => {
        setUsername(e.target.value);
        // buttonEnabled(username, password)
    }

    const passwordEntered = (e) => {
        setPassword(e.target.value);
        // buttonEnabled(username, password)
    }

    const buttonEnabled = (username, password) => {
        if(username.length > 0 && password.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Username:</StyledLabel>
            
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>

            <StyledLabel invalid={passwordInvalid}>Password:</StyledLabel>

            <StyledInput type="password" value={password} onChange={(e) => passwordEntered(e)} />

            {passwordInvalid && <StyledAlert>Password is invalid.</StyledAlert>}

            <StyledButton type="submit" disabled={!username || !password}>Login</StyledButton>
        </StyledForm>
    )
}

export default UpdateForm