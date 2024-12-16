import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from '../redux/action';

const ReviewList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.counter.review);

  return (
    <div style={styles.container}>
  <h2 style={styles.title}>User Reviews</h2>
  {reviews.length > 0 ? (
    <div style={styles.reviewContainer}>
      {reviews.map((review, index) => (
        <div 
          key={index} 
          style={styles.reviewCard} 
         
        >
          <h3 style={styles.name}>{review.name}</h3>
          <p style={styles.review}>{review.review}</p>
        </div>
      ))}
    </div>
  ) : (
    <p style={styles.noReviews}>No reviews available.</p>
  )}
</div>

  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9', 
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
    maxWidth: '600px',
    margin: '20px auto', 
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333', 
    fontFamily: "'Poppins', sans-serif",
  },
  reviewContainer: {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '20px',
  },
  reviewCard: {
    backgroundColor: '#ffffff', 
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
    padding: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s', 
    cursor: 'pointer',
    border: '1px solid #e0e0e0', 
  },
  reviewCardHover: {
    transform: 'scale(1.05)', 
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', 
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#4caf50',
  },
  review: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555', 
    fontFamily: "'Roboto', sans-serif",
  },
  noReviews: {
    textAlign: 'center',
    color: '#999', 
    fontSize: '16px',
    fontStyle: 'italic',
  },
};

export default ReviewList;
