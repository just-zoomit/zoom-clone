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
      (async () => {
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
      })();

    }
  }, [url, id]);
  
  function changeData(changes){
    console.log('changeData', changes);
    setData({...data, ...changes});
};


  const updateData = async () => {
    console.log('updateData', data);
   await axios.put(`${url}/${id}`, {data})
      .then(response => {
        setData(response.data.meeting);
        setOriginalData(response.data.meeting);
      })
      .catch(error => {
        setError(error);
      });
  }
  function resetData(){
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