import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactDom from "react-dom";

import { useResource } from "../Home/useResource";


// To Be Refactored
const display = {
  display: "inline-block",
};

export const EditPopModal = ({ setShowModal }) => {
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
  
  const id = 1
  const getMeeting = useResource(`/api/zoom/${id}`);
  
  const [meeting, setMeeting] = useState(null);



  

  const handleSubmit = (event) => {
    
    // Do something with the topic, start and end date values here
    // const startTime = formatDate(prevStartDate.current) + ' ' + time + ' ' + 'UTC'
    // const endTime = formatDate(prevEndDate.current) + ' ' + toTime + ' ' + 'UTC'

    

      setMeeting(getMeeting.data);

      setShowModal(false);
      event.preventDefault();
  };

  useEffect(() => {
    const fetchModalData = async () => {
    // const { data } = await axios.get(`/api/zoom/${id}`);
    setTopic(topic);
    setStartTime(time);
    setEndTime(endTime);
    };
    fetchModalData();
  }, [endTime, time, topic]);

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
              <h4>to:</h4>
              <input
                type="date"
                id="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={display}
              />
              &nbsp; &nbsp;
              <input
                type="time"
                id="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={display}
              />
              <hr class="solid"></hr>
            
              <div className="btn-container">
                <button type="submit" style={{ background: "blue" }}>
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