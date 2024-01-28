import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import "./lessonTab.css";
import Course from "../../components/StudentDashboard"; // import the Course component
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";
import { TabView, TabPanel } from "primereact/tabview";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { fakeData } from "./fakeData";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";

import "primereact/resources/themes/lara-light-indigo/theme.css";

const LessonTab = ({ course }) => {
  const { name, startDate, endDate, lessons, learningGoals } = course;

  const [chartData, setChartData] = useState({});
  const [shortStartDate, setShortStartDate] = useState("");
  const [shortEndDate, setShortEndDate] = useState("");
  const [completedClasses, setCompletedClasses] = useState(0);
  const [incompletedClasses, setIncompletedClasses] = useState(0);
  const [lessonNames, setLessonNames] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [selectedLessonName, setSelectedLessonName] = useState("All Lessons");

  function getShortDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date(date);
    console.log("this is the day", d.getDay());
    return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
  }

  function getShortDateTime(date) {
    if (!date) {
      return;
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date(date);
    let options = { timeStyle: "short", hour12: true };
    let timeString = d.toLocaleTimeString("en-US", options);
    return `${months[d.getMonth()]} ${d.getDate()}: ${timeString}`;
  }

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  // Calculate the percentage of completed classes & Add To Chart Data
  useEffect(() => {
    const completedClasses = lessons.filter(
      (lesson) => lesson.completed
    ).length;
    setCompletedClasses(completedClasses);
    const incompletedClasses = lessons.length - completedClasses;
    setIncompletedClasses(incompletedClasses);
    setChartData({
      datasets: [
        {
          data: [completedClasses, incompletedClasses],
          backgroundColor: ["#00B0F1", "#B3DEFC"],
          hoverBackgroundColor: ["#00B0F1", "#B3DEFC"],
        },
      ],
    });

    // Get Proper Dates For Lessons
    setShortEndDate(getShortDate(endDate));
    setShortStartDate(getShortDate(startDate));

    // Populate Dropdown & Lessons Array
    const lessonsNamesArray = [{ name: "All Lessons", value: "All Lessons" }];
    lessons.forEach((lesson) => {
      lessonsNamesArray.push({ name: lesson.name, value: lesson.name });
    });
    setLessonNames(lessonsNamesArray);
    setSelectedLessons([...lessons]);
  }, [lessons, startDate, endDate]);
  return (
    <div className="student-dashboard__lesson-tab">
      <div className="lesson-information">
        <div className="lesson-information__learning-goals">
          <div className="learning-goals__container">
            <div className="student-dashboard__title">
              Learning Goals And Content Checklist
            </div>
            <div className="learning-goals-checklist__container">
              {learningGoals.map((goal) => {
                return (
                  <div className="learning-goal__row">
                    <div className="learning-goal__checkbox">
                      <Checkbox
                        // disabled={true}
                        checked={goal.completed}
                      ></Checkbox>
                    </div>
                    {goal.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lesson-information__classes">
          <div className="course-progress__container">
            <div className="student-dashboard__title">Course Progress</div>
            <div className="classes-information">
              <div className="classes-graph__container">
                <div className="classes-chart__container">
                  <Chart
                    className="student-classes__chart"
                    type="pie"
                    data={chartData}
                    options={lightOptions}
                  />
                  <div className="class-complete__title">
                    {`${completedClasses}/${
                      incompletedClasses + completedClasses
                    } Classes Complete! `}
                  </div>
                </div>

                <div className="classes-start-end-date__container">
                  <div>{"Start Date: " + shortStartDate}</div>
                  <div>{"End Date: " + shortEndDate}</div>
                </div>
              </div>
            </div>
            <div className="classes__next-lesson__container">
              <div className="student-dashboard__title">Lesson Links</div>
              <div className="next-lesson__container">
                {lessons.map((lesson) => {
                  return (
                    <div className="next-lesson__date-row">
                      <div>{getShortDateTime(lesson.dateTime)}</div>
                      <div>
                        <a className="meeting-link" href={lesson.meetingLink}>
                          Meeting Link
                        </a>
                      </div>
                    </div>
                  );
                })}
                <div className="next-lesson__title">{lessons[0].title}</div>
                <div className="next-lesson__description">
                  {lessons[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-files">
        <div className="course-files__container">
          <div className="student-dashboard__title">
            Course Worksheets And Files
          </div>
          <div className="course-files-items__container">
            <div className="course-files__search-row">
              <Dropdown
                className="course-files__dropdown p-dropdown-sm"
                size="small"
                optionLabel="name"
                value={selectedLessonName}
                options={lessonNames}
                onChange={(e) => {
                  console.log(e.value);
                  setSelectedLessonName(e.value);
                  if (e.value === "All Lessons") {
                    setSelectedLessons([...lessons]);
                  } else {
                    const selectedLesson = lessons.filter(
                      (lesson) => lesson.name === e.value
                    );
                    setSelectedLessons(selectedLesson);
                  }
                }}
                placeholder="All Courses"
              />
              <Button
                className="course-files__download-all "
                onClick={() => {
                  console.log("you clicked me!");
                }}
              >
                Download All
              </Button>
            </div>
            <div className="course-files-items">
              {selectedLessons.map((lesson, index) => {
                return (
                  <div className="lesson-file__container">
                    <div className="lesson-file__title">{`${lesson.name}`}</div>
                    <div className="lesson-files-items">
                      {lesson.files.map((file) => {
                        return (
                          <div className="lesson-file__item">
                            <a className="lesson-file__link" href={file.link}>
                              <span className="lesson-file__link__text">
                                {file.name}
                              </span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
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
          <div>
            <Avatar
              className="student-information__profile-picture"
              image="/momoFakeProfile.jpg"
              size="xlarge"
              shape="circle"
            />
          </div>
          <div className="student-information__profile-name">
            {fakeData.firstName} {fakeData.lastName}
          </div>
        </div>
        <div className="student-information__browse-courses">
          <Button size="small" label="Browse Courses" />
        </div>
      </div>
      <div className="courses-tabs">
        <TabView>
          {fakeData.courses.map((course) => {
            // console.log(course);
            return (
              <TabPanel header={`${course.name}`}>
                <LessonTab course={course} />
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
