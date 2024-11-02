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
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employees/');
console.log('response',response.data.data)

        setData(response.data.data); // Store data
      } catch (err) {
console.log('err',err)

        setError(err); // Handle error
      } finally {
        setLoading(true); // Turn off loading state
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array to run once on mount

  // Handling different states: loading, error, or data
  // if (loading) return <p>Loading...</p>;


  {loading && <Skeleton circle height={1000} width={1000} />}
  if (error) return <p>Error: {error.message}</p>;
  console.log("..data",data)
  return (
    <div style={{ 
        display: 'flex',        // Flexbox layout
       
        // flexWrap: 'wrap',
              // Allow wrapping to the next row
        alignItems: 'center', justifyContent:"center",marginLeft:"10%"
        // Center items horizontally
      }}>
        <ul style={{ 
          display: 'flex', 
          flexWrap: 'wrap',     // Allows multiple rows
        //   justifyContent: 'flex-start', // Centers the row content
          padding: 0,
          margin: 0,
          listStyleType: 'none'  // Removes default bullet points of the list
        }}>
          {data.map((item, index) => (
            <li key={index} style={{ 
              width: '25%',      // Each card takes 45% of the container (leaving space for margins)
              margin: '25px',    // Space between cards
              boxSizing: 'border-box'  // Ensures padding and margin don't exceed 100% width
            }}>
              <EmployeeCard employee={item} />
            </li>
          ))}
        </ul>
      </div>
  );
}

export default DataFetchingComponent;
