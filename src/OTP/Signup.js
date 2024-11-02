import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    const count = useSelector((state) => state.counter);
    console.log("......sss",count)
    console.log(count)


    useEffect(()=>{

    })
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            // const response = await axios.post('http://localhost:8000/send-otpsms', { email });
            const hasSpecificEmail = count.data.some(obj => obj.emailid == email);
if(hasSpecificEmail){
    alert("u already have an account")
    navigate(-1);
    // return
}

            const responsePost = await axios.post('http://localhost:8000/user/addUser', { name, email  });

            const response = await axios.post('http://localhost:8000/send-otp', { email });

            setIsOTPSent(true);
            setMessage(response.data.message);
           
        } catch (error) {
            // setMessage(error.response.data.message || 'Error sending OTP');
        }
        console.log('Name:', name);
        console.log('Email:', email);
        // setName('');
        // setEmail('');
    };

    const verifyOTP = async () => {
        console.log("..... email, otp", email, otp)
        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { email, otp });
            setMessage(response.data.message);
            setIsVerified(true)
        } catch (error) {
            setMessage(error.response.data.message || 'Error verifying OTP');
        }
    };
   
    {
        isVerified &&  navigate('./home')
         
         }
    return (
        <div style={styles.container}>
          {!isOTPSent ?  <div style={styles.card}>
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
                  <div style={{justifyContent:"space-evenly",display:"flex",alignItems:"center"}}>
                  <button type="submit" style={styles.button}>
                        Sign Up
                    </button>
                    <button onClick={() => navigate(-1)} style={styles.button}>
                        Go Back
                    </button>
                  </div>
                </form>
            </div> : 
            <div>
                <h2>Enter otp to login now </h2>
             {/* <form onSubmit={verifyOTP}> */}
             <div style={styles.inputGroup}>
                 <label htmlFor="name">enter otp </label>
                 <input
                     type="text"
                     id="otp"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     required
                     style={styles.input}
                 />
             </div>
           
             <button type="submit" style={styles.button} onClick={() => verifyOTP()}>
                 submit
             </button>
         {/* </form> */}
         </div>
            }
        </div> 
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '10px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        width: '25%',
        fontSize: '10px',
    },
};

export default Signup;
