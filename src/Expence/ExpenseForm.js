import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { expenceAddedFlag } from '../redux/action';

const ExpenseForm = ({onExpenseUpdate }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);

  const selectedUser = useSelector((state) => state.counter.selectedUser);
  const storedUserId = localStorage.getItem('user_id');
  const user_id = selectedUser?.user_id || storedUserId;

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsBlocking(true);
    if (!user_id || amount.trim() === '' || category.trim() === '' || date.trim() === '' || description.trim() === '') {
      toast.error('All fields are required', {
        onClose: () => setIsBlocking(false),
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/user/addExpense', {
        user_id,
        amount,
        category,
        date,
        description,
      });
    
      if (response.data.status === "success") {
        onExpenseUpdate(amount)
       dispatch(expenceAddedFlag(true))
        toast.success('Expense added successfully', {
          onClose: () => setIsBlocking(false),
        });
        resetForm();
        
      }
    } catch (error) {
      toast.error('Something went wrong', {
        onClose: () => setIsBlocking(false),
      });
    }
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <div>
      {isBlocking && <div className="overlay" />}
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Add Your Expense Here</h2>
      </div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="" disabled>Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Sports">Sports</option>
          <option value="Office">Office</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Add Expense</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="toast-center"
      />
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 999; // Above other elements
        }
        .toast-center {
          color: #333;
          font-size: 18px;
          text-align: center;
          margin: auto;
          min-width: 300px;
          border-radius: 8px;
          z-index: 1000;
        }
        form {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }
        form:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        input, select, textarea {
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          width: 100%;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #4CAF50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
          outline: none;
        }
        textarea {
          height: 80px;
          resize: none;
        }
        button {
          padding: 12px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        button:hover {
          background-color: #45a049;
        }
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '12px', fontSize: '16px', width: '100%' },
  textarea: { padding: '12px', fontSize: '16px', width: '100%' },
  button: { padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  header: {
    backgroundColor: 'pink',
    padding: '20px',
    borderRadius: '10px 10px 10px 10px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  headerText: {
    color: 'white',
    fontSize: '24px',
    margin: 0,
    fontWeight: 'bold',
  },
};

export default ExpenseForm;
