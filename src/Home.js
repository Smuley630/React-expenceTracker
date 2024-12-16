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
import { getReview, getUserName, setVerifiedUser } from './redux/action';
import axios from 'axios';
import EmployeeCard from './EmpoloyeeCard';
import ExpenseForm from './Expence/ExpenseForm';
import SavingAccountCard from './Expence/SavingAccountCard';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const storedName = localStorage.getItem('name');
  const storedEmail = localStorage.getItem('email');
  const setNewUser = localStorage.getItem('setNewUser');
  const [expenses, setExpenses] = useState([]);

  const reviews = useSelector((state) => state.counter.review);
  const selectedUser = useSelector((state) => state.counter.selectedUser);

  useEffect(() => {
    if (location.state?.name != ' ') {
      dispatch(getUserName(location.state?.name))

      setName(location.state?.name);
      setEmail(location.state?.name);
    } else if (storedName) {
      dispatch(getUserName(storedName))
      setName(storedName);
      setEmail(storedEmail)
    }
    dispatch(getUserName(name))


  }, [location.state, storedName, storedEmail]);

  useEffect(() => {
    if (name && email) {
      if (!setNewUser) {
      }
      fetchReviews();

    }
  }, [name, email]);

  const handleExpenseUpdate = (newExpense) => {
    setExpenses(newExpense);
  };

  const fetchEmployeeDetails = async () => {

    const responseEmployee = await axios.get(`http://localhost:8000/employees`);
    setEmployee(responseEmployee.data.data);
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getReview`);
      dispatch(getReview(response.data.data))
    } catch (error) {

    } finally {

    }
  };
  const handleClick = () => {

    const isAlreadyReviewPresent = reviews.some(review => review.name === name);

    if (!isAlreadyReviewPresent) {
      navigate('./addReview', { state: name });
    }
    else {
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
              <Nav.Link as={Link} to="/home/expence">View Expence</Nav.Link>
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

      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', paddingBottom: 150 }}>
        <SavingAccountCard expenses={expenses} />
        <ExpenseForm onExpenseUpdate={handleExpenseUpdate} />
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
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: '20px'
      }}>
        <div style={{ backgroundColor: "#2de7f5", width: "120px", height: "40px", alignContent: "center", borderRadius: "30px" }}><a style={{ color: "black" }} onClick={handleClick}>Add Review</a></div>
        <div style={{ backgroundColor: "#2de7f5", width: "120px", height: "40px", alignContent: "center", borderRadius: "30px" }}><a style={{ color: "black" }} onClick={handleClickForReview}>See Review</a></div>
      </div>


    </div>
  );
}

export default Home;
