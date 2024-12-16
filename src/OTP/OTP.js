import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataFetchingComponent from '../DataFetchingComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { getUserFromReducer, getUserName, setSelectedUser, setVerifiedUser } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../Authenticator/AuthProvider ';

const OTPVerification = () => {
    const { isverified,setIsverified } = useAuth();
    const [email, setEmail] = useState('');
    const [emailsArray, setEmailsArray] = useState('');

    const [otp, setOtp] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(" ");
  const notVerifiedUser = useSelector((state) => state.counter.varifiedUser);


    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(()=>{
       
        getUsers()
    },[isOTPSent])

    const getUsers = async () =>{
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/user/validate`);
        dispatch(setVerifiedUser(true))
       dispatch( getUserFromReducer(response.data.data))

      setEmailsArray(response.data.data)
       setLoading(false)
    }
    const sendOTP = async () => {
        setLoading(true)
       
        if(email === ""){
            alert("please eterv email")
            setLoading(false);
            return
        }


        const hasSpecificEmail = emailsArray.some(obj => obj.emailid === email);
        const foundObject = emailsArray.find(obj => obj.emailid === email);
        dispatch(setSelectedUser(foundObject))
        const name = foundObject && foundObject.name 
        setName(name)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('user_id', foundObject?.user_id);



        dispatch(getUserName(name))
         if(hasSpecificEmail){
            try {
                const response = await axios.post('http://localhost:8000/send-otp', { email });

                setMessage(response.data.message);
                setIsOTPSent(true);
                setLoading(false)
               
            } catch (error) {
                setMessage(error.response.data.message || 'Error sending OTP');
            }
            finally{
                setLoading(false);
            }
         }else{
             
            alert("you are new user please sign up")

                handleClick()
                setLoading(false);
         }
      
    };

    const verifyOTP = async () => {
      getUsers()
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { email, otp });
            
            setMessage(response.data.message);
            setIsverified(true);
            setLoading(false)
        } catch (error) {
            setMessage(error.response.data.message || 'Error verifying OTP');
        }
        finally{
            setLoading(false);
        }
    };
    const handleClick = () => {
        navigate('./signup')
    };
  
    let params={
        name:name,
        email:email
    }
    if(!notVerifiedUser)
{
    setIsverified(false)

}   
 useEffect(() => {
      
        if (isverified && notVerifiedUser) {
            
            navigate('./home', { state: params });
        }
    }, [isverified, navigate]);;

    if (loading) return <Loader />;
    return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.title}>Please Sign In</h2>
            {!isverified && (
              <>
                {!isOTPSent ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.input}
                    />
                    <button
                      onClick={sendOTP}
                      style={styles.button}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                      Send OTP
                    </button>
                    <h4 style={{marginTop:"15px"}}>
                      Don't have an account?<br/> <u style={styles.link} onClick={handleClick}>Sign up</u> now
                    </h4>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={styles.input}
                    />
                    <button
                      onClick={verifyOTP}
                      style={styles.button}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                {message && <p style={styles.message}>{message}</p>}
              </>
            )}
          </div>
        </div>
      );
};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop:"60px",
      padding: '20px',
    },
    card: {
      maxWidth: '400px',
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',marginBottom:"20px"
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',marginTop:"10px"
    },
    link: {
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    message: {
      marginTop: '15px',
      color: 'green',
    },
  };

export default OTPVerification;
