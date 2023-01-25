import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { element } from "../Home/dateTime";
import { ModalCloseButton, EditButton } from "../Home/buttonComposition";
import { useResource } from "../hooks/useResource";
import useAxios from "../hooks/useAxios";

import { ButtonDanger } from "../theme/globalStyles";
import { TableContainer, StyledTextbox } from "./TableComponents";
import moment from 'moment';

const customStyles = {
  rows: {
    style: {
      minHeight: "35px", 
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", 
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", 
      paddingRight: "30px",
    },
  },
};


export default function Table2() {
  
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setMeeting(null);
      setOpenModal(false);
    }
  };

  const [meeting, setMeeting] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const [id, setId] = useState(null);
  const {
    data,
    error,
    loading,
    updateData,
    changeData,
    deleteData,
    resetData,
  } = useAxios(`api/zoom`, id) || {};

  const listmeetings = useResource("api/zoom/listmeetings");
  const newData = listmeetings?.meetings?.map((item) => ({
    keyField: item.id,
    topic: item.topic,
  }));

  const getMeetingInfo = async (id) => {
    const response = await axios.get(`api/zoom/${id}`);

    setMeeting(response.data);
    setId(id);
    setOpenModal(true);
  };


  useEffect(() => {
    if (data) {
      console.log("Form data Set");
      setFormData(data);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const columns = [
    {
      selector: (row) => (
        <div onClick={(e) => e.stopPropagation()}>{row.topic}</div>
      ),
    },
    {
      selector: (row) => (
        <div onClick={(e) => e.stopPropagation()}>{row.keyField}</div>
      ),
    },
    {
      selector: (row) =>
        row.keyField ? (
          <div>
            <ButtonDanger
              value={row.keyField}
              onClick={() => getMeetingInfo(row.keyField)}
            >
                    <i class="material-icons large icon-blue md40px">  edit </i>

            </ButtonDanger>
          </div>
        ) : (
          <p>Loading</p>
        ),
    },
  ];

  formData.start_time = moment(formData.start_time).format('YYYY-MM-DD HH:mm')
  
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

              {openModal ? (
                <div>
                  <h3>Schedule</h3>
                  <form>
                    <StyledTextbox>
                      <input
                        type="text"
                        id="topic"
                        placeholder="Topic"
                        value={formData.topic}
                        onChange={(e) => changeData({ topic: e.target.value })}
    
                      />
                      <label htmlFor="topic">Topic:</label>
                    </StyledTextbox>
                    <h3>Date & Time</h3>
                    <hr class="solid"></hr>
                   
                    <input
                      type="datetime-local"
                      value={formData.start_time}
                      required={true}
                      onChange={(e) =>
                        changeData({ start_time: e.target.value })
                      }
                      style={{display: "inline-block"}}
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
                      <button style={{ color: "black" }} onClick={resetData}>
                        {" "}
                        Reset Data
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
              ) : (
                <p>Loading</p>
              )}
            </div>
          </div>,
          document.getElementById("portal")
        )}
    </div>
  );
}
