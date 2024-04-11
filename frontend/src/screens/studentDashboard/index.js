import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import Modal from 'react-modal';
import "primeicons/primeicons.css";
import Course from '../../components/StudentDashboard'; // import the Course component
import { useNavigate } from "react-router-dom";


import { fakeData } from "../../components/StudentLessonTab/fakeData";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/lara-light-blue/theme.css";

import { StudentLessonTab } from "../../components/StudentLessonTab";
import { MainContentLayout } from "../../components/MainContentLayout";

const StudentDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState({});
  const [courseList, setCourseList] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBrowseCourse = () => {
    navigate('/shop');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {

        const nameResponse = await fetch(`http://localhost:8080/student-profile/name/${id}/`);
        const nameData = await nameResponse.json()
        setName(nameData)

        const response = await fetch(
          `http://localhost:8080/student/${id}/courses`
        );
        const data = await response.json();
        setCourses(data);
        console.log(data)

        let courseList = await getCourseList(data)
        setCourseList(courseList)
        console.log(courseList)


      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const getCourseList = async (courses) => {
    console.log("HUH")
    console.log(courses)
    console.log("Fiuc")
    // const enrollmentIds = courses.map(course => course.enrollment_id);
    let coursesResult = []
    for (let course of courses) {
      let startDate = null
      let endDate = null
      let learningGoals = []
      let bookingArray = []

      const bookingResponse = await fetch(`http://localhost:8080/student-profile/enrollment?enrollment_id=${course.enrollment_id}`)
      const bookingData = await bookingResponse.json();
      console.log(bookingData)
      let sortedBookingData = sortBookingsByDate(bookingData)
      console.log(sortedBookingData)
      if(sortedBookingData != null && sortedBookingData.length > 0) {
        startDate = new Date(sortedBookingData[0].start_time);
        endDate = new Date(sortedBookingData[sortedBookingData.length - 1].start_time)
        const lgResponse = await fetch(`http://localhost:8080/learninggoals?id=${sortedBookingData[0].booking_id}`);
        const lgData = await lgResponse.json()
        learningGoals = lgData;
        let bookingObject = await getLessons(sortedBookingData);
        bookingArray.push(...bookingObject)
      }
      coursesResult.push(
        {
          name: course.course_title,
          startDate: startDate,
          endDate: endDate,
          learningGoals: learningGoals,
          lessons: bookingArray,
        }
      )
    }

    return coursesResult
  }

  const getLessons = async (sortedBookingData) => {
    const sortedBookingsWithFiles = await Promise.all(sortedBookingData.map(async (booking, index) => {
      const startDate = new Date(booking.start_time);
      const meetingLink = booking.link.startsWith("http") ? booking.link : `https://${booking.link}`;
      const complete = startDate > Date.now();
      const sharedFilesResponse = await fetch(`http://localhost:8080/sharedfiles?id=${booking.booking_id}`);
      const sharedFiles = await sharedFilesResponse.json();

      return {
        startdate: startDate,
        name: `Class ${index + 1}`,
        meetinglink: meetingLink,
        complete: complete,
        files: sharedFiles ?? []
      };
    }));

    return sortedBookingsWithFiles;
  };

  function sortBookingsByDate(bookings) {
    return bookings.sort((a, b) => {
      return new Date(a.start_time) - new Date(b.start_time);
    });
  }


  // const handleTabClick = (enrollmentId, title) => {
  //   setSelectedEnrollmentId(enrollmentId);
  //   setTitle(title)
  // };

  return (
    <MainContentLayout>
      <div className="student-dashboard__page">
        <div className="student-dashboard__student-information">
          <div className="student-information__profile">
            <button
              className="student-profile__back-button"
              onClick={(e) => {
                console.log("Clicked the back button");
              }}
            >
              {/* <i
              className="pi pi-arrow-left student-profile__icon"
              style={{ fontSize: "1.5em" }}
            ></i> */}
            </button>

            <div className="student-information__profile-name">
              {name.f_name} {name.l_name}
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
              onClick={handleBrowseCourse}
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
            {courseList.map((course, index) => {
              console.log("dfsfd")
              console.log(course)
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
    </MainContentLayout>
  );
};

export default StudentDashboard;