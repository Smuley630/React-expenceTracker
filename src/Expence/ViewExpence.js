import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ViewExpense() {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const [record, setRecord] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordType, setRecordtype] = useState('');
  const [recordsFetched, setRecordsFetched] = useState(false);
  const selectedUser = useSelector((state) => state.counter.selectedUser);
  const storedUserId = localStorage.getItem('user_id');
  const [subRecordType, setSubRecordType] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false);
  const navigate = useNavigate();
  const userId = selectedUser?.user_id || storedUserId;

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const fetchRecordByDate = async () => {

    setIsBlocking(true)
    try {
      if (date === "") {
        toast.error('please select  the date', {
          onClose: () => setIsBlocking(false),
        })
        return
      }
      setRecord([]);
      setError('');
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/user/getExpenceByDate/${userId}/${date}`);
      if (response.data && response.data.data.length > 0) {
        setRecord(response.data.data);
        setRecordsFetched(true);
      } else {
        setRecordsFetched(false);
        setIsBlocking(false);
        setLoading(false);
        alert('No record found for this date');
      }
    } catch (err) {
      setError('Error fetching record');
      console.error(err);
      setRecordsFetched(false);
    } finally {
      setLoading(false);
    }
  };



  const fetchRecordCategory = async () => {
    setIsBlocking(true)
    try {
      setRecord([]);
      setError('');
      setLoading(true);
      if (category === "") {
        toast.error('please select category', {
          onClose: () => setIsBlocking(false),
        })
        return
      }

      const response = await axios.get(`http://localhost:8000/user/getExpenceByCategory/${userId}/${category}`);
      if (response.data.data && response.data.data.length > 0) {
        setRecord(response.data.data);
        setRecordsFetched(true);

      } else {
        setRecordsFetched(false)
        setSubRecordType(false)
        setRecordtype('')
        alert("No record found for this category ")
        navigate(-1);
        setLoading(false);
        return
      }
    } catch (err) {
      setError('Error fetching record');
      console.error(err);
      setRecordsFetched(false);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (isoString) => {
    const dateObj = new Date(isoString);
    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    return `${day + 1} ${month}`;
  };
  if (loading) return <Loader />;

  return (
    <div>
      {isBlocking && <div className="overlay" />}
      <div style={{ padding: '20px', margin: 'auto', justifyContent: "center", alignItems: "center" }}>
        {(!recordsFetched && !subRecordType) && <h2 style={{ margin: "auto" }}>

          <div style={styles.container}>
            <label style={styles.label} htmlFor="category">  Fetch Record <br /> </label>
            <select
              id="category"
              style={styles.dropdown}
              value={recordType}
              onChange={(e) => {
                setRecordtype(e.target.value);
                setSubRecordType(true);
              }}

              required
            >
              <option value="" disabled>Select Category</option>
              <option value="Date" >Date</option>
              <option value="Category">Category</option>


            </select>
          </div>
        </h2>}


        {(!recordsFetched && recordType == "Date") && (
          <div style={{ justifyContent: "center" }}>
            <label style={styles.label} htmlFor="category">Select Date:</label>

            <div style={styles.containerDate}>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                style={styles.inputDate}
              />


              <button onClick={fetchRecordByDate} style={styles.button}>
                Get Record
              </button>
            </div>
          </div>
        )}
        {(!recordsFetched && recordType == "Category") && (
          <>

            <div style={styles.containerDate}>
              <label style={styles.label} htmlFor="category">Select Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.dropdown}
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Office">Office</option>

              </select>

              <button onClick={fetchRecordCategory} style={styles.button}>
                Get Record
              </button>
            </div>
          </>
        )}


        {record.length > 0 ? (
          <div style={styles.container1}>
            {record.map((record, index) => (
              <div key={index} style={{ ...styles.card, ':hover': styles.cardHover }}>
                <div style={styles.decorativeBar}></div>
                <div style={styles.content}>
                  <p><strong>Date:</strong> {formatDate(record.expense_date)}</p>
                  <p><strong>Amount:</strong> ${record.amount}</p>
                  <p><strong>Category:</strong> {record.category}</p>
                  <p><strong>Description:</strong> {record.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          error && <p style={{ color: 'red' }}>{error}</p>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="toast-center" />
      <style jsx>{`
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    // background-color: rgba(0, 0, 0, 0.3);
                    z-index: 999; // Above other elements
                }
                     .toast-center {
                    color: #333;
                    font-size: 18px;
                    text-align: center;
                    margin: auto;
                    position: fixed;
                    // top: 100%;
                    //  background-color: #333333;
                    // transform: translate(-50%, -50%);
                    min-width: 300px;
                    border-radius: 8px;
                    z-index: 1000;
                }
            `}</style>
    </div>
  );
}

const styles = {

  containerDate: {
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    maxWidth: '100px',
    margin: '20px auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '300px'

  },
  inputDate: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    backgroundColor: '#fff',
    transition: 'border 0.3s ease, box-shadow 0.3s ease', maxWidth: '200px'
  },
  button: {
    padding: '10px 20px',
    width: '80%',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    maxWidth: '500px', margin: 'auto'
  },
  label: {
    fontWeight: 'bold', display: "flex",
    color: '#333', margin: "auto", justifyContent: "center",

    alignItems: "center"
  },
  dropdown: {
    appearance: 'none',
    backgroundColor: '#f1f1f1',
    color: '#333',
    fontSize: '16px',
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    width: '100%', marginTop: "10px"
  },
  dropdownHover: {
    borderColor: '#888',
  },
  dropdownFocus: {
    outline: 'none',
    borderColor: '#5c5c5c',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  container1: {
    display: 'flex',
    flexWrap: 'wrap',

    gap: '20px',
    padding: '20px',

    margin: "auto",
    maxWidth: '1000px',
    alignItems: "center"
  },
  card: {

    maxWidth: '100%',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    padding: '20px',
    background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
    border: 'none',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
  },


  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: '#333',
    fontFamily: "'Arial', sans-serif",
  },


  decorativeBar: {
    height: '6px',
    width: '100%',
    background: 'linear-gradient(to right, #2196f3, #4caf50)',
    borderRadius: '15px 15px 0 0',
    position: 'absolute',
    top: 0,
    left: 0,
  },


};


export default ViewExpense;
