import React, { useState } from 'react';

import "./index.css"; 

export const TutorAnalytics = () => {
  return (
    <div className='analytics-grid'>
      <div className='grid-item bio-container'>
        <div className='subtitle'>
            <h2>Bio</h2>
            <button>Edit</button>
        </div>
      </div>
      <div className='grid-item feedback-container'>
        <div className='subtitle'>
            <h2>Feedback</h2>
            <button>Edit</button>
        </div>
      </div>
      <div className='grid-item impact-container'>
        <div className='subtitle'>
            <h2>Impact Overview</h2>
        </div>
        <div className='impact-elements'>
              <div>
                <p>Total Hours:</p>
                <h2>52</h2>
              </div>
              <div>
                <p>Students Taught:</p>
                <h2>7</h2>
              </div>
              <div>
                <p>Hours This Term:</p>
                <h2>40</h2>
              </div>
              <div>
                <p>Hours This Month:</p>
                <h2>20</h2>
              </div>
              <div>
                <p>Classes Taught:</p>
                <h2>48</h2>
              </div>
            </div>
      </div>
      <div className='grid-item line-chart-container'>
        <div className='subtitle'>
            <h2>Lessons Taught</h2>
        </div>
      </div>
      <div className='grid-item pie-chart-container'>
        <div className='subtitle'>
            <h2>Hours Taught</h2>
            <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default TutorAnalytics;