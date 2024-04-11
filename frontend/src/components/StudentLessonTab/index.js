import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import "./index.css";

export const StudentLessonTab = ({ course }) => {
  const { name, startDate, endDate, lessons, learningGoals } = course;
  // console.log(startDate)

  const [chartData, setChartData] = useState({});
  const [shortStartDate, setShortStartDate] = useState("");
  const [shortEndDate, setShortEndDate] = useState("");
  const [completedClasses, setCompletedClasses] = useState(0);
  const [incompletedClasses, setIncompletedClasses] = useState(0);
  const [lessonNames, setLessonNames] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [selectedLessonName, setSelectedLessonName] = useState("All Lessons");

  function getShortDate(date) {
    if(date == null) 
      return ""

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
    if (lessons.length > 0) {
      // Set Completed Classes
      const completedClasses = lessons.filter(
        (lesson) => lesson.complete
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

      // Populate Dropdown & Lessons Array
      const lessonsNamesArray = [{ name: "All Lessons", value: "All Lessons" }];
      lessons.forEach((lesson) => {
        lessonsNamesArray.push({ name: lesson.name, value: lesson.name });
      });
      setLessonNames(lessonsNamesArray);
      setSelectedLessons([...lessons]);
    } else {
      setCompletedClasses(0);
      setIncompletedClasses(0);
      setChartData({
        datasets: [
          {
            data: [0, 1],
            backgroundColor: ["#00B0F1", "#B3DEFC"],
            hoverBackgroundColor: ["#00B0F1", "#B3DEFC"],
          },
        ],
      });
    }

    // Get Proper Dates For Lessons
    setShortEndDate(getShortDate(endDate));
    setShortStartDate(getShortDate(startDate));
  }, [lessons, startDate, endDate]);
  return (
    <div className="student-dashboard__lesson-tab">
      <div className="lesson-information">
        <div className="lesson-information__learning-goals">
          <div className="student-dashboard__title">
            Learning Goals And Content Checklist
          </div>
          <div className="learning-goals-checklist__container">
            {!learningGoals?.length > 0 && (
              <div className="learning-goal__row">
                No Learning Goals To Complete!
              </div>
            )}
            {learningGoals?.length > 0 &&
              learningGoals.map((goal) => {
                return (
                  <div className="learning-goal__row">
                    <div className="learning-goal__checkbox">
                      <Checkbox
                        // disabled={true}
                        checked={goal.completed}
                      ></Checkbox>
                    </div>
                    {goal.goal}
                  </div>
                );
              })}
          </div>
          {/* </div> */}
        </div>
        <div className="lesson-information__classes">
          <div className="course-progress__container">
            <div className="student-dashboard__title">Course Progress</div>
            <div className="classes-information">
              <div className="classes-graph__container">
                <div className="classes-chart__container">
                  <Chart
                    height={"150px"}
                    width={"150px"}
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
                {!lessons?.length > 0 && (
                  <div className="next-lesson__date-row">
                    <div>No Lessons Scheduled !</div>
                  </div>
                )}
                {lessons?.length > 0 &&
                  lessons.map((lesson) => {
                    return (
                      <div className="next-lesson__date-row">
                        <div>{getShortDateTime(lesson.startdate)}</div>
                        <div>
                          <a className="meeting-link" href={lesson.meetinglink}>
                            Meeting Link
                          </a>
                        </div>
                      </div>
                    );
                  })}
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
              {!selectedLessons?.length && (
                <div className="lesson-files__container--empty">
                  <div className="lesson-file__title">No Lesson Files</div>
                </div>
              )}
              {selectedLessons?.length > 0 &&
                selectedLessons.map((lesson, index) => {
                  console.log("LKFJSLKD")
                  console.log(lesson)
                  return (
                    <div className="lesson-file__container">
                      <div className="lesson-file__title">{`${lesson.name}`}</div>
                      <div className="lesson-files-items">
                        {lesson.files.map((file) => {
                          return (
                            <div className="lesson-file__item">
                              <a className="lesson-file__link" href={file.url}>
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
