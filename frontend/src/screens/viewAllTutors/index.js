import { useEffect, useState } from "react";
import { FakeTutors } from "./fakeData";
import { TutorInfoCard } from "../../components/TutorInfoCard";
import "./index.css";
import Banner from "../../components/Banner";
import { MainContentLayout } from "../../components/MainContentLayout";

export const ViewAllTutors = () => {
  const [allTutors, setAllTutors] = useState([]);
  const [courses, setCourses] = useState({})
  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorsResponse = await fetch(`${url}/tutors/all`);
        const tutorsData = await tutorsResponse.json();
        console.log(tutorsData);
        setAllTutors(tutorsData);

        const coursesResponse = await fetch(`${url}/tutor-courses`);
        const coursesJSON = await coursesResponse.json()
        console.log("Courses ", coursesJSON);

        const coursesMap = coursesJSON.reduce((map, course) => {
          map[course.tutor_id] = course.courses;
          return map;
        }, {});
        console.log("Courses ", coursesMap);


        setCourses(coursesMap);


      } catch (error) {
        console.error("Failed to fetch data", error);
      }

    };
    fetchData();
  }, []);
  console.log(allTutors);
  return (
    <>
      <MainContentLayout >
        <div className="courses-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="shop-courses-container">
            <h2 className="shop-courses-heading">
              View All Tutors</h2>

          </div>
          <div className="tutors-scroll__title">
            {`Showing ${allTutors.length} tutors`}
          </div>
          {allTutors.map((tutor) => {
            return (
              <div className='course-container'
              >
                <TutorInfoCard tutorId={tutor.tutor_id} tutor={tutor} courses={courses[tutor.tutor_id]} />
              </div>
            );
          })}
        </div>

      </MainContentLayout >


    </>

  );
};
