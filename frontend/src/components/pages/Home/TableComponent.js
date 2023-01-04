import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import styles from './Button.module.css';
import ButtonsComponent from "./ButtonsComponent";


import { useNavigate } from "react-router-dom";

const columns = [
  {
    id: "topic",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "id",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(0),
  },
];

function TableComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const [date, setDate] = React.useState(
    new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
  );

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getData = (data) => {
    console.log("Coming From ButtonsCompoonet:", data);
    setMeetingDetails(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); 
  };

  const handleNavigate= (e) => {
    console.log("Navigating to: ", e.target.value);

    if (e.target.value ) {
      
      
      navigate(`/msdk/?mn=${e.target.value}&pw=${e.target.value}`);
    }
  };

  // fetch data from backend
  const [meetingDetails, setMeetingDetails] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="button-container">
        {" "}
        <ButtonsComponent onSubmit={getData} />{" "}
      </div>
      <div>
        <Paper
          sx={{}}
          style={{ overflowY: "hidden", borderRadius: 35, border: 0 }}
        >
          <TableContainer
            sx={{ maxHeight: 450, borderBottom: "none" }}
            style={{ borderRadius: 35 }}
          >
            <Table aria-label="table" sx={{ border: 0 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      overflowX: "hidden",
                    }}
                    align="center"
                    colSpan={3}
                  >
                    <h2 align="center">
                      {" "}
                      {date.toLocaleTimeString([], timeOptions)}
                    </h2>
                    <h2 align="center">
                      {" "}
                      {date.toLocaleDateString("en-us", dateOptions)}
                    </h2>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {meetingDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ?  <button  className={`${styles.buttonDanger} ${styles.bn37}`}  value={column.format(value)} onClick={handleNavigate}> Join </button>
                                  : value}
                              </TableCell>
                            </>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            style={{ overflowX: "hidden" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={meetingDetails.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}
export default TableComponent;
