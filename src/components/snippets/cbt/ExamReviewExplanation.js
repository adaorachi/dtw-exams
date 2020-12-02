import React from 'react';

export default function ExamReviewExplanation() {
  return (
    <div className="post-explanation">
      <div className="card border-card my-4">
        <div className="p-3">
          <h5>Explanation:</h5>
          <p>No explanation provided!</p>
        </div>
      </div>
      <div className="post-button">
        <a href="/" className="form-button mr-3">Post an Explanation</a>
        <a href="/" className="form-button">Suggestion Correction</a>
      </div>
    </div>
  );
}
