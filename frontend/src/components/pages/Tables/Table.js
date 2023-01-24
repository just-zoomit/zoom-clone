import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { element } from "../Home/dateTime";
import { ModalCloseButton } from "../Home/buttonComposition";
import { useResource } from "../hooks/useResource";
import useAxios from "../hooks/useAxios";

import { json } from "react-router";

import { ButtonDanger } from "../theme/globalStyles";
import { TableContainer, StyledTextbox } from "./TableComponents";

import { Button } from "./DeleteButton";

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
    style: {
      minHeight: "35px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "30px",
    },
  },
};

const display = {
  display: "inline-block",
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

  const newDate = date.toISOString().slice(0, 10);
  const newTime = hours + ":" + minutes.toString().padStart(2, "0");

  return newDate + " " + newTime;
};

export default function Table2() {
  // const [id, setId] = useState();
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setMeeting(null);
    
      setOpenModal(false);
    }
  };

  const [meeting, setMeeting] = useState();
  const [openModal, setOpenModal] = useState(false);

  const [id, setId] = useState(null);
  const { data, error, loading, updateData, deleteData } = useAxios(
    `api/zoom`,
    id
  );

  const listmeetings = useResource("api/zoom/listmeetings");
  const newData = listmeetings?.meetings?.map((item) => ({
    keyField: item.id,
    topic: item.topic,
  }));



  const getMeetingInfo = async (id) => {
    const response = await axios.get(`api/zoom/${id}`);

    setMeeting(response.data);
    setId(id);
    setTimeout(() => {

    setOpenModal(true);
    }
    , 1000);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const columns = [
    {
      selector: (row) => <div onClick={(e) => e.stopPropagation()}>{row.topic}</div>,
    },
    {
      selector: (row) => <div onClick={(e) => e.stopPropagation()}>{row.keyField}</div>,
    },
    {
      selector: (row) =>
        row.keyField ? (
          <div>
            <ButtonDanger
              value={row.keyField}
              onClick={() => getMeetingInfo(row.keyField)}
            >
              <i class="material-icons large icon-blue md-48"> edit</i>
            </ButtonDanger>
          </div>
        ) : <p>Loading</p>,
    },
];



  // const newDate = convertDate(meeting.start_time).split(" ");


  console.log("meeting", meeting);
  console.log("meetingID", id);

  return (
    <div style={{ maxWidth: "100vw", overflowX: "scroll" }}>
      <TableContainer>
        <div style={{ margin: "10px" }}>
          <DataTable
            title={element}
            columns={columns}
            data={newData}
            // progressPending={loading}
            customStyles={customStyles}
            pagination
          />
        </div>
      </TableContainer>
      {!!meeting &&
        ReactDom.createPortal(
          <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="modal">
              <ModalCloseButton
                type="submit"
                text="close"
                size="20px"
                onClick={closeModal}
              />

              {openModal && (
                <div>
                  <h3>Schedule</h3>
                  <form onSubmit={deleteData}>
                    <StyledTextbox>
                      <input
                        type="text"
                        id="topic"
                        placeholder="Topic"
                        value={meeting.meeting.topic}
                       
                      />
                      <label htmlFor="topic">Topic:</label>
                    </StyledTextbox>
                    <h3>Date & Time</h3>
                    <hr class="solid"></hr>
                    <input
                      type="date"
                      id="datetime-local"
                      value={"2021-08-01"}
                      required={true}
                      // onChange={(e) => setDate(e.target.value)}
                      style={display}
                    />
                    &nbsp; &nbsp;
                    <input
                      type="time"
                      id="time"
                      value={"10:00"}
                      required={true}
                      // onChange={(e) => setTime(e.target.value)}
                      style={display}
                    />
                    <br />
                    <div style={{ display: "block" }}>
                      <button
                        style={{ color: "black" }}
                        onClick={() => updateData({ some: "new data" })}
                      >
                        Update Data
                      </button>
                      &nbsp;
                      <button style={{ color: "black" }} onClick={deleteData}>
                        {" "}
                        Delete Data
                      </button>
                    </div>
                    &nbsp;
                  </form>
                </div>
              )}
            </div>
          </div>,
          document.getElementById("portal")
        )}
    </div>
  );
}
