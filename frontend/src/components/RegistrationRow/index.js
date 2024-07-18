import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


import Switch from "react-switch";
import "./index.css";
const URL = process.env.REACT_APP_API_URL

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
    let url = URL + `/classes?enrollment_id=${data.enrollment_id}`;
    const response = await fetch(url);
    const classes = await response.json();
    classes.sort(function (book1, book2) {
      return book1.booking_id - book2.booking_id;
    });
    setEnrollmentData(classes);
  };

  useEffect(() => {
    searchEnrollment();
  }, []);

  return (
    <>
      <tr
        style={{
          backgroundColor: data.paid ? "inherit" : "rgb(255, 204, 204)",
        }}
      >
        <td className="registration__table-row-element">    <IconButton
          aria-label="expand row"
          size="small"
          onClick={expandRow}
        >
          {curExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
          {data.enrollment_id}
        </td>
        <td className="registration__table-row-element">{data.guardian}</td>
        <td className="registration__table-row-element">{data.student}</td>
        <td className="registration__table-row-element">{data.course}</td>
        <td className="registration__table-row-element">{new Date(data.registration_date).toLocaleDateString()}</td>
        <td className="registration__table-row-element">

          <div style={{ alignItems: "center" }}>
            {data.paid.charAt(0).toUpperCase()}
          </div>
        </td>
        <td className="registration__table-row-element">    <div style={{ display: "flex", alignItems: "center" }}>
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
        </td>

      </tr>
      {curExpand == data.enrollment_id && (
        <tr>
          <td colSpan="7">
            <div className="registration__row-expand-content">
              Email: {data.email}
              <div className="registration__row-expand-title">All Bookings</div>
              <table className="registration__row-expand-table" style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
                <tr className="registration__row-expand-row">
                  <th className="registration__row-expand-header">Class #</th>
                  <th className="registration__row-expand-header">Tutor</th>
                  <th className="registration__row-expand-header">Time</th>
                  <th className="registration__row-expand-header">Link</th>
                </tr>
                {enrollmentData.map((classInfo, index) => (
                  <tr className="registration__row-expand-row">
                    <td className="registration__expand-row-element" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      {index + 1}
                    </td>
                    <td className="registration__expand-row-element">
                      {classInfo.tutor_name}
                    </td>
                    <td className="registration__expand-row-element">
                      {
                        new Date(classInfo.start_time).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
                        new Date(classInfo.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                      }
                    </td>
                    <td className="registration__expand-row-element">
                      <a href={`/class/${classInfo.booking_id}`}>Link</a>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </td>
        </tr>

      )}
    </>

  );
}
