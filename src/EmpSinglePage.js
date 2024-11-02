import React from 'react';

// EmployeeCard Component
const EmpSinglePage = ({ employee }) => {
   


    const isoDateString = employee?.BirthDate;
const dateObj = new Date(isoDateString);

// Get the individual components
const day = String(dateObj.getUTCDate()).padStart(2, '0'); // Day with leading zero
const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Month (0-indexed)
const year = dateObj.getUTCFullYear(); // Year

// Format as DD-MM-YYYY
const formattedDate1 = `${day}-${month}-${year}`;
console.log(formattedDate1)
    return (
        <div style={styles.card}>
            <img src={employee.PhotoPath} alt={employee.PhotoPath} style={styles.image} />
            <h2 style={styles.name}>Name:{employee?.firstname}</h2>
            <p style={styles.title}>Date of birth: <br/>{formattedDate1}</p>
            <p style={styles.title}>Position :{employee?.Title}</p>
            <p style={styles.salary}>Salary: ${employee?.Salary}</p>
        </div>
    );
};

// Styling for the card
const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        // textAlign: 'center',
        width: '150%',
        margin: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: '65%',
        borderRadius: '4px',
    },
    name: {
        fontSize: '20px',
        margin: '8px 0',
    },
    title: {
        fontSize: '16px',
        color: '#666',
    },
    salary: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default EmpSinglePage;
