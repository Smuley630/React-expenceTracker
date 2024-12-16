import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const FoodItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/footItems'); 
                setItems(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const addToCart = (item) => {
        console.log('Adding to cart:', item);
    };
    if (loading) return <Loader />;

    return (
        <div style={styles.container}>
            <h2>Food Menu</h2>
             (
                <div style={styles.cardContainer}>
                    {items.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <img src={item.image} alt={item.item_name} style={styles.image} />
                            <h3 style={styles.itemName}>{item.item_name}</h3>
                            <p style={styles.price}>Price: ${item.price}</p>
                            <button onClick={() => addToCart(item)} style={styles.button}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    card: {
        width: '200px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    itemName: {
        fontSize: '18px',
        color: '#333',
    },
    price: {
        fontSize: '16px',
        color: '#666',
    },
    button: {
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default FoodItems;
