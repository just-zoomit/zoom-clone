import React, { useState, useRef } from "react";
import ReactDom from "react-dom";

import { withEditableMeeting } from "./withEditableMeeting";
import styles from "../Home/Button.module.css";
// To Be Refactored
const display = {
  display: "inline-block",
};

// export const EditPopModal = ({ setShowModal, data }) => {

var passData = "";

export const EditPopModal = withEditableMeeting(
  ({
    dataa,
    setShowModal,
    meeting,
    onChangeMeeting,
    onSaveMeeting,
    onResetMeeting,
    onDeleteMeeting,
  }) => {
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

    passData = dataa || {};
    console.log("editDataa:", passData);

    // render the modal JSX in the portal div one topic and start_time loads
    return meeting ? (
      ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div
              style={{
                position: " absolute",
                right: "7px",
                top: "7px",
                background: "#fa1b01",
              }}
            >
              <button onClick={() => setShowModal(false)}>
                <span class="material-symbols-outlined">cancel</span>
              </button>
            </div>

            {setShowModal && (
              <div>
                <p>Schedule</p>
                <form>
                  <label htmlFor="topic">Topic:</label>
                  <br />
                  <input
                    type="text"
                    id="topic"
                    value={getTopic.topic}
                    onChange={(e) => onChangeMeeting({ topic: e.target.value })}
                  />
                  <br />
                  <label htmlFor="date">Date & Time </label>
                  <br />
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
                      style={{ background: "#316efd" }}
                      onClick={onResetMeeting}
                    >
                      Reset
                    </button>

                    <button
                      style={{ background: "#fa1b01" }}
                      onClick={onDeleteMeeting}
                      onChange={() =>
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
  "94431876430"
);
