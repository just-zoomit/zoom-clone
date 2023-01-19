import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactDom from "react-dom";

import { withEditableMeeting } from "./withEditableMeeting";

// To Be Refactored
const display = {
  display: "inline-block",
};

export const EditPopModal = ({ setShowModal, data }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const [topic, setTopic] = useState("");
 
  const [time, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);

  const [date, setDate] = useState(defaultDate);
  const [toDate, setToDate] = useState(defaultDate);


  // Pass data from custom hook call Table.js
  // console.log("data Print", data)
  const editDataa = data
  console.log("EditData", editDataa);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the topic, start and end date values here

    const meetingData = data
    console.log("meetingData Print", meetingData)
    
    // Handle updated data
      setTopic("Test React");
      setDate("2021-08-01");
      setStartTime("12:00");
      setShowModal(false);
      
  };

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

  useEffect(() => {
    
   
    //Set initial data
    setTopic(editDataa.meeting.topic);
    const newDate = convertDate(editDataa.meeting.start_time).split(" ")
    console.log("EditData start date and time :", newDate);
    setDate(newDate[0]);
    setStartTime(newDate[1]);
    // setStartTime(date[1]);
    // setDate(editDataa.meeting.start_time);
    // console.log("Formated to Localstring", new Date(editDataa.meeting.start_time).toLocaleString())
    

  }, []);

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
     
        <button onClick={() => setShowModal(false)}>X</button>

        {setShowModal && (
          <div>
            <p>Schedule</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="topic">Topic:</label>
              <br />
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <br />
              <label htmlFor="date">Date & Time </label>
              <br />
              <input
                type="date"
                id="datetime-local"
                value={date}
                required={true}
                onChange={(e) => setDate(e.target.value)}
                style={display}
              />
              &nbsp; &nbsp;
              <input
                type="time"
                id="time"
                value={time}
                required={true}
                onChange={(e) => setStartTime(e.target.value)}
                style={display}
              />
           
              <hr class="solid"></hr>
            
              <div className="btn-container">
                <button type="submit" style={{ background: "blue" }} >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};