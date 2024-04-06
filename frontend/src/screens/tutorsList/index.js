import './index.css';
import { MainContentLayout } from '../../components/MainContentLayout';
import React, { useState, useEffect } from 'react';
import { Chip, alpha } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Checkbox, TextField, Button } from '@mui/material';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { set } from 'date-fns';

const TutorsList = () => {
    const [endDate, setEndDate] = useState(Date.now())
    const [tutors, setTutors] = useState(null);
    const [users, setUsers] = useState(null);
    const [courses, setCourses] = useState({});
    const [offerings, setOfferings] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null); // State to manage expanded row
    const [selectedTutors, setSelectedTutors] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const url = "localhost:3000/registertutor/"

    const fetchData = async () => {
        try {
            // Getting all tutors
            let urlTutors = "http://localhost:8080/tutors"
            const teacherListResponse = await fetch(urlTutors);
            const teacherListData = await teacherListResponse.json();
            console.log(teacherListData)
            setTutors(teacherListData);

           
            // Getting all tutor offerings
            let urlTutorOfferings = "http://localhost:8080/tutor_offerings"
            const offeringsListResponse = await fetch(urlTutorOfferings);
            const offeringsListData = await offeringsListResponse.json();
            setOfferings(offeringsListData);

              // Getting all courses
              let urlCourses = "http://localhost:8080/courses"
              const coursesListResponse = await fetch(urlCourses);
              const coursesListData = await coursesListResponse.json();
              console.log(coursesListData)
              setCourses(coursesListData);

       


        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const findCourses = (tutor_id) => {
 let tutorOfferings = offerings?.filter(offering => offering.tutor_id === tutor_id);
       let tutorCourseIds = tutorOfferings?.map(offering => offering.course_id);
       
       return tutorCourseIds 
    }

    const handleSelectTutor = (id) => {
        if (selectedTutors.includes(id)) {
            setSelectedTutors(selectedTutors.filter(tutor_id => tutor_id !== id));
            setSelectAll(false)
        } else {
            setSelectedTutors([...selectedTutors, id]);
        }
    }

    const getCourseNames = (tutor_id) => {
            let tutorOfferings = offerings?.filter(offering => offering.tutor_id === tutor_id);
                  let tutorCourseIds = tutorOfferings?.map(offering => offering.course_id);
                  console.log("Courses are ", tutorOfferings)
let courseNames = new Set();
tutorCourseIds.forEach(id => {
    let course = courses[id];
    if (course) {
        courseNames.add(course.course_name.trim());
    }
});
console.log("Names ", courseNames)  
           return Array.from(courseNames)
    }

    const handleSelectAll = () => {
setSelectedTutors(selectAll ? [] : tutors.map(tutor => tutor.tutor_id));
setSelectAll(!selectAll)

    }
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(tutors);
  
    useEffect(() => {

        if (tutors) {
        if (searchTerm !== '') {
            const results = tutors.filter(tutor =>
                tutor.tutor_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
      setSearchResults(results);
      console.log("Tutors are ", results)
    } else {
        setSearchResults(tutors);
    }
}
    }, [searchTerm, tutors]);
  
    const handleChange = event => {
      setSearchTerm(event.target.value);
    };
// const findUniqueCourses = (tutor_id) => {
//     let tutorOfferings = offerings?.filter(offering => offering.tutor_id === tutor_id);
//     let courseList = tutorOfferings?.map(offering => courses?.find(course => course.course_id === offering.course_id)?.course_name);
    
//     let uniqueCourseList = [...new Set(courseList)];
//     console.log(uniqueCourseList)
    
//     return uniqueCourseList;
// }
    const copyToken = async () => {
        try {
            const response = await fetch('http://localhost:8080/token');
            const data = await response.json();

            // Now you have the token in `data`, you can copy it to clipboard
            navigator.clipboard.writeText(url+data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggleExpandRow = (rowId) => {
        if (expandedRow === rowId) {
            setExpandedRow(null); // Collapse if already expanded
        } else {
            setExpandedRow(rowId); // Expand the clicked row
        }
    };

const renewTutors = async () => {
    const url = "http://localhost:8080/renew";
    const data = {
        selectedTutors: selectedTutors,
        endDate: new Date(endDate)
    };

    console.log(data.endDate)
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // const result = await response.json();
        await fetchData();
    } catch (error) {
        console.error('Error:', error);
    }
}

    return (
        <MainContentLayout
            smallText="Admin Dashboard"
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <h3>List of all Tutors</h3>
                    <p>This dashboard allows administrators to manage Tutors. View and edit Tutors by clicking on View More.</p>
                    <button 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007BFF', // Change this to match your theme color
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={copyToken}
                    >
                        Tutor Invite Link (Single-Use)
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            width="16"
                            style={{ marginLeft: '10px' }}
                        >
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path fill='white' d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                    </button>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <a 
        href="/allTutors" 
        style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007BFF', // Change this to match your theme color
            color: 'white',
            textDecoration: 'none',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
        }}
    >
        View Tutor Profiles
    </a>  
</div>              </div>
            }>
                   <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="date-picker-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', maxHeight: '75px', marginTop: '10px', marginBottom: '10px' }}>
                    <div style={{ marginBottom: '0px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                // backgroundColor: '#E1F5FE', // lighter blue
                                color: '#103da2', // dark blue
                                // borderRadius: '20px', 
                                padding: '5px 10px 0px 10px', 
                                fontSize: '14px',
                                fontWeight: 'bold'
                        }}>
                            <Checkbox 
                                checked={selectAll} 
                                onChange={handleSelectAll} 
                                style={{ marginRight: '2px' }} 
                            />
                            Select Tutors
                            {/* 5 Tutors Selected */}
                        </div>
                        <TextField 
                            type="text" 
                            placeholder="Search..." 
                            variant="outlined" 
                            size="small" 
                            value={searchTerm}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
                        <DatePicker 
                            label="End Date"
                            value={endDate} 
                            onChange={setEndDate} 
                            slotProps={{textField: {size:'small'}}}
                            // renderInput={(params) => <TextField {...params} variant="outlined" size="small" style={{ width: '200px', height: '1.4375em' }} />} // Set width
                        />
                    </div>
                    <div style={{  display: 'flex', alignItems: 'center' }}>
                        <button 
                            style={{
                                padding: '10px 10px',
                                margin: '5px',
                                backgroundColor: '#103da2', // Change this to match your theme color
                                color: 'white',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={renewTutors}
                        >
                            Renew Tutors
                        </button>
                    </div>
                </div>
            </LocalizationProvider>
         
            {/* <div style={{ marginTop: '20px' }}> */}

            <table key={tutors + courses} style={{ width: '90%', borderCollapse: 'collapse', marginLeft: '30px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#103da2', color: '#fff' }}>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}></th> {/* Checkbox */}
                        <th style={{ padding: '10px', textAlign: 'center', }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}>Name</th>
<th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', width: '125px' }}>Start Date</th> {/* Start Date */}
<th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', width: '125px' }}>End Date</th> {/* End Date */}                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}>Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {tutors && searchResults && searchResults.map((tutor, index) => (
                        <React.Fragment key={index}>
                            <tr >
                                <td className="registration__table-row-element">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }} >
                                       {expandedRow === index ? (
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowUpIcon" onClick={() => toggleExpandRow(index)}>
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
    </svg>
) : (
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowDownIcon" onClick={() => toggleExpandRow(index)}>
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
    </svg>
)}
 <Checkbox 
                                checked={selectedTutors.includes(tutor.tutor_id)} 
                                onChange={() => handleSelectTutor(tutor.tutor_id)} 
                                style={{ marginRight: '2px' }} 
                            />                                    </div>
                                </td>
                                <td className="registration__table-row-element">{tutor.tutor_id}</td>
                                <td className="registration__table-row-element">{tutor.tutor_name}</td>
<td className="registration__table-row-element">
{new Date(tutor.startdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
</td>                                

<td className="registration__table-row-element">
{new Date(tutor.enddate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
</td>
                             <td className="registration__table-row-element">
{offerings && getCourseNames(tutor.tutor_id)?.join(', ')}
</td>
                            </tr>
                            {expandedRow === index && (
                                <tr>
                                      <td colSpan="7">
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', paddingLeft: '10px', paddingRight: '10px' }} className="registration__row-expand-content">                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom:'20px' }}>
                            <div >                                
                            <strong>Major</strong> <br></br>
                               {tutor.major}
                            </div>
                            <div>                                <strong>University</strong> <br></br>
                                {tutor.university}
                            </div>
                            <div >                                <strong>Languages</strong> <br></br>
                                {tutor.languages}
                            </div>
                            </div>
                          
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ marginBottom: '20px' }}>                                <strong>Teleport Link</strong> <br></br>
                                <a href='https://teleport.org'>{tutor.link}</a>
                            </div> 
                            <div style={{ marginBottom: '20px' }}>                                <strong>Email</strong> <br></br>
                                <a href='mailto:john.doe@example.com'>{tutor.email}</a>
                            </div> 
                            <div style={{ marginBottom: '20px' }}>                            <strong>Dashboard</strong> <br></br>

                                <a href='https://teleport.org'>View analytics</a>
                            </div> 
                            <div style={{ marginBottom: '20px' }}>                                <strong>Max Hours</strong> <br></br>
                               {tutor.max_hours}
                            </div> 
                            <div >
                                
                                <strong>Courses</strong>
                                {findCourses(tutor.tutor_id)?.map((id) => (
                                    <Chip 
                                        label={`${courses[id].course_name}, ${courses[id].course_difficulty}`} 
                                        color='default' 
                                        style={{backgroundColor:alpha(courses[id].color, 0.5), margin: '5px'}} 
                                        variant='outlined' />
                                ))}
                                <Chip 
                                    label="Add Course"
                                    color='default'
                                    style={{margin: '5px'}}
                                    onClick={() => console.log('Add course')}
                                    clickable
                                />
                            </div>
                        </div>
                    </div>


                  
                </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {/* </div> */}
        </MainContentLayout>
    );
}
export default TutorsList;
