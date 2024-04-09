import "./index.css";

export const CourseFilesTab = ({ name, link }) => {
  console.log("Courses Tab", name, link);
  const frontEndUrl = "http://localhost:3000";
  return (
    <div className="course-files-tab-container">
      <div className="course-files-tab__information">
        <div className="course-files-tab__name"> {name}</div>
        <div className="tab-age-prerequisite__container"></div>
      </div>
      <div className="course-files-tab-button__container">
        <a className="file-tab-button" href={link}>
          <img
            src="/leftArrow.svg"
            alt=""
            className="course-files-tab-button__img"
          ></img>
        </a>
      </div>
    </div>
  );
};
