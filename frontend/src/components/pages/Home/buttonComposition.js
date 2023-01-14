import styled from "styled-components";

const Bn37 = styled.div`
  transition: transform 0.2s cubic-bezier(0.235, 0, 0.05, 0.95);
`;

const Bn37Hover = styled.div`
  transition: transform 0.2s cubic-bezier(0.235, 0, 0.05, 0.95);
`;

const Bn37Disabled = styled.div`
  transition: transform 0.2s cubic-bezier(0.235, 0, 0.05, 0.95);
`;

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
  lineHeight: 100px;
  border: 0;
  color: white;
`;

export const Button = ({ size, color, text,label, ...props }) => {
  return (
    <div>
    <button
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
      }}
      {...props}
    >
      {" "}
      {text}{" "}
    </button>
    <p> {label}</p>
    </div>
  );
};

export const DangerBlueButton = (props) => {
  return <Button {...props} color="#faa92f" />;
};

export const BigSuccessButton = (props) => {
  return <Button {...props} color="#316efd" size="large" />;
};
