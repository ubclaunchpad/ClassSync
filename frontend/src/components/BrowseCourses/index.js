import { useEffect, useState } from "react";
import "./index.css";
import { Avatar } from "primereact/avatar";
import { useAuth } from "../../contexts/AuthContext";

export const ViewAllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const { user } = useAuth()


  const url = process.env.REACT_APP_API_URL;
  const frontEndUrl = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await fetch(`${url}/tutor/offerings`);
        let coursesData = await coursesResponse.json();

        if (user.role === "tutor") {
          const offeringsResponse = await fetch(`${url}/tutor/offering?id=${localStorage.getItem("userId")}`);
          const offeringsData = await offeringsResponse.json();
          console.log("THESE ARE COURSE DATA ", offeringsData);


          coursesData = coursesData.filter(course => offeringsData.includes(course.course_id));

        }
        setAllCourses(coursesData);
        console.log("THESE ARE COURSE DATA ", coursesData);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="view-courses__page">
        <div className="view-courses__container">
          <div className="all-courses__header">
            <div className="all-courses__title">Browse Courses</div>
          </div>
          <div className="courses-scroll__container">
            <div className="courses-scroll__title">
              {`Showing ${allCourses.length} Courses`}
            </div>
            <div className="courses-scroll__items">
              {allCourses.map((course) => {
                console.log("this is the course", course);
                return (
                  <div className="view-course-tab__container">
                    <a href={`${frontEndUrl}/course/${course.course_id}`}>
                      <div className="view-course__image">
                        <Avatar
                          className="course-info-card__avatar"
                          image={course.image}
                          size="xlarge"
                        />
                      </div>
                      <div className="view-course__course-name">
                        {course.course_name}
                      </div>
                      <div className="view-course__information">
                        <div className="view-course__info-text">
                          Target Age: {course.target_age}
                        </div>
                        <div className="view-course__info-text">
                          {" "}
                          Prerequisites: {course.prerequisites}
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
