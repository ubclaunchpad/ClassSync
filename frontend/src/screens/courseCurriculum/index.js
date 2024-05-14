import { Avatar } from "primereact/avatar";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "./courseCurriculum.css";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { CourseFilesTab } from "../../components/CourseFilesTab";
import { useParams } from "react-router-dom";
const url = process.env.REACT_APP_API_URL

const sampleData = {
  name: "Beginner Scratch",
  age: "5-7",
  description:
    "The perfect introduction to computer science! \n \n Scratch is a block-based language (no typing) primarily for beginners. This workshop introduces students to the world of coding by keeping things interactive, visual, and fun while providing a few small challenges!",
  color: "blue",
  prerequisites: "None",
  image: "/TestProfileImage.png",
  files: [
    {
      name: "Generate-Image.html",
      link: "https://class-sync.s3.us-east-2.amazonaws.com/Screenshot%202024-02-14%20213738.png",
    },
    {
      name: "download.html",
      link: "https://class-sync.s3.us-east-2.amazonaws.com/Screenshot%202024-02-14%20213738.png",
    },
    {
      name: "Generate-Image.html",
      link: "https://class-sync.s3.us-east-2.amazonaws.com/Screenshot%202024-02-14%20213738.png",
    },
    {
      name: "download.html",
      link: "https://class-sync.s3.us-east-2.amazonaws.com/Screenshot%202024-02-14%20213738.png",
    },
  ],
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
const URL = process.env.REACT_APP_API_URL

export const CourseCurriculumView = () => {
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const course_id = id;
  const [goals, setGoals] = useState(["No Description Available"]);
  const [courseValues, setCourseValues] = useState({
    name: "",
    age: "",
    color: "",
    prerequisites: "",
    description: ["No Description Available"],
    image: "",
    difficulty: "",
  });

  useEffect(() => {
    fetch(URL + `/course/view?id=${course_id}`)
      .then((response) => {
        if (response.ok) {
          return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
          });
        } else {
          throw new Error("Server response not OK");
        }
      })
      .then((data) => {
        console.log("Data is ", data);
        if (data.learning_goals != null && data.learning_goals.length > 0) {
          console.log(
            "Setting learning goals ---> " + data.learning_goals.join("\n")
          );
          let trimmedValues = data.learning_goals
            .join("\n")
            .split("\n")
            .map((val) => val.trim())
            .filter((val) => val.length > 0);
          setGoals(trimmedValues);
        } else {
          setGoals(["No learning goals available"]);
        }

        setCourseValues({
          name: data.course_difficulty + " " + data.course_name,
          age: data.target_age,
          color: data.color,
          prerequisites: data.prerequisites,
          description: data.course_description,
          image: data.image,
          difficulty: data.course_difficulty,
          info_page: data.info_page,
        });

        setFileList(data.files == null ? [] : data.files);
      });
  }, [course_id, goals]);

  console.log("These are the file lists", fileList);

  return (
    <div>
      <div className="course-curriculum__view">
        <div className="course-curriculum__overview">
          <div className="course-curriculum__avatar-container">
            <Avatar
              className="course-curriculum__avatar"
              image={courseValues.image}
              size="Medium"
              style={{ width: "auto" }}
            />
          </div>
          <div className="course-curriculum__details">
            <div className="course-curriculum__name">
              {courseValues?.name ? courseValues.name : sampleData.name}
            </div>
            <div className="curriculum-age-prereq__container">
              <span className="curriculum-overview__text--age">
                Target Age:{" "}
                {courseValues?.age ? courseValues.age : sampleData.age}
              </span>
              <span className="curriculum-overview__text--prereq">
                {courseValues.prerequisites
                  ? courseValues.prerequisites
                  : sampleData.prerequisites}
              </span>
              <span className="curriculum-overview__text--prereq">
                Difficulty: {courseValues.difficulty}
              </span>
            </div>
          </div>
        </div>
        <hr className="curriculum-divider"></hr>
        <div className="curriculum-view-body">
          <div className="curriculum-more-information">
            <div classname="curriculum-projects__container">
              <div className="curriculum-projects__title ">
                Course Description
              </div>
              {courseValues.description}
            </div>
            <div className="curriculum-concepts-projects-container">
              <div classname="curriculum-concepts__container">
                <div className="curriculum-concepts__title ">
                  Learning goals
                </div>

                <ul className="curriculum__list">
                  {console.log("These are the goals --->", goals)}
                  {goals?.map((goal) => {
                    return <li className="curriculum-learning-goal">{goal}</li>;
                  })}
                </ul>
                <div
                  dangerouslySetInnerHTML={{ __html: courseValues.info_page }}
                />
              </div>
            </div>
          </div>
          <div className="course-files-container">
            <div className="course-files-title">Files:</div>
            <div className="course-files-tabs">
              {fileList.map((file) => {
                return <CourseFilesTab name={file.name} link={file.url} />;
              })}
            </div>
          </div>
        </div>

        <div className="course-curriculum__footer"></div>
      </div>
    </div>
  );
};
