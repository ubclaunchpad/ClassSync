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

const URL = process.env.REACT_APP_API_URL

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

  const handleTrialClass = () => {
    navigate('/trial/' + id, { state: { name: name.f_name + " " + name.l_name } });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {

        const nameResponse = await fetch(URL + `/students/name/${id}/`);
        const nameData = await nameResponse.json()
        setName(nameData)

        const response = await fetch(
          URL + `/student/${id}/courses`
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
    console.log(courses)
    // const enrollmentIds = courses.map(course => course.enrollment_id);
    let coursesResult = []
    for (let course of courses) {
      let startDate = null
      let endDate = null
      let learningGoals = []
      let bookingArray = []

      const bookingResponse = await fetch(URL + `/students/enrollment?enrollment_id=${course.enrollment_id}`)
      const bookingData = await bookingResponse.json();
      console.log(bookingData)
      let sortedBookingData = sortBookingsByDate(bookingData)
      console.log(sortedBookingData)
      if (sortedBookingData != null && sortedBookingData.length > 0) {
        startDate = new Date(sortedBookingData[0].start_time);
        endDate = new Date(sortedBookingData[sortedBookingData.length - 1].start_time)
        const lgResponse = await fetch(URL + `/learninggoals?id=${sortedBookingData[0].booking_id}`);
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

  const [selectedCourse, setSelectedCourse] = useState(null);
  useEffect(() => {
    if (courseList.length > 0) {
      setSelectedCourse(courseList[0]);
    }
  }, [courseList]);
  const handleCourseChange = (event) => {
    const selectedCourseName = event.target.value;
    const course = courseList.find((course) => course.name === selectedCourseName);
    setSelectedCourse(course);
  };
  const getLessons = async (sortedBookingData) => {
    const sortedBookingsWithFiles = await Promise.all(sortedBookingData.map(async (booking, index) => {
      const startDate = new Date(booking.start_time);
      const meetingLink = booking.link.startsWith("http") ? booking.link : `https://${booking.link}`;
      const complete = startDate < Date.now();
      const sharedFilesResponse = await fetch(URL + `/sharedfiles?id=${booking.booking_id}`);
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
    <>
      <div className="pc">
        <MainContentLayout rightColumnContent={

          <div width="60%">
            <p>Book a <b>FREE 30-min</b> trial session today!</p>


            <Button
              className="browse-courses__button"
              size="small"
              onClick={handleTrialClass}
              label="Book Trial Class"
            /></div>}>
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
                      width: '85%',
                      maxWidth: '700px',
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
                    {courses.map((course, index) => (

                      <Course id={course.enrollment_id} title={course.course_title} />
                    ))}
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
      </div>
      <div className="mb">
        <MainContentLayout
        >
          <div className="student-dashboard__page">
            <div className="student-dashboard__student-information">
              <div className="student-information__profile">
                <button
                  className="student-profile__back-button"
                  onClick={(e) => {
                    navigate("/parentDash")
                  }}
                >
                  <i
                    className="pi pi-arrow-left student-profile__icon"
                    style={{ fontSize: "1.5em" }}
                  ></i>

                </button>

                <div className="student-information__profile-name">
                  {name.f_name} {name.l_name}
                </div>
              </div>

            </div>
            <div className="courses-dropdown" style={{ textAlign: 'center' }}>
              <select onChange={handleCourseChange} value={selectedCourse?.name || ''} style={{ marginBottom: '15px' }}>
                {courseList.map((course, index) => (
                  <option key={index} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>

              <div className="student-information__browse-courses" style={{ marginBottom: '15px' }}>

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
                <div width="60%">
                  <p>Book a <b>FREE 30-min</b> trial session today!</p>


                  <Button
                    className="browse-courses__button"
                    size="small"
                    onClick={handleTrialClass}
                    label="Book Trial Class"
                  /></div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Example Modal"
                  style={{
                    content: {
                      width: '85%',
                      maxWidth: '700px',
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
                    {courses.map((course, index) => (

                      <Course id={course.enrollment_id} title={course.course_title} />
                    ))}
                  </div>
                </Modal>

              </div>
              {selectedCourse && (
                <div className="courses__tab-panel" style={{
                  width: '100%'
                }}>
                  <StudentLessonTab key={selectedCourse.name} course={selectedCourse} view="mb" />
                </div>
              )}
            </div>
          </div>
        </MainContentLayout>
      </div>
    </>

  );
};

export default StudentDashboard;