import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { type } from '@testing-library/user-event/dist/type';
import { expenceAddedFlag } from '../redux/action';


function UserCard({ expenses }) {
    const [userData, setUserData] = useState(null);
    const [savingAmount, setSavingAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [thisMonthExpenditure, setThisMonthExpenditure] = useState(0)
    const [expanceAdded, setExpance] = useState(null);
    const dispatch = useDispatch();

    const selectedUser = useSelector((state) => state.counter.selectedUser);
    const expenceaddedFlag = useSelector((state) => state.counter.expenceAddedFlag);
    const userName = useSelector((state) => state.counter.data);

    const storedUserId = localStorage.getItem('user_id');
    let userId

    if (selectedUser?.user_id) {
        userId = selectedUser?.user_id
    } else if (storedUserId) {
        userId = storedUserId
    }
    const currentMonthIndex = moment().month();
    const monthIndex = currentMonthIndex + 1

    useEffect(() => {
        fetchUserData();
    }, [expenceaddedFlag]);

    async function fetchUserData() {

        setLoading(true)
        dispatch(expenceAddedFlag(false))

        try {

            const response = await axios.get(`http://localhost:8000/user/getSaving/${userId}`);
            const responsethisMonthExpenditure = await axios.get(`http://localhost:8000/user/getExpenditure/${userId}/${monthIndex}`);
            setThisMonthExpenditure(responsethisMonthExpenditure.data.data[0].total_amount)
            const data = response.data;
            if (data && data?.data[0].name && data?.data[0].saving_amount !== undefined) {
                setUserData({ name: data?.data[0].name, savingAmount: data?.data[0].saving_amount });
            } else {
                setUserData(null);
            }
        } catch (error) {
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }

    function handleSavingAmountChange(event) {
        setSavingAmount(event.target.value);
    }

    async function saveAmount() {
        setLoading(true)


        const response = await axios.post('http://localhost:8000/user/addSaving', { userId, savingAmount });


        setLoading(false)
        if (response.status) {
            fetchUserData()
            alert("data added")
        }

    }



    async function updateAmount() {
        const updatedAmount = prompt("Enter the new saving amount:");
        setLoading(true)

        const response = await axios.put('http://localhost:8000/user/updateSaving', { updatedAmount, userId });

        setLoading(false)
        if (response.status) {
            fetchUserData()
            alert("data added")
        }

    }
    const totalExpenses = thisMonthExpenditure ? thisMonthExpenditure : 0
    const remainingAmount = userData?.savingAmount - (totalExpenses)


    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    return (

        <div style={{ marginBottom: "50px" }} className="card">
            {userData ? (
                <div className={`user-info ${saved ? 'highlight' : ''}`}>
                    <h2>{userData.name}</h2>
                    <p>Saving Amount: ${userData?.savingAmount}</p>
                    {saved && <span className="success-message">Saved!</span>}
                    <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                        <div>
                            <div style={{}}>this month expence ${totalExpenses} </div>
                            <div style={{ display: "flex" }}>Balance Left <p style={{ color: remainingAmount < 0 ? "red" : "black" }}> &nbsp; ${remainingAmount}</p> </div>
                        </div>
                        <button onClick={updateAmount} className="save-button">update Amount</button>
                    </div>
                </div>
            ) : (
                <div id="addSavingSection" className="add-saving-section">
                    <p>No data found. Add saving amount:</p>
                    <input
                        type="number"
                        value={savingAmount}
                        onChange={handleSavingAmountChange}
                        placeholder="Enter Saving Amount"
                        className="saving-input"
                    />
                    <button onClick={saveAmount} className="save-button">Save</button>
                </div>
            )}
            <style jsx>{`
                .card {
                    // width: 320px;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    font-family: Arial, sans-serif;
                    transition: box-shadow 0.3s ease;margintop:50px
                }

                .card:hover {
                    box-shadow: 3px 6px 15px rgba(0, 0, 0, 0.2);
                }

                .spinner {
                    margin: 50px auto;
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(0, 0, 0, 0.1);
                    border-top-color: #3498db;
                    border-radius: 50%;
                    animation: spin 1s infinite linear;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .saving-input {
                    padding: 8px;
                    width: 80%;
                    margin-top: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .saving-input:focus {
                    border-color: #3498db;
                    box-shadow: 0px 0px 5px rgba(52, 152, 219, 0.5);
                    outline: none;
                }

                .save-button {
                    padding: 10px 20px;
                    margin-top: 10px;
                    border: none;
                    border-radius: 6px;
                    background-color: #3498db;
                    color: white;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .save-button:hover {
                    background-color: #2980b9;
                }

                .save-button:active {
                    transform: scale(0.98);
                }

                .user-info.highlight {
                    animation: highlight-animation 0.5s ease;
                    position: relative;
                }

                @keyframes highlight-animation {
                    0% { background-color: rgba(46, 204, 113, 0.2); }
                    100% { background-color: transparent; }
                }

                .success-message {
                    color: #2ecc71;
                    font-size: 0.9em;
                    position: absolute;
                    bottom: -15px;
                    right: 10px;
                    animation: fadeInOut 2s ease forwards;
                }

                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; }
                    10%, 90% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default UserCard;
