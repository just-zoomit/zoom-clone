import React, { useRef, useState } from "react";
import ReactDom from "react-dom";

import { useNavigate } from "react-router-dom";

const display = {
  display: "inline-block",
};

export const JoinModal = ({ setShowModal }) => {
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
  const id = useRef();
  const password = useRef();
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the topic, start and end date values here
  
      if (id.current.value === "" || password.current.value === "") {
        alert("Please enter a valid meeting ID and password");
      } else {
        setShowModal(false);
        navigate(`/msdk/?mn=${id.current.value}&pw=${password.current.value}`);
      }
  };


  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <button onClick={() => setShowModal(false)}>X</button>

        {setShowModal && (
          <div>
            <p>Join Meeting</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="topic">Meeting Number</label>
              <br />
              <input
                type="text"
                id="topic"
                ref={id}
                required={true}
                
              />
              <br />
              <label htmlFor="topic">Meeting Password</label>
              <br />
              <input
                type="text"
                id="topic"
                ref= {password}
                required={true}
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
                />
                 {" "}Host
              </label>
              &nbsp; &nbsp;
              <label>
                <input
                  type="radio"
                  value="Participant"
                  style={{ display: "inline-block" }}
                  checked={role === 0}
                  onChange={() => setState({ role: 0 })}
                />
                {" "}Participant
              </label>


              <div className="btn-container">
                <button type="submit" style={{ background: "blue" }}>
                {role === 0 ? 'Join Meeting' : 'Start Meeting'}
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
