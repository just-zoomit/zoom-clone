import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  
  /* Dialog Labels*/
  label {
  
    transform-origin: 0% 0%;
    pointer-events: none;
    height: 32px;
    border-radius: 27px;
  }
  
/* Dialog Title */
  h3 {
    width: 90vw;
    max-width: 20rem;
    background: #fff;
    color: #656e77;
    border: 0;
    text-align: center;
  }
  
/* Dialog Input  */
  input {
    font-family: "Euclid Circular A";
    font-size: 20px;
    border: 1px solid blue;
    outline: none;
   
  }

`;

const ButtonDanger = styled.button`
position: relative;
color: grey;
place-items: center;
font-weight: bold;
width: 42px;
height: 16px;
border-radius: 25px;
border: 5;
margin: 0 auto;
grid-gap: 80px;
padding:0;
flex-direction: row;
`;

export { GlobalStyle, ButtonDanger };