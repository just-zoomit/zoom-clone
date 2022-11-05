import React from 'react'
import ButtonsComponent from './ButtonsComponent'
import TableComponent from './TableComponent'


function Home() {
  return (
    <>
 
      <div className="button-container"><ButtonsComponent /></div>
      <div> <TableComponent /> </div>
     
    </>
  )
}

export default Home