// LearningGoals.js
import React from 'react';

const LearningGoals = ({ learningGoals, handleLearningGoalsChange }) => (
    <div style={{ flex: 1, marginRight: '10px' }}>
        <h4> Learning Goals </h4>
        <textarea
            value={learningGoals}
            onChange={handleLearningGoalsChange}
            onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 350) + 'px';
            }}
            placeholder="Enter learning goals (separate by newline)"
            style={{
                width: '90%',
                minHeight: '100px',
                maxHeight: '350px',
                padding: '10px',
                fontSize: '16px',
                border: 'none',
                boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)',
                outline: 'none',
                resize: 'vertical',
                overflowY: 'auto',
            }}
        />
    </div>
);

export default LearningGoals;