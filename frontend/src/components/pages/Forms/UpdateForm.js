import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
} from "./FormComponents";
import moment from "moment";
import { ModalCloseButton } from "../Home/buttonComposition";

function UpdateForm(mnID) {
  const [date, setDate] = React.useState("");
  const [showModal, setShowModal] = useState(false);

  console.log("mnID", mnID.mnID);
  console.log("Values", setShowModal);

  const {
    data,
    updateData,
    deleteData,
    resetData,
    changeData,
  } = useAxios(`api/zoom`, mnID.mnID);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate password and set passwordInvalid state accordingly
  };

  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  formData.start_time = moment(formData.start_time).format("YYYY-MM-DD HH:mm");

  console.log("Should Show ", setShowModal);

  return (
    <>
      <div style={{ width: "90%" }} ref={modalRef} onClick={closeModal}>
        <div>
          <ModalCloseButton
            text="close"
            size="20px"
            onClick={() => setShowModal(false)}
          />
          <h3>Schedule</h3>
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Topic:</StyledLabel>
            <StyledInput
              type="text"
              value={formData.topic}
              onChange={(e) => changeData({ topic: e.target.value })}
            />
            <StyledLabel> Date & Time :</StyledLabel>
            <StyledInput
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => changeData({ start_time: e.target.value })}
            />
            <StyledButton type="submit" onClick={updateData}>
              {" "}
              Update Data
            </StyledButton>
            &nbsp;
            <StyledButton type="submit" onClick={resetData}>
              {" "}
              Reset Data
            </StyledButton>
            &nbsp;
            <StyledButton type="submit" onClick={deleteData}>
              Delete Data
            </StyledButton>
          </StyledForm>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
