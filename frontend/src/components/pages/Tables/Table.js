import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { element } from "../Home/dateTime";
import { ModalCloseButton} from "../Home/buttonComposition";
import { useResource } from "../hooks/useResource";
import useAxios from "../hooks/useAxios";
import { handleError } from "../../shared";


import { ButtonDanger } from "../theme/globalStyles";
import { TableContainer, StyledTextbox } from "./TableComponents";
import moment from 'moment';
import UpdateForm from "../Forms/UpdateForm";
// import {UpdateForm} from "../ScheduleDialog/UpdateForm";

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

  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState(null);
  const {
    data,
    error,
    loading,
  } = useAxios(`api/zoom`, id) || {};

  const listmeetings = useResource("api/zoom/listmeetings");
  console.log("listmeetings", listmeetings.resources);
  const newData = listmeetings?.resources?.meetings?.map((item) => ({
    keyField: item.id,
    topic: item.topic,
  }));
  
  const openJoinModal = () => {
    setShowModal(true);
    console.log("showModal Table 1", showModal)
  }

  const getMeetingInfo = async (id) => {
    try {
    const response = await axios.get(`api/zoom/${id}`);

    setMeeting(response.data);
    setId(id);
    openJoinModal();


  } catch (handleError ) {
    console.log("Error", handleError);
    }
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
            <button
              value={row.keyField}
              onClick={() => getMeetingInfo(row.keyField)}
            >
                    <i class="material-icons large icon-blue md34px">  edit </i>
            </button>
          </div>
        ) : (
          <p>Loading</p>
        ),
    },
  ];

  formData.start_time = moment(formData.start_time).format('YYYY-MM-DD HH:mm')

  console.log("showModal Table", showModal)
  
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
          <div className="container" ref={modalRef} onClick={closeModal }>
            <div className="modal">
            
              {/* <ModalCloseButton
                text="close"
                size="20px"
                onClick={closeModal}
              /> */}

              {showModal ? <UpdateForm mnID={id} setShowModal={!showModal}  /> : null}
            </div>
          </div>,
          document.getElementById("portal")
        )}
    </div>
  );
}
