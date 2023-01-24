import styled from 'styled-components';

const StyledTextbox = styled.div`
  position: relative;

  label {
    position: absolute;
    display: grid;
    place-items: center;
    pointer-events: none;
    top: 4px;
    left: 4px;
    width: 90px;
    border-radius: 27px;
    background: #5071fa;
    color: rgb(255 255 255 / 80%);
    transition: 0.3s;
  }

  input {
    width: 300px;
    height: 40px;
    border-radius: 30px;
    background: white;
    borderccolor: blue;
    padding-left: 126px;
    color: rgb(29 26 26 / 96%);
    transition: 0.3s;

    &::placeholder {
      color: black;
    }

    &:focus,
    &:valid {
      padding-right: 20px;
    }
  }

  & :is(input:focus) ~ label {
    translate: 0 -56px;
    scale: 0.825;
  }
`;

const TableContainer = styled.div`
border: solid .2em #f5f5f5;  
border-radius: 2.5em;
width: auto;
height: auto;
background-color:#ffffff;
`;

export { TableContainer, StyledTextbox }