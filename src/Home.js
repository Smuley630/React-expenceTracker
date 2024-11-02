// import { Link } from "react-router-dom";

// const Home = () => {
//     return (
//       <div>
//           <h2>Home Screen</h2>
//           <Link to="/about">Go to About</Link>
//           <br/>
//           <Link to="/home">OTP</Link>    
  
//            <br/>
//           <Link to="/details">details</Link>        
//       </div>
//   );
//   };


// export default Home;



import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getReview, setVerifiedUser } from './redux/action';
import axios from 'axios';
import EmployeeCard from './EmpoloyeeCard';
import ExpenseForm from './Expence/ExpenseForm';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const storedName = localStorage.getItem('name');
  const storedEmail = localStorage.getItem('email');

  const reviews = useSelector((state) => state.counter.review);
  const selectedUser = useSelector((state) => state.counter.selectedUser);



  useEffect(() => {
    const newEmail = storedEmail ||location.state?.email  // Optional chaining
    const newName = storedName || location.state?.name   || ""; // Default to empty string
    setName(newName);
    setEmail(newEmail);
    
  }, [location.state, storedName, storedEmail]);
  
  useEffect(() => {
    if (name && email) { // Check if both values are set
      fetchEmployeeDetails();
      sendWelcomeMail();
      fetchReviews();
      console.log(".......selele",selectedUser)
  }
}, [name, email]);
  const sendWelcomeMail= async () => {
    
   console.log("......ememem111",email)
   console.log("......emememname",name )
   console.log("....storedName",storedName)



  
      const response = await axios.post(`http://localhost:8000/send-welcomeMail`,  {name ,email} );
  


  }
  const fetchEmployeeDetails = async () => {
    console.log("lllllllllllllllllllllll")
    const responseEmployee = await axios.get(`http://localhost:8000/employees`);
    setEmployee(responseEmployee.data.data);  // use .data if the data is nested here
  };
  const fetchReviews = async () => {
// console.log("........alrteady aaded", location.state)

    try {
      const response = await axios.get(`http://localhost:8000/user/getReview`);
      console.log("rerresrs",response.data.data)
      // setReviews(response.data.data);
      dispatch(getReview(response.data.data))
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      // setLoading(false);
    }
  };
  const handleClick = () => {
    
const isAlreadyReviewPresent = reviews.some(review => review.name === name);
// console.log("........alrteady aaded", location.state.name)
   if(!isAlreadyReviewPresent) {navigate('./addReview')}
   else{
    alert(" sorry you already added a review ")
   }
};
const handleClickForReview = () => {
  navigate('./seeReview')
};
const handleLogout = () => {
  localStorage.clear();
  localStorage.setItem('isVerified', false);
  dispatch(setVerifiedUser(false))
  navigate('/');

 
};
console.log(".....namename",name)
  return (
    <div>
      {/* React-Bootstrap Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              {/* <Nav.Link href="/signup">SignUp</Nav.Link> */}
              <Nav.Link as={Link} to="/home/details">Features</Nav.Link>
              <Nav.Link as={Link} to="/about">Pricing</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Other home content */}
      <div className="container">
        <h1>Welcome to the Home Page {name}</h1>
        <p>This is the content of your home page.</p>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto',padding: '20px',}}>
      <ExpenseForm  />
    </div>
      <div style={{
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#b2f8fd',
    color: 'white',
    display: 'flex',          // Set display to flex
    justifyContent: 'space-evenly',  // Align items in the center horizontally
    gap: '20px'                // Add space between items (optional)
}}>
  <div style={{backgroundColor:"#2de7f5",width:"120px",height:"40px",alignContent:"center",borderRadius:"30px"}}><a style ={{color:"black"}}onClick={handleClick}>Add Review</a></div>
  <div style={{backgroundColor:"#2de7f5",width:"120px",height:"40px",alignContent:"center",borderRadius:"30px"}}><a style ={{color:"black"}} onClick={handleClickForReview}>See Review</a></div>
</div>


    </div>
  );
}

export default Home;
