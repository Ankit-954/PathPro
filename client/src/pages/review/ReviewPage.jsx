import React, { useState } from "react";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [name, setName] = useState(""); // State for user name
  const [comment, setComment] = useState(""); // State for user comment
  const [rating, setRating] = useState(1); // State for user rating

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (name && comment && rating) {
      const newReview = { name, comment, rating };

      try {
        const response = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
        const data = await response.json();

        if (response.ok) {
          // Update reviews state with new review
          setReviews((prevReviews) => [...prevReviews, data]);
        } else {
          console.error("Failed to submit review:", data);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }

      // Reset form fields after submission
      setName("");
      setComment("");
      setRating(1);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="review-page">
      <h1>Leave a Review</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your review or comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="reviews-list">
        <h2>What others say:</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <h3>{review.name}</h3>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
