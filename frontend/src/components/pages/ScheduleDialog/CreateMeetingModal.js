import React, { useRef, useState, useEffect } from "react";
import ReactDom from "react-dom";
import { ModalCloseButton } from "../Home/buttonComposition";

import styled from 'styled-components';

const display = {
  display: "inline-block",
};


//ScheduleModal component defines the modal that pops up when the user clicks on the "Schedule" button. 
//It demonstrates the use of controlled form pattern and shows how to schedule/create a meeting.
// Adopted Controlled form pattern. It does care about the state of the form and the state of the input fields.
const StyledTextbox = styled.div`
  position: relative;
 
  label {
    position: absolute;
    display: grid;
    place-items: center;
    transform-origin: 0% 0%;
    pointer-events: none;
    top: 4px;
    left: 4px;
    height: 32px;
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
    border: 1px solid blue;
    borderccolor: blue;
    padding-left: 126px;
    font-size: 12px;
    font-family: "Euclid Circular A";
    color: rgb(29 26 26 / 96%);
    outline: blue;
    transition: 0.3s;

    &::placeholder {
      color: black;
    }
   
    &:focus, &:valid {
      
      padding-right: 20px;
    }
  }

  & :is(input:focus) ~ label {
    translate: 0 -56px;
    scale: 0.825;
  }

`;

/* Dialog Title */
const StyledH3 = styled.h3`
    width: 90vw;
    max-width: 20rem;
    padding: 1em;
    background: #fff;
    color: #656e77;
    border: 0;
    text-align: center;
`;

export const CreateMeetingModal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const [topic, setTopic] = useState("");

  const [state, setState] = useState({ role: 1 });
  const { role } = state;

  const [time, setTime] = useState("");
  const [toTime, setToTime] = useState("");

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);

  const [date, setDate] = useState(defaultDate);
  const [toDate, setToDate] = useState(defaultDate);

  const prevStartDate = useRef("");
  const prevEndDate = useRef("");

  function formatDate(date) {
    date = new Date(date);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const handleSubmit = (event) => {
    // Do something with the topic, start and end date values here
    const startTime =
      formatDate(prevStartDate.current) + " " + time + " " + "UTC";
    const endTime =
      formatDate(prevEndDate.current) + " " + toTime + " " + "UTC";

    const POST_OPTIONS = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
        start_time: `${startTime}`,
        end_time: `${endTime}`,
        role: parseInt(role, 10),
      }),
    };

    fetch("/api/zoom/create", POST_OPTIONS).then((data) => data.json());

    setShowModal(false);
    event.preventDefault();
  };

  useEffect(() => {
    prevStartDate.current = date + " ";
    prevEndDate.current = toDate + " ";
  }, [date, toDate]);

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        
      <ModalCloseButton
          type="submit"
          text="close"
          size = "20px"
          onClick={() => setShowModal(false)}
        />

        {setShowModal && (
          <div>
            <StyledH3>Schedule</StyledH3>
            <form onSubmit={handleSubmit}>

             
             <StyledTextbox> 
              <input
                type="text"
                id="topic"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}/>
               <label htmlFor="topic">Topic:</label>
               </StyledTextbox>
               &nbsp; &nbsp;
           

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
                onChange={(e) => setTime(e.target.value)}
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
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                style={display}
              />
              <hr class="solid"></hr>
              <p>Role Type</p>
              <label>
                <input
                  type="radio"
                  value="Host"
                  style={{ display: "inline-block" }}
                  checked={role === 1}
                  onChange={() => setState({ role: 1 })}
                />{" "}
                Host
              </label>
              &nbsp; &nbsp;
              <label>
                <input
                  type="radio"
                  value="Participant"
                  style={{ display: "inline-block" }}
                  checked={role === 0}
                  onChange={() => setState({ role: 0 })}
                />{" "}
                Participant
              </label>
              <div className="btn-container">
                <button type="submit" style={{ background:"#316efd" }}>
                  Submit
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
