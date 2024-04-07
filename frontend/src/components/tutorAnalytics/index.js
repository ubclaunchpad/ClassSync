import React, { useState } from 'react';
import { Chart } from "react-google-charts";

import "./index.css"; 

/* PIE CHART CONFIG */

export const PieData = [
  ["Course", "Hours Taught"],
  ["Python", 11],
  ["Java", 2],
  ["JS", 2],
  ["Scratch", 2],
];

export const PieOptions = {
  title: "",
  colors: ['#7A8CA6', '#ACB6C6', '#343434', '#103DA2'],
  legend: {
    position: 'right', // Set legend position to bottom
    alignment: 'center', // Optionally, center align the legend
  },
};

/* LINE CHART CONFIG */

export const LineData = [
  ["Month", "Hours Taught"],
  ["Jan", 9],
  ["Feb", 5],
  ["Mar", 20],
  ["Apr", 9],
  ["May", 7],
  ["Jun", 2],
  ["Jul", 8]
];

export const LineOptions = {
  title: "",
  legend: "none",
};

export const tutorBio = `
  Jasmine is a seasoned educator with a deep love for technology 
  and a knack for making coding fun and accessible for young minds. 
  Holding a Bachelor's degree in Computer Science and Education, 
  she brings a unique blend of technical expertise and pedagogical skills 
  to the learning environment. 
`;

export const sampleFeedback = `
Jasmine is not just a tutor but a mentor. Our child has learned to code,
  developed problem-solving skills, and benefited from her positive influence.
`;

export const TutorAnalytics = () => {
  // Define state to manage the bio content, allow editing
  const [bioContent, setBioContent] = useState(tutorBio);
  const [editMode, setEditMode] = useState(false);
  const [tempBioContent, setTempBioContent] = useState('');

  const handleEditClick = () => {
    setTempBioContent(bioContent);
    setEditMode(true); 
  };

  const handleInputChange = (event) => {
    setTempBioContent(event.target.value); 
  };

  const handleSaveClick = () => {
    setBioContent(tempBioContent); 
    setEditMode(false); 
  };

  const handleCancelClick = () => {
    setTempBioContent(bioContent); // Restore original bio content
    setEditMode(false); // Exit edit mode
  };

  // change calculation based on timeframe
  const totalHours = PieData.slice(1).reduce((sum, [, hours]) => sum + hours, 0);
  const [timeframe, setTimeframe] = useState('Week');
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <div className='analytics-grid'>
      <div className='grid-item bio-container'>
        <div className='subtitle'>
        <h2>Bio</h2>
            {!editMode && <button onClick={handleEditClick}>Edit</button>}
            {editMode && (
              <div>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            )}
        </div>
        {editMode ? (
          <textarea
            value={tempBioContent}
            onChange={handleInputChange}
          />
        ) : (
          <p>{bioContent}</p>
        )}
      </div>

      <div className='grid-item feedback-container'>
        <div className='subtitle'>
            <h2>Feedback</h2>
            <select>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
            </select>
        </div>
        <div className='scroll-feedback'>
          <div className='feedback-content'>
            <h4>Alex (parent)</h4>
            <p>{sampleFeedback}</p>
          </div>
          <div className='feedback-content'>
            <h4>Alex (parent)</h4>
            <p>{sampleFeedback}</p>
          </div>
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
        <div className='line-content'>
          <Chart
            chartType="LineChart"
            data={LineData}
            options={LineOptions}
            width={"100%"}
            height={"60vh"}
          />
        </div>
      </div>

      <div className='grid-item pie-chart-container'>
        <div className='subtitle'>
            <h2>Hours Taught</h2>
            <select value={timeframe} onChange={handleTimeframeChange}>
              <option value="Year">Year</option>
              <option value="Month">Month</option>
              <option value="Week">Week</option>
            </select>
        </div>
        <div className='pie-content'>
          <Chart
            chartType="PieChart"
            data={PieData}
            options={PieOptions}
            width={"100%"}
            height={"45vh"}
          />
          <div className='text-content'>
          <p>Total Hours Taught this {timeframe}:</p>
            <h2>{totalHours}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorAnalytics;