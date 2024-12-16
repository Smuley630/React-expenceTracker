import React from 'react';

const EmployeeCard = ({ employee }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Employee Details</h3>
      <div style={styles.field}><strong>First Name:</strong> {employee.FIRST_NAME}</div>
      <div style={styles.field}><strong>Last Name:</strong> {employee.LAST_NAME}</div>
      <div style={styles.field}><strong>Phone Number:</strong> {employee.PHONE_NUMBER}</div>
      <div style={styles.field}><strong>Job ID:</strong> {employee.JOB_ID}</div>
      <div style={styles.field}><strong>Salary:</strong> {employee.SALARY}</div>
      <div style={styles.field}><strong>Department ID:</strong> {employee.DEPARTMENT_ID}</div>
      <div style={styles.field}><strong>Manager ID:</strong> {employee.MANAGER_ID}</div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  field: {
    marginBottom: '8px',
    color: '#555',
  },
};

const EmployeeList = ({ employees }) => {
  
  return (
    <div style={styles.container}>
      {employees.map((employee, index) => (
        <EmployeeCard key={index} employee={employee} />
      ))}
    </div>
  );
};

styles.container = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

export default EmployeeList;
