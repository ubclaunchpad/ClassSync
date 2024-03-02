import { Avatar } from "primereact/avatar";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "./courseCurriculum.css";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { ReccomendedCourseTab } from "../../components/ReccomendedCourseTab";
const url = "http://localhost:8080";

const sampleData = {
  name: "Beginner Scratch",
  age: "5-7",
  description:
    "The perfect introduction to computer science! \n \n Scratch is a block-based language (no typing) primarily for beginners. This workshop introduces students to the world of coding by keeping things interactive, visual, and fun while providing a few small challenges!",
  color: "blue",
  prerequisites: "None",
  image: "/TestProfileImage.png",
  files: ["testFile1", "testFile2"],
  tutors: ["John Danaher", "Miki Okudera", "Tifa Lockhart"],
  learning_goals: [
    "Game design & animations",
    "Making and drawing sprites",
    " Sprite actions (movement, sound, appearances, cloning)",
    "Interactions between sprites",
    "Working with backgrounds, visuals, etc.",
    "Loops",
    "Conditional statements (if-statements)",
    "Variables",
    "Timers",
    "Math and logic operators (<, >, ==, and, or)",
    "Parts of the computer",
  ],
  projects: [
    "An interactive cat",
    "An ocean simulator with sea creatures",
    "Pong game",
    "Advertisement, short video, and/or animations",
    "Hoppy Cat game",
    "A Pokémon game",
  ],
  difficulty: "Beginner",
  reccomended_courses: [
    {
      name: "Intermediate Scratch",
      prerequisites: "Beginner Scratch",
      age: "10-12",
      course_id: 1,
    },
    {
      name: "Advanced Scratch",
      prerequisites: "Intermediate Scratch",
      age: "13-15",
      course_id: 2,
    },
    {
      name: "Beginner Python",
      prerequisites: "Advanced Scratch",
      age: "13-15",
      course_id: 3,
    },
  ],
};

export const CourseCurriculumView = ({
  name,
  age,
  description,
  color,
  prerequisites,
  image,
  info_page,
  files,
  learning_goals,
  difficulty,
  tutors,
}) => {
  const [courseDescription, setCourseDescription] = useState([]);
  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
    if (description) {
      setCourseDescription(description.split("\n"));
    } else {
      setCourseDescription(sampleData.description.split("\n"));
    }
  }, []); // Empty dependency array to run the effect only once after the initial render
  console.log(courseDescription);
  return (
    <div>
      <div className="course-curriculum__view">
        <div className="course-curriculum__overview">
          <div className="course-curriculum__avatar-container">
            <Avatar
              className="course-curriculum__avatar"
              image="/TestProfileImage.png"
              size="large"
            />
          </div>
          <div className="course-curriculum__details">
            <div className="course-curriculum__name">
              {name ? name : sampleData.name}
            </div>
            <div className="curriculum-age-prereq__container">
              <span className="curriculum-overview__text--age">
                Target Age: {age ? age : sampleData.age}
              </span>
              <span className="curriculum-overview__text--prereq">
                Prerequisites:{" "}
                {prerequisites ? prerequisites : sampleData.prerequisites}
              </span>
            </div>
            <div className="curriculum-taught-by__container">
              <span className="curriculum-overview__taught-by">
                Taught By: {tutors ? tutors : sampleData.tutors.join(", ")}
              </span>
            </div>
            <div className="curriculum-register__container">
              <Button
                className="curriculum-register__button"
                label="Register"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        {/* <Divider className="curriculum-divider" /> */}
        <hr className="curriculum-divider"></hr>
        <div className="curriculum-view-body">
          <div className="curriculum-more-information">
            <div className="curriculum-description">
              {courseDescription.map((line) => {
                return <p>{line}</p>;
              })}
            </div>
            <div className="curriculum-concepts-projects-container">
              <div classname="curriculum-concepts__container">
                <div className="curriculum-concepts__title ">
                  Concepts Covered
                </div>
                <ul className="curriculum__list">
                  {sampleData.learning_goals.map((goal) => {
                    return <li className="curriculum-learning-goal">{goal}</li>;
                  })}
                </ul>
              </div>
              <div classname="curriculum-projects__container">
                <div className="curriculum-projects__title ">
                  Projects You'll Make:
                </div>
                <ul className="curriculum__list">
                  {sampleData.projects.map((project) => {
                    return <li className="curriculum-project">{project}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="curriculum-reccomended-container">
            <div className="curriculum-reccomended-title">
              Reccommended Courses:
            </div>
            <div className="curriculum-reccomended-tabs">
              {sampleData.reccomended_courses.map((course) => {
                return (
                  <ReccomendedCourseTab
                    key={course.course_id}
                    name={course.name}
                    prerequisites={course.prerequisites}
                    course_id={course.course_id}
                    age={course.age}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="course-curriculum__footer"></div>
      </div>
    </div>
  );
};
