// 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './EmpoloyeeCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Importing skeleton CSS

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employees/');
        setData(response.data.data);
      } catch (err) {
setError(err); 
      } finally {
        setLoading(true); 
      }
    };
 fetchData();
  }, []); 


  {loading && <Skeleton circle height={1000} width={1000} />}
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div style={{ 
        display: 'flex',       
        alignItems: 'center', justifyContent:"center",marginLeft:"10%"
       
      }}>
        <ul style={{ 
          display: 'flex', 
          flexWrap: 'wrap',   
       
          padding: 0,
          margin: 0,
          listStyleType: 'none'  
        }}>
          {data.map((item, index) => (
            <li key={index} style={{ 
              width: '25%',      
              margin: '25px',    
              boxSizing: 'border-box'  
            }}>
              <EmployeeCard employee={item} />
            </li>
          ))}
        </ul>
      </div>
  );
}

export default DataFetchingComponent;
