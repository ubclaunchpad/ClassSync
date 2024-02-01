import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

import { fakeData } from "../../components/StudentLessonTab/fakeData";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/lara-light-blue/theme.css";

import { StudentLessonTab } from "../../components/StudentLessonTab";

const StudentDashboard = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [title, setTitle] = useState(null);

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

  const handleTabClick = (enrollmentId, title) => {
    setSelectedEnrollmentId(enrollmentId);
    setTitle(title);
  };

  return (
    <div className="student-dashboard__page">
      <div className="student-dashboard__student-information">
        <div className="student-information__profile">
          <i
            className="pi pi-arrow-left student-profile__icon"
            style={{ fontSize: "1.5em" }}
          ></i>

          {/* <div>
            <Avatar
              className="student-information__profile-picture"
              image="/momoFakeProfile.jpg"
              size="xlarge"
              shape="circle"
            />
          </div> */}

          <div className="student-information__profile-name">
            {fakeData.firstName} {fakeData.lastName}
          </div>
        </div>
        <div className="student-information__browse-courses">
          <Button
            className="browse-courses__button"
            size="small"
            label="Browse Courses"
          />
        </div>
      </div>
      <div className="courses-tabs">
        <TabView>
          {fakeData.courses.map((course, index) => {
            // console.log(course);
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
