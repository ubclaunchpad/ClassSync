import Header from "../../components/Header";
import CourseTile from "../../components/CourseTile";
import "./index.css";

function CourseLibrary() {
    // Dummy courseList for testing purposes
    const dummyCourseList = [
      { course_id: 1, title: "course 1", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 2, title: "course 2", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 3, title: "course 3", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 4, title: "course 4", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 5, title: "course 5", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 6, title: "course 6", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 7, title: "course 7", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 8, title: "course 8", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 9, title: "course 9", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 10, title: "course 10", src:"scratch.png", age: "6+", prereq: "None" },
      { course_id: 11, title: "course 11", src:"scratch.png", age: "6+", prereq: "None" }
      // Add more dummy courses as needed
    ];
  
    return (
      <div className="coursePage">
        <div className="coursePageContent">
          <Header />
          <div className="coursePageTitle">
            Browse Courses
          </div>
          <div className="courseCells">
            {dummyCourseList.map((item) => (
              <div key={item.course_id}>
                <CourseTile item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default CourseLibrary;