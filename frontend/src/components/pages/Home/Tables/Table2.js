import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { element } from "../dateTime";
import { ModalCloseButton } from "../buttonComposition";
import { useResource } from "../useResource";
import useAxios from "../useAxios";

import { json } from "react-router";

import { ButtonDanger } from "../../ScheduleDialog/theme/globalStyles";
import { TableContainer, StyledTextbox } from "./Table2Components";

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
  // console.log('id in table2', id);

  function handleIdChange() {
    setId(meeting.meeting.id);
  }

  const getMeetingInfo = async (id) => {
    const response = await axios.get(`api/zoom/${id}`);

    setMeeting(response.data);

    setOpenModal(true);
  };

  const closeModal = () => {
    setMeeting(null);
    setOpenModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const columns = [
    {
      selector: (row) => row.topic,
    },
    {
      selector: (row) => row.keyField,
    },
    {
      selector: (row) =>
        row.keyField ? (
          <div>
            <ButtonDanger
              value={row.keyField}
              // onClick={() => openModal(row.keyField)}
              onClick={() => getMeetingInfo(row.keyField)}
            >
              <i class="material-icons large icon-blue md-48"> edit</i>
            </ButtonDanger>
          </div>
        ) : (
          "No"
        ),
      right: true,
    },
  ];

  console.log("openmodal", openModal);
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
                  <form>
                    <StyledTextbox>
                      <input
                        type="text"
                        id="topic"
                        placeholder="Topic"
                        value={meeting.meeting.topic}
                        onChange={(e) =>
                          console.log("e.target.value", e.target.value)
                        }
                      />
                      <label htmlFor="topic">Topic:</label>
                    </StyledTextbox>
                    <h3>Date & Time</h3>
                    <hr class="solid"></hr>
                    <div className="btn-container">
                      <p>Data: {data}</p>

                      <button
                        style={{ color: "black" }}
                        onClick={() => updateData({ some: "new data" })}
                      >
                        Update Data
                      </button>

                      <button
                        style={{ color: "black" }}
                        onClick={deleteData}
                        onChange={handleIdChange}
                      >
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
