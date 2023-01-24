import { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios(url, id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id !== null) {
      setLoading(true);
      axios.get(`${url}/${id}`)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [url, id]);

  function updateData(newData) {
    axios.put(`${url}/${id}`, newData)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }

  function deleteData() {
    axios.delete(`${url}/${id}`)
      .then(response => {
        setData(null);
      })
      .catch(error => {
        setError(error);
      });
  }

  return { data, error, loading, updateData, deleteData };
}

export default useAxios;