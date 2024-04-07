import React, { useState } from 'react';
import { Chart } from "react-google-charts";

import "./index.css"; 

/* PIE CHART CONFIG */

export const PieData = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
];

export const PieOptions = {
  title: "none",
  colors: ['#7A8CA6', '#ACB6C6', '#343434', '#103DA2']
};

/* LINE CHART CONFIG */

export const LineData = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const LineOptions = {
  title: "My Daily Activities",
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
  return (
    <div className='analytics-grid'>
      <div className='grid-item bio-container'>
        <div className='subtitle'>
            <h2>Bio</h2>
            <button>Edit</button>
        </div>
        <p>{tutorBio}</p>
      </div>
      <div className='grid-item feedback-container'>
        <div className='subtitle'>
            <h2>Feedback</h2>
            <button>Edit</button>
        </div>
        <div className='text-content'>
          <h4>Alex parennt</h4>
          <p>{sampleFeedback}</p>
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
            <button>Edit</button>
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
            <p>lorem ipsem</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorAnalytics;