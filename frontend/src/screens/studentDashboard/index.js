import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import Modal from 'react-modal';
import "primeicons/primeicons.css";
import Course from '../../components/StudentDashboard'; // import the Course component


import { fakeData } from "../../components/StudentLessonTab/fakeData";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/lara-light-blue/theme.css";

import { StudentLessonTab } from "../../components/StudentLessonTab";

const StudentDashboard = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [title, setTitle] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/student/${id}/courses`
        );
        const data = await response.json();
        setCourses(data);
        console.log(data);
        if (data.length > 0) {
          setSelectedEnrollmentId(data[0].enrollment_id);
          setTitle(data[0].course_title);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/student/${id}/courses`);
                    const data = await response.json();
                    setCourses(data);
                    console.log(data);
                    if (data.length > 0) {
                        setSelectedEnrollmentId(data[0].enrollment_id);
                        setTitle(data[0].course_title);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
    
            fetchData();
        }, [id]);
    
        const handleTabClick = (enrollmentId, title) => {
            setSelectedEnrollmentId(enrollmentId);
            setTitle(title)
        };

  return (
    <div className="student-dashboard__page">
      <div className="student-dashboard__student-information">
        <div className="student-information__profile">
          <button
            className="student-profile__back-button"
            onClick={(e) => {
              console.log("Clicked the back button");
            }}
          >
            <i
              className="pi pi-arrow-left student-profile__icon"
              style={{ fontSize: "1.5em" }}
            ></i>
          </button>

          <div className="student-information__profile-name">
            {fakeData.firstName} {fakeData.lastName}
          </div>
        </div>
        <div className="student-information__browse-courses">
     
           <Button
            className="browse-courses__button"
            size="small"
            onClick={openModal}
            label="Manage Classes"
          />
               <Button
            className="browse-courses__button"
            size="small"
            label="Browse Courses"
          />


<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Example Modal"
  style={{
    content: {
      width: '700px',
      height: '450px',
      margin: 'auto',
      zIndex: '1000', // Make the modal appear on top

    },
    transition: 'width 0.5s ease-in-out', // Optional: Add smooth transition
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Darken the background
      zIndex: '2000', // Make the overlay appear on top

    },
  }}
>
  <div>
  <button
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#666',
                    cursor: 'pointer'
                }}
                onClick={closeModal}
            >
                &times;
            </button>
                   <h2 style={{ color: '#333', marginTop: '30px', textAlign: 'center' }}>Manage Classes</h2>
                   <div className="courses-tabs">
        <TabView scrollable> 
          {courses.map((course, index) => {
            return (
              <TabPanel
                key={index}
                className="courses__tab-panel"
                header={`${course.course_title}`}

              >
                          <Course id={course.enrollment_id} title={course.course_title} />

              </TabPanel>
            );
          })}



        </TabView>
        </div>
                   </div>
</Modal>

        </div>
      </div>
      <div className="courses-tabs">
        <TabView>
          {fakeData.courses.map((course, index) => {
            return (
              <TabPanel
                key={index}
                className="courses__tab-panel"
                header={`${course.name}`}
              >
                <StudentLessonTab key={index} course={course} />
              </TabPanel>
            );
          })}
          ;
        </TabView>
      </div>
    </div>
  );
};

export default StudentDashboard;