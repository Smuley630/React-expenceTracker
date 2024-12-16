import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromReducer, setSelectedUser } from '../redux/action';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setuserId] = useState('');

  const [otp, setOtp] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hasSpecificEmail = count.data.some(obj => obj.emailid == email);
      if (hasSpecificEmail) {
        alert("u already have an account")
        navigate(-1);
      }
      const responsePost = await axios.post('http://localhost:8000/user/addUser', { name, email });
      const response = await axios.post('http://localhost:8000/send-otp', { email });

      setIsOTPSent(true);
      setMessage(response.data.message);

    } catch (error) {
    }
 
  };

  const verifyOTP = async () => {
    const responseget = await axios.get(`http://localhost:8000/user/validate`);
    console.log("resssgetUserFromReducer", responseget.data.data)
    dispatch(getUserFromReducer(responseget.data.data))

    const foundObject = responseget.data.data.find(obj => obj.emailid === email);
    dispatch(setSelectedUser(foundObject))
    try {
      const response = await axios.post('http://localhost:8000/verify-otp', { email, otp });
      setMessage(response.data.message);
      setIsVerified(true)
    } catch (error) {
      setMessage(error.response.data.message || 'Error verifying OTP');
    }
  };
  let params = {
    name: name,
    email: email
  }

  useEffect(() => {
    if (isVerified) {

      navigate('./home', { state: params });
    }
  }, [isVerified, navigate]);;

  return (
    <div style={styles.container}>
      {!isOTPSent ? (
        <div style={styles.card}>
          <h2 style={styles.title}>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="submit" style={styles.button}>
                Sign Up
              </button>
              <button onClick={() => navigate(-1)} style={styles.button}>
                Go Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.title}>Enter OTP to Login</h2>
          <div style={styles.inputGroup}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onClick={() => verifyOTP()}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    marginTop: "60px",
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginTop: '5px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '48%',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
export default Signup;
