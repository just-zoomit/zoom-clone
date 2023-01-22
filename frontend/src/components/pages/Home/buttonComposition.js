import styled from "styled-components";
import "../ScheduleDialog/styles.css";

const Buttoner = styled.button`
  padding: 0;
  font-size: 16px;
  background: #316efd;
  background-color: #316efd;

  position: relative;
  display: grid;
  placeitems: center;
  borderradius: 25px;
  width: 99px;
  height: 99px;
  lineheight: 100px;
  border: 0;
  color: white;
`;

const StyledTextbox = styled.button`
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

// Adpoted Component Composition pattern, parent component of GenericPopModal

export const Button = ({ size, color, text, label, ...props }) => {
  return (
    <div>
      <button
        className="bn37"
        style={{
          padding: "0",
          frontSize: size === "large" ? "32px" : "16px",
          background: "#316efd",
          backgroundColor: color,

          display: "grid",
          placeItems: "center",
          borderRadius: "25px",
          width: "100px",
          height: "100px",
          lineHeight: "100px",
          color: "white",
          transition: "transform 0.2s cubic-bezier(0.235, 0, 0.05, 0.95)",
        }}
        {...props}
      >
        <i class="material-icons large icon-blue md40px"> {text} </i>
      </button>
      <p> {label}</p>
    </div>
  );
};

export const CloseButton = ({ size, color, text, ...props }) => {
  return (
    <div>
      <button
     
        style={{
          color: "#aaa",
          lineHeight: "50px",
          fontSize: "80%",
          position: "absolute",
          right: "0",
          textAlign: "center",
          top: "0",
          width: "70px",
          textDecoration: "none",
          "&:hover": {
            color: "#0a0a0a",
          },
        }}
        {...props}
      >
        <i
          style={{ fontSize: "20px" }}
          class="material-icons large icon-blue md40px"
        >
          {" "}
          {text}{" "}
        </i>
      </button>
    </div>
  );
};

export const ModalCloseButton = (props) => {
  return <CloseButton {...props} color="#316ffd" />;
};

export const DangerBlueButton = (props) => {
  return <Button {...props} color="#faa92f" />;
};

export const BigSuccessButton = (props) => {
  return <Button {...props} color="#316efd" size="large" />;
};
