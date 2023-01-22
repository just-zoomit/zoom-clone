import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

import { withCrudMeetingOptions } from "./withCrudMeetingOptions";

import { ModalCloseButton } from "../Home/buttonComposition";

import { Button } from "./DeleteButton";

import styled from "styled-components";

// To Be Refactored
const display = {
  display: "inline-block",
};

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

/* Dialog Title */

// This function handles the page load. When a button is clicked it shows wrong data.
// The correct data is only shown when the page is manually refreshed.
const localStorageMeetingID = (key) => {
  const existing = localStorage.getItem("meetingID");
  const temp = localStorage.getItem("tempMeetingID");

  localStorage.setItem("tempMeetingID", existing);
  const data = existing == temp ? temp : existing;
  localStorage.setItem("meetingID", data);

  return localStorage.getItem(key);
};

export const UpdateMeetingModal = withCrudMeetingOptions(
  ({
    setShowModal,
    meeting,
    onChangeMeeting,
    onSaveMeeting,
    onResetMeeting,
    onDeleteMeeting,
  }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const getTopic = meeting || {};
    const { topic, start_time, id } = meeting || {};

    console.log("Topic meeting:", id);

    // close the modal when clicking outside the modal.
    const modalRef = useRef();
    const closeModal = (e) => {
      if (e.target === modalRef.current) {
        setShowModal(false);
      }
    };

    const openScheduleModal = () => {
      window.confirm("Are you sure you want to delete this item?");
      setIsDeleting(true);
      setShowModal2(true);
    };

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);

    const convertDate = (dateString) => {
      const date = new Date(dateString);
      date.setFullYear(2021);
      date.setMonth(7); // month is 0-indexed, so 7 corresponds to August
      date.setDate(1);
      date.setUTCHours(10);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const newDate = date.toISOString().slice(0, 10);
      const newTime = hours + ":" + minutes.toString().padStart(2, "0");

      return newDate + " " + newTime;
    };

    const newDate = convertDate(getTopic.start_time).split(" ");

    // render the modal JSX in the portal div one topic and start_time loads
    return meeting ? (
      ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <ModalCloseButton
              type="submit"
              text="close"
              size="20px"
              onClick={() => setShowModal(false)}
            />

            {setShowModal && (
              <div>
                <h3>Schedule</h3>
                <form>
                  <StyledTextbox>
                    <input
                      type="text"
                      id="topic"
                      placeholder="Topic"
                      value={getTopic.topic}
                      onChange={(e) =>
                        onChangeMeeting({ topic: e.target.value })
                      }
                    />
                    <label htmlFor="topic">Topic:</label>
                  </StyledTextbox>
                  <h3>Date & Time</h3>
                  <input
                    type="date"
                    id="datetime-local"
                    value={newDate[0]}
                    required={true}
                    onChange={(e) =>
                      onChangeMeeting({ start_time: e.target.value })
                    }
                    style={display}
                  />
                  &nbsp; &nbsp;
                  <input
                    type="time"
                    id="time"
                    value={newDate[1]}
                    required={true}
                    onChange={(e) =>
                      onChangeMeeting({ start_time: e.target.value })
                    }
                    style={display}
                  />
                  <hr class="solid"></hr>
                  <div className="btn-container">
                    <button
                      style={{ background: "#316efd" }}
                      onClick={onSaveMeeting}
                    >
                      Update
                    </button>
                    <button
                      style={{ background: "#faa92f" }}
                      onClick={onResetMeeting}
                    >
                      Reset
                    </button>

                    <button
                      style={{ background: "#fa1b01" }}
                      onClick={onDeleteMeeting}
                      onChange={(e) =>
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      }
                    >
                      <i class="material-icons large icon-blue md-48">
                        delete_forever
                      </i>
                    </button>
                  </div>
                  &nbsp;
                  {/* 
                  <div>
                    <Button onClick={() => openScheduleModal} />
                    {!isDeleting ? onDeleteMeeting : null }
                  </div> */}
                </form>
              </div>
            )}
          </div>
        </div>,
        document.getElementById("portal")
      )
    ) : (
      <p>Loading...</p>
    );
  },
  localStorageMeetingID("meetingID")
);