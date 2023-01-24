import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import DataTable from "react-data-table-component";

import { useResource } from "../Home/useResource";

import { UpdateMeetingModal } from "../ScheduleDialog/UpdateMeetingModal";

import { element } from "./dateTime";

//controling the icon font size, need to fix
import "../ScheduleDialog/styles.css";

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

const TableContainer = styled.div`
    border: solid .2em #f5f5f5;  
    border-radius: 2.5em;
    width: auto;
    height: auto;
    background-color:#ffffff;
`;
const ButtonDanger = styled.button`
     position: relative;
    color: grey;
    place-items: center;
    font-weight: bold;
    width: 62px;
    height: 26px;
    border-radius: 25px;
    border: 5;
    margin: 0 auto;
    grid-gap: 80px;
    padding:0;
    flex-direction: row;
`;
 
export default function Table({ data }) {
  const [loading] = useState(false);
  const [id, setId] = useState("");

  const [showModal, setShowModal] = useState(false);

  const listmeetings = useResource("api/zoom/listmeetings");

  // console.log('listmeetings', listmeetings);


  const openModal = (id) => {
    setShowModal(!showModal);
    setId(id);
  }
  // set local storage value for meeting id

  // console.log('id', id);

  const columns = [
    {
      selector: (row) => row.topic,
    },
    {
      selector: (row) =>
        row.keyField ? (
          <div>
            <ButtonDanger
              value={row.keyField}
              onClick={() => openModal(row.keyField)}
              // onClick={() => setId(row.id)}
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

  // console.log('data', data);

  const newData = data?.map(item => ({ keyField: item.id, topic: item.topic }))

  // console.log(newData)

  return (
    <>
      {/*  outside of the columns array */}
      <div style={{  justifyContent: "right"}}>
      
      {showModal ? (<UpdateMeetingModal setShowModal={setShowModal} id={id}  />) : null}

     <TableContainer>   
        <div style={{ margin: "10px" }}>
          <DataTable
            title={element}
            columns={columns}
            data={newData}
            progressPending={loading}
            customStyles={customStyles}
            pagination
          />
        </div>
      </TableContainer>
      </div>
    </>
  );
}
