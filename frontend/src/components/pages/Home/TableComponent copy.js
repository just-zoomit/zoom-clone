import  React, { useState , useEffect } from 'react'
import "./Button.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    color: theme.palette.common.white,
   
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    boxShadow: "none"
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  }
}));


function TableComponent() {

    var [date,setDate] = useState(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
    
    const timeOptions = { hour: '2-digit', minute: "2-digit" };
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
    
        color: theme.palette.common.white,
       
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 12
      }
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        boxShadow: "none"
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      }
    }));

    
  // fetch data from backend
  const [meetingDetails, setMeetingDetails] = useState([]);

  

  useEffect(() => {
   
    const getTableData = async () => {
      const response = await fetch("/api/zoom/listmeetings");
      const newData = await response.json();
      console.log("New Data: ",newData.meetings)
      setMeetingDetails(newData.meetings);
    };
   
    getTableData();

    var timer = setInterval(()=>setDate(new Date()), 1000 )
      
    return function cleanup() {
        clearInterval(timer)
    }
  
  },[]);


  return (
  
    <TableContainer style={{ backgroundColor: "blue" , borderRadius: 35}} component={Paper} >
    
      <Table sx={{ minWidth: 500 , border: 'none'}} aria-label="customized table">
      

        <TableHead  sx={{ flex: '100%' }} >
          <TableRow  >
            <StyledTableCell>

            <h1 align="center">  {date.toLocaleTimeString([],timeOptions )}</h1>
            <h2 align="center">  {date.toLocaleDateString('en-us', dateOptions)}</h2>
            
            </StyledTableCell>
          </TableRow>
          
        </TableHead>

        <TableBody style={{ backgroundColor: "white" }} >
        
        {meetingDetails.map((row) => (
            <StyledTableRow  key={row.id}>
              <StyledTableCell component="th" scope="row">{row.topic} </StyledTableCell>
            
              <StyledTableCell align="left"> 
              <button className="button-3 bn37"> Join </button>
              {row.id}
             
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
   
  );
}

export default TableComponent


