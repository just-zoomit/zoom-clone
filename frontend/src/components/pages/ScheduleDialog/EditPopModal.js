
import React, { useState, useRef } from "react";
import ReactDom from "react-dom";

import { withEditableMeeting } from "./withEditableMeeting";

// To Be Refactored
const display = {
  display: "inline-block",
};

// export const EditPopModal = ({ setShowModal, data }) => {

export const EditPopModal = withEditableMeeting(({setShowModal, meeting, onChangeMeeting, onSaveMeeting, onResetMeeting} ) => {

    const getTopic = meeting || {};
    const {topic, start_time, id } = meeting || {};

    console.log("Topic meeting:", id);

  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const [, setTopic] = useState("");
 
  const [, setStartTime] = useState("");

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);

  const [, setDate] = useState(defaultDate);

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

    const newDate = date.toISOString().slice(0,10)
    const newTime = hours + ":" + minutes.toString().padStart(2, '0');;

    return newDate + ' ' + newTime;
}

    const newDate = convertDate(getTopic.start_time).split(" ");
    console.log("EditData start date and time :", newDate[0]);


  // render the modal JSX in the portal div one topic and start_time loads
  return meeting ? ( ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
     
        <button onClick={() => setShowModal(false)}>X</button>

        {setShowModal && (
          <div>
            <p>Schedule</p>
            <form >
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
                onChange={(e) => onChangeMeeting({ start_time: e.target.value })}
                style={display}
              />
              &nbsp; &nbsp;
              <input
                type="time"
                id="time"
                value={newDate[1]}
                required={true}
                onChange={(e) => onChangeMeeting({ start_time: e.target.value })}
                style={display}
              />
           
              <hr class="solid"></hr>
              <div className="btn-container">
              <div>
              <button onClick={onResetMeeting}>Reset</button>
              &nbsp; &nbsp;
             <button onClick={onSaveMeeting}>Update</button>
             </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  ) ) : null;
},
"96038701421"
);