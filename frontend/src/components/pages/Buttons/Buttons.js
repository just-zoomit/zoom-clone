import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreateMeetingModal } from "../ScheduleDialog/CreateMeetingModal";

import { JoinPopModal } from "../ScheduleDialog/JoinMeetingModal";

import { BigSuccessButton } from "./buttonComposition";
import { InstantMeeting } from "../ScheduleDialog/InstantMeetingModal";

import { ControlledModal } from "../Login/ControlledModal";
import { ControlledForm } from "../Login/ControlledForm";
import { AuthUserForm } from "../ZoomAuth/AuthUserForm";

import {GlobalStyle} from '../theme/globalStyles';


// Adpoted Component Composition pattern

const DivContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 80px;
  padding: 1;
  width: 50%;
  height: 200px;
  flex-direction: row | row-reverse | column | column-reverse;
`;

export default function Buttons(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const navigate = useNavigate();

  const openJoinModal = () => {
    setShowModal(true);
  };
  const openScheduleModal = () => {
    setShowModal2(true);
  };

  const [, setData] = useState(null);

  const startInstantMeeting = (data) => {

    // Catch error if data is null
    const { id, password } = data;
    if (!id || !password) {
    navigate(`/msdk/?mn=${id}&pw=${password}`);
    } else {
      console.log("Error: No data received");
    }
  };

  const handleDataReceived = (data) => {
    setData(data);
    startInstantMeeting(data);
  };


 // Handle data received from child component table switch button
  const handleClick = (event) => {
    event.preventDefault();
    try {
      props.onDataReceived(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearData = () => {
    props.onClearData();
  };
  // Switch to show modal
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const [isData, setIsData] = useState(false);

  // Switch button to show list meeting
  const handleListClick = () => {
    setIsData(!isData);
  };

  let button;

  if (isData) {
    button = ( <BigSuccessButton
    text="clear_all"
    onClick={handleClearData}
    label="Clear Data"
  />
    );
  } else {
    button = (
      <BigSuccessButton
        text="list"
        onClick={handleClick}
        label="List"
      />
    );
  }

  return (
    <>
      <div>
        <DivContainer>
          <InstantMeeting onDataReceived={handleDataReceived} />

          <BigSuccessButton
            text="add_box"
            label="Join"
            onClick={openScheduleModal}
          />
          <GlobalStyle />
          {showModal2 ? <JoinPopModal setShowModal={setShowModal2} /> : null}

          {/*
           *
           *   Ex. Controlled Modal and Form
           *   (Refactor Logic to auth external users)
           */}
          <ControlledModal
            shouldShow={shouldShowModal}
            onRequestClose={() => {
              alert("Modal closed");
              setShouldShowModal(false);
            }}
          >
           {/* <ControlledForm /> */}
            <AuthUserForm />
          </ControlledModal>

          <BigSuccessButton
            text= "login"
            label={shouldShowModal ? "Hide Modal" : "Login With Zoom"}
            onClick={() => setShouldShowModal(!shouldShowModal)}
          />

        </DivContainer>

        <DivContainer>
          <BigSuccessButton
            text="calendar_month"
            label="Schedule"
            onClick={openJoinModal}
          />
          {showModal ? <CreateMeetingModal setShowModal={setShowModal} /> : null}

          <BigSuccessButton
            text="list"
            onClick={handleClick}
            label="List"
          />
          {/* Ex. clear Table data switch */}
          <BigSuccessButton
            text="clear_all"
            onClick={handleClearData}
            label="Clear Data"
          />
          
        </DivContainer>
      </div>
    </>
  );
}
