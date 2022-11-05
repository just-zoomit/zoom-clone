import  React, { useState , useEffect } from 'react'


function TableComponent() {
    var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  return (
    <>
           <th align="center" className="table-header-group">
            <h1>  {date.toLocaleTimeString()}</h1>
            <h2>  {date.toLocaleDateString()}</h2>
        </th>

        <table align="center">
          <tr>
            <td align="center" width="440px">
              <h3 align="center"> Jack Austin </h3>
            </td>

            <td>
              <button className="button-3 bn37">View</button>
            </td>
          </tr>
          <br />

          <tr>
            <td>
              <h3 align="center"> Mack Jones </h3>
            </td>

            <td>
              <button class="button-3 bn37">View</button>
            </td>
          </tr>
        </table>
    </>
  )
}

export default TableComponent