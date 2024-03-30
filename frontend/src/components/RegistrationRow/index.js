import React, { useState, useEffect } from "react";

import Switch from "react-switch";
import "./index.css";

export default function RegistrationRow({
  data,
  handleChange,
  curExpand,
  setCurExpand,
}) {
  const [enrollmentData, setEnrollmentData] = useState([]);

  const expandRow = () => {
    if (curExpand == data.enrollment_id) {
      setCurExpand(null);
    } else {
      setCurExpand(data.enrollment_id);
    }
  };

  const searchEnrollment = async () => {
    let url = `http://localhost:8080/classes?enrollment_id=${data.enrollment_id}`;
    const response = await fetch(url);
    const classes = await response.json();
    setEnrollmentData(classes);
  };

  useEffect(() => {
    searchEnrollment();
  }, []);

  return (
    <>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        {data.enrollment_id}
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        {data.guardian}
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        {data.student}
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        {data.course}
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        {new Date(data.registration_date).toLocaleDateString()}
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        <Switch
          checked={data.paid}
          onChange={(val) => handleChange(data.enrollment_id, val)}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </div>
      <div
        className="registration__table-row-element"
        style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {[...Array(Math.min(data.completed, 5))].map((_, i) => (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "darkblue",
                marginRight: "2px",
                borderRadius: "3px",
              }}
            />
          ))}
          {[...Array(Math.min(data.booked, 5 - data.completed))].map((_, i) => (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#86d3ff",
                marginRight: "2px",
                borderRadius: "3px",
              }}
            />
          ))}
          {[...Array(Math.max(0, 5 - data.completed - data.booked))].map(
            (_, i) => (
              <div
                key={i}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#9E9E9E",
                  marginRight: "2px",
                  borderRadius: "3px",
                }}
              />
            )
          )}
        </div>
      </div>
      <div
        className="registration__table-row-element"
        style={{
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: data.paid ? "#e6ffe6" : "inherit",
        }}
        onClick={expandRow}
      >
        {curExpand == data.enrollment_id ? "▲" : "▼"}
      </div>
      {curExpand == data.enrollment_id && (
        <div
          className="registration__row-expand-content"
          style={{ backgroundColor: data.paid ? "#e6ffe6" : "inherit" }}
        >
          <div className="registration__row-expand-title">All Bookings</div>
          <table className="registration__row-expand-table">
            <tr className="registration__row-expand-row">
              <th className="registration__row-expand-header">Class #</th>
              <th className="registration__row-expand-header">Tutor</th>
              <th className="registration__row-expand-header">Time</th>
              <th className="registration__row-expand-header">Link</th>
            </tr>
            {enrollmentData.map((classInfo, index) => (
              <tr className="registration__row-expand-row">
                <th className="registration__expand-row-element">{index}</th>
                <th className="registration__expand-row-element">
                  {classInfo.tutor_name}
                </th>
                <th className="registration__expand-row-element">
                  {classInfo.start_time.substring(0, 10) +
                    ", " +
                    classInfo.start_time.substring(11, 16)}
                </th>
                <th className="registration__expand-row-element">
                  <a href={`/class/${classInfo.booking_id}`}>Link</a>
                </th>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
}
