import { Button } from "primereact/button";

import "./index.css";

export const ReccomendedCourseTab = ({
  name,
  age,
  prerequisites,
  course_id,
}) => {
  console.log("Courses Tab", name, age, prerequisites, course_id);
  const frontEndUrl = "http://localhost:3000";
  return (
    <div className="reccommended-tab-container">
      <div className="reccomended-tab__information">
        <div className="reccommended-tab__name"> {name}</div>
        <div className="tab-age-prerequisite__container">
          <div className="reccommended-tab__age">Target Age range: {age}</div>
          <div className="reccommended-tab__prerequisite">{prerequisites}</div>
        </div>
      </div>
      <div className="reccomended-tab-button__container">
        {/* <a href={`${frontEndUrl}/course/${course_id}`}> */}
        <img
          src="/leftArrow.svg"
          alt=""
          className="reccomended-tab-button__img"
        ></img>
      </div>
    </div>
  );
};
