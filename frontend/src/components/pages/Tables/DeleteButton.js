
import React, { useState } from "react";
import styled from 'styled-components';


const StyledButton = styled.button`
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 0;
  background: #ff0349;
  font-size: 22px;
  font-weight: 400;
  font-family: "Euclid Circular A";
  color: #f9f9f9;
  padding: 7px 16px 0 24px;
  height: 46px;
  width: 260px;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;

  &:disabled {
    /* cursor: not-allowed; */
    opacity: 0.8;
  }

  &.deleting .balls {
    animation: balls-drop 2 linear 1.25s;
  }

  &.deleting .filler {
    animation: fill 2.5s both;
  }

  &.deleting .lid {
    animation: lid-open 2.5s both;
  }
`;

export const Button = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = () => {
    setIsDeleting(true);
    // do something async
    setTimeout(() => {
      console.log("deleted");
      setIsDeleting(false);
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 1250);
    }, 2500);
  }

  return (
     <>
    <StyledButton
      // onClick={handleClick} 
      type="submit"
      className={isDeleting || isDeleted ? "deleting" : ""}
      disabled={isDeleting || isDeleted}
    >
      <span className="button-text">
        {isDeleting || isDeleted ? "Deleting" : "Delete"}
      </span>
      <span className="animation">
        <span className="balls"></span>
        <span className="lid"></span>
        <span className="can">
          <span className="filler"></span>
        </span>
      </span>
    </StyledButton>
    </>
  );
}
