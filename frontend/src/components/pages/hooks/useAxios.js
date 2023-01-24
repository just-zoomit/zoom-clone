import { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios(url, id) {
  const  [originalData , setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id !== null) {
      setLoading(true);
      axios.get(`${url}/${id}`)
        .then(response => {
          setData(response.data.meeting);
          setOriginalData(response.data.meeting);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [url, id]);
  
  function changeData(changes){
    console.log('changeData', changes);
    setData({...data, ...changes});
};


  function updateData(newData) {
    axios.put(`${url}/${id}`, newData)
      .then(response => {
        setData(response.data.meeting);
        setOriginalData(response.data.meeting);
      })
      .catch(error => {
        setError(error);
      });
  }
  function resetData(changes){
    setData({originalData});
};
 
  function deleteData() {
    console.log('deleteData', id);
   

      const config = {
        method: 'delete',
        url: `api/zoom/${id}`,
        headers: { },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        setData(null);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  return { data, error, loading, updateData, deleteData ,changeData, resetData};
}

export default useAxios;