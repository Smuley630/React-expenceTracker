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


    console.log("......isdodioddi",isverified)
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
    },[])

    const getUsers = async () =>{
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/user/validate`);
        console.log("resss",response.data.data)
        dispatch(setVerifiedUser(true))
       dispatch( getUserFromReducer(response.data.data))
console.log("......email",email)

// const selectedObject = emailsArray.find(obj => obj.emailid === email);

      setEmailsArray(response.data.data)
       setLoading(false)


    }
    // Function to send OTP
    const sendOTP = async () => {
        setLoading(true)
        console.log("....email",email)
        console.log(emailsArray)
        
       
        if(email === ""){
            alert("please eterv email")
            setLoading(false);
            return
        }


        const hasSpecificEmail = emailsArray.some(obj => obj.emailid === email);
        console.log("......hasSpecificEmail",hasSpecificEmail)
        const foundObject = emailsArray.find(obj => obj.emailid === email);
        console.log("..........foundObject",foundObject)
        dispatch(setSelectedUser(foundObject))
        const name = foundObject && foundObject.name 
        setName(name)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('user_id', foundObject.user_id);



        dispatch(getUserName(name))
        console.log("........name",name)
         if(hasSpecificEmail){
            try {
                // const response = await axios.post('http://localhost:8000/send-otpsms', { email });
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
                // setIsOTPSent(true);
                // setMessage(" please sign up ");
            alert("you are new user please sign up")

                handleClick()
                setLoading(false);
         }
      
    };

    // Function to verify OTP
    const verifyOTP = async () => {
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { email, otp });
            console.log("......response",response)
            
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
    console.log(".....isisi",notVerifiedUser)
  
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

    console.log("....isverified",isverified)
    if (loading) return <Loader />;
    return (
        <div>{
           <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Please sign in to  </h2>

            {(!isverified )   && (
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
                            <br />
                            <button
                                onClick={sendOTP}
                                style={styles.button}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                            >
                                Send OTP
                            </button>
                            <h4>Don't have an account? <u onClick={handleClick}>Sign up</u> now</h4>
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
                            <br />
                            <button
                                style={styles.button}
                                onClick={verifyOTP}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

            {message && <p>{message}</p>}
            </>
            )}
        </div> }
        
        </div>
    );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    input: {
      width: '300px',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '220px',
      padding: '12px',
      borderRadius: '125px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
  };

export default OTPVerification;
