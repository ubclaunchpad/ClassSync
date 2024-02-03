import React, { useState } from 'react';
import './index.css'
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassRecordForm = () => {
  const [learningGoals, setLearningGoals] = useState([]);

  const handleCheckboxChange = (goal) => {
    // Toggle the checked state of the clicked learning goal
    setLearningGoals((prevGoals) => {
      if (prevGoals.includes(goal)) {
        return prevGoals.filter((g) => g !== goal);
      } else {
        return [...prevGoals, goal];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use form data, including learning goals, for submission or further processing
    console.log({
      learningGoals,
    });

    // Add your logic for submitting the form data (e.g., API call or state update)
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileIcons = {
    pdf: '📄',
    doc: '📃',
    image: '🖼️',
    video: '📹',
    default: '📎',
  };

  const fileList = [
    { name: 'Document1.pdf', type: 'pdf' },
    { name: 'Image.jpg', type: 'image' },
    { name: 'Video.mp4', type: 'video' },
    { name: 'Document2.doc', type: 'doc' },
    { name: 'File.txt', type: 'default' },
  ];

  const handleFileSelect = (fileName) => {
    setSelectedFiles((prevFiles) => {
      if (prevFiles.includes(fileName)) {
        return prevFiles.filter((file) => file !== fileName);
      } else {
        return [...prevFiles, fileName];
      }
    });
  };
  

  return (
    <TutorDashboardLayout
    rightColumnContent={
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#f0f8ff',
            color: '#003a8c',
            fontFamily: 'Arial, sans-serif',
            margin: '20px',
            overflow: 'hidden',
            borderRadius: '10px',
            position: 'relative',
            zIndex: '1',
          }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '1em' }}>File List</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
             <button style={{border:'none', backgroundColor: 'transparent'}}>
                {/* <button onClick={handleFileSelect} style={{ width: '30px', height: '30px', backgroundColor: '#86d3ff', marginRight: '5px', borderRadius: '3px', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                    <input type="checkbox" />
                    <i className="fas fa-check-square"></i>
                </button>
                <button style={{border:'none', backgroundColor: 'transparent'}}>

                {/* <button onClick={handleFileSelect} style={{ width: '30px', height: '30px', backgroundColor: '#86d3ff', marginRight: '5px', borderRadius: '3px', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z" fill='#103da2'/></svg>
                </button>
                <button style={{border:'none', backgroundColor: 'transparent'}}>

                {/* <button onClick={handleFileSelect} style={{ width: '30px', height: '30px', backgroundColor: '#86d3ff', marginRight: '5px', borderRadius: '3px', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/></g></svg>
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {fileList.map((file) => (
                <li key={file.name} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.name)}
                    onChange={() => handleFileSelect(file.name)}
                    style={{ marginRight: '8px' }}
                  />
                  <span>{fileIcons[file.type] || fileIcons.default}</span>
                  <span style={{ marginLeft: '8px' }}>{file.name}</span>
                </li>
              ))}
            </ul>
          </div>

    }
    
    >
        <div style={{ display: 'flex' }}>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px'}}>
      {/* Top Left - Class Record Card */}
    <div style={{
      border: '1px solid #1e3a8c',
      borderRadius: '8px',
      padding: '15px',
      width: '350px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      background: '#b3d8ff',
      color: '#003a8c',
      fontFamily: 'Arial, sans-serif',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      margin: '10px',
      overflow: 'hidden',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <div style={{ width: '65%' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5em', color: '#1e3a8c' }}>Beginner Python #1</h2>

        <div style={{ marginBottom: '10px' }}>
          <strong>Student:</strong> John Doe
        </div>
      
        <div style={{ marginBottom: '10px' }}>
          <strong>Duration:</strong> 1 hour
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Date:</strong> 2024-02-01
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Time:</strong> 10:00 AM
        </div>
        </div>

        <div style={{ width: '35%', textAlign: 'right' }}>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
        
          <a href="http://example.com/course">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"/></g></svg>    </a>

          <a href="http://example.com/meeting" style={{ marginRight: '10px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>    </a>

        </div>
      </div>
    </div>

      {/* Below - Green Div */}
      <div style={{
        padding: '5px',
        width: '90%',
        margin: '5px',
      }}>
 <label>Learning Goals:</label>
  <div >
      {/* Map through learning goals and render circular checkboxes */}
      {['Goal 1', 'Goal 2', 'Goal 3', 'Goal 2', 'Goal 3', 'Goal 2', 'Goal 3', 'Goal 2', 'Goal 3', 'Goal 2', 'Goal 3'].map((goal) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <div class="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
              </div>
              <label>{goal}</label>
          </div>
      ))}
  </div>      </div>
</div>
      {/* To the right - Red Div */}
      <div style={{
        backgroundColor: 'pink',
        flex: '3',
        // minWidth: '200px',
        width: '90%',
        height: '100vh', // Adjust the height as needed
        margin: '20px',
      }}>
 {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
       */}
       </div>
 
    </div>

    </TutorDashboardLayout>
  );
};

export default ClassRecordForm;

// <div>
// <h2>Class Record</h2>
// <div style={{ display: 'flex', justifyContent: 'space-between' }}>

// <div style={{
// border: '1px solid #ccc',
// borderRadius: '8px',
// padding: '20px',
// width: '250px',
// boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
// background: 'linear-gradient(to right, #e6f7ff, #b3d8ff)',
// color: '#003a8c',
// fontFamily: 'Arial, sans-serif',
// transition: 'all 0.3s ease',
// cursor: 'pointer',
// margin: '20px',
// overflow: 'hidden',
// borderRadius: '10px',
// position: 'relative',
// zIndex: '1',
// }}>

// <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// {/* Top Left - Class Record Card */}
// <div style={{
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   padding: '20px',
//   width: '250px',
//   boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
//   background: 'linear-gradient(to right, #e6f7ff, #b3d8ff)',
//   color: '#003a8c',
//   fontFamily: 'Arial, sans-serif',
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   margin: '20px',
//   overflow: 'hidden',
//   borderRadius: '10px',
//   position: 'relative',
//   zIndex: '1',
// }}>
//   <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2em' }}>Class Record</h2>

//   <div style={{ marginBottom: '15px' }}>
//     <strong>Student Name:</strong> John Doe
//   </div>
//   <div style={{ marginBottom: '15px' }}>
//     <strong>Class Title:</strong> Math 101
//   </div>
//   <div style={{ marginBottom: '15px' }}>
//     <strong>Duration (in hours):</strong> 2
//   </div>
//   <div style={{ marginBottom: '15px' }}>
//     <strong>Date:</strong> 2024-02-01
//   </div>
//   <div style={{ marginBottom: '15px' }}>
//     <strong>Time:</strong> 10:00 AM
//   </div>
// </div>

// {/* Below - Green Div */}
// <div style={{
//   backgroundColor: 'green',
//   height: '100px',
//   width: '250px',
//   margin: '20px',
// }}>
//   {/* Content for the green div */}
// </div>

// {/* To the right - Red Div */}
// <div style={{
//   backgroundColor: 'red',
//   flex: '1',
//   height: '100vh', // Adjust the height as needed
//   margin: '20px',
// }}>
//   {/* Content for the red div */}
// </div>
// </div>
// <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2em' }}>Class #4</h2>
// <div style={{ marginBottom: '15px' }}>
//   <strong>Course:</strong> Beginner Python
// </div>
// <div style={{ marginBottom: '15px' }}>
//   <strong>Student:</strong> John Doe
// </div>

// <div style={{ marginBottom: '15px' }}>
//   <strong>Duration:</strong> 1 hour
// </div>
// <div style={{ marginBottom: '15px' }}>
//   <strong>Date:</strong> 2024-02-01
// </div>
// <div style={{ marginBottom: '15px' }}>
//   <strong>Time:</strong> 10:00 AM
// </div>
// </div>
// <form onSubmit={handleSubmit}>
//   <label>Learning Goals:</label>
//   <div >
//       {/* Map through learning goals and render circular checkboxes */}
//       {['Goal 1', 'Goal 2', 'Goal 3'].map((goal) => (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//               <div class="round">
//                   <input type="checkbox" id="checkbox" />
//                   <label for="checkbox"></label>
//               </div>
//               <label>{goal}</label>
//           </div>
//       ))}
//   </div>

//   <input type="submit" value="Submit" />
// </form>
// <div>
// {/* Accordion */}
// <details>
// <summary>Section 1</summary>
// <p>Content for section 1</p>
// </details>
// <details>
// <summary>Section 2</summary>
// <p>Content for section 2</p>
// </details>
// <details>
// <summary>Section 3</summary>
// <p>Content for section 3</p>
// </details>
// </div>
// </div>
// </div>