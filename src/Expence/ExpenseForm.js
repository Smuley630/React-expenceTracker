// ExpenseForm.js
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({  }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [Msg, setMsg] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);

  const selectedUser = useSelector((state) => state.counter.selectedUser);
  const storeduser_id = localStorage.getItem('user_id');

const  user_id = selectedUser.user_id || storeduser_id
console.log("....useruser_id",user_id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBlocking(true)
    if (user_id.length === 0) {
      toast.error('something went wrong', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      })
    } else if (amount.length === 0) {
      toast.error('please enter amount', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      })
    } else if (category.length === 0) {
      toast.error('please enter category', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      })
    } else if (date.length === 0) {
      toast.error('please enter date', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      })
    } else if (description.length === 0) {
      toast.error('please enter description', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      })
    } else {

    try{ 
      
      const response = await axios.post('http://localhost:8000/user/addExpense', { user_id, amount,category,date,description  });
    console.log("...res",response)
    if (response.data.status === "success") {
      toast.success('Expense added successfully', {
          onClose: () => setIsBlocking(false),  // Unblock when toast disappears
      });
  }}
  catch{
    // console.log(".......wsassa",response)
    toast.error('something went wrong', {
      onClose: () => setIsBlocking(false),  // Unblock when toast disappears
  });
  }
finally{
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');}
  };
}

  return (
    <div>
           {isBlocking && <div className="overlay" />}
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
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
        toastClassName="toast-center"/> 
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
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    // transform: translate(-50%, -50%);
                    min-width: 300px;
                    border-radius: 8px;
                    z-index: 1000;
                }
            `}</style>
      </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '8px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' },
};

export default ExpenseForm;
