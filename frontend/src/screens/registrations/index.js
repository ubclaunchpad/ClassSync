import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RegistrationRow from "../../components/RegistrationRow";
import "./index.css";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [sortedByGuardian, setSortedByGuardian] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedByStudent, setSortedByStudent] = useState(false);
  const [sortedByCourse, setSortedByCourse] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedByPaid, setSortedByPaid] = useState(false);
  const [curExpand, setCurExpand] = useState();

  const fetchRegistrations = async () => {
    const url = `http://localhost:8080/registrations`;
    const response = await fetch(url);
    const registrations = await response.json();
    console.log("Registrations", registrations);
    setRegistrations(registrations);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleChange = async (id, paid) => {
    const url = `http://localhost:8080/registrations/${id}/${paid}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paid: paid }),
    });
    if (response.ok) {
      fetchRegistrations();
    }
  };

  const resetSort = () => {
    setSortedByGuardian(false);
    setSortedByStudent(false);
    setSortedByCourse(false);
    setSortedByDate(false);
    setSortedByPaid(false);
  };
  const handleSortByGuardian = () => {
    resetSort();
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortedByGuardian(true);

    const sortedRegistrations = [...registrations];
    sortedRegistrations.sort((a, b) => {
      const guardianA = a.guardian.toLowerCase();
      const guardianB = b.guardian.toLowerCase();
      return newSortDirection === "asc"
        ? guardianA.localeCompare(guardianB)
        : guardianB.localeCompare(guardianA);
    });
    setRegistrations(sortedRegistrations);
  };

  const handleByPaid = () => {
    resetSort();
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortedByPaid(true);

    const sortedRegistrations = [...registrations];
    sortedRegistrations.sort((a, b) => {
      const paidA = Number(a.paid);
      const paidB = Number(b.paid);
      return newSortDirection === "asc" ? paidA - paidB : paidB - paidA;
    });
    setRegistrations(sortedRegistrations);
  };

  const handleSortByStudent = () => {
    resetSort();
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortedByStudent(true);

    const sortedRegistrations = [...registrations];
    sortedRegistrations.sort((a, b) => {
      const studentA = a.student.toLowerCase();
      const studentB = b.student.toLowerCase();
      return newSortDirection === "asc"
        ? studentA.localeCompare(studentB)
        : studentB.localeCompare(studentA);
    });
    setRegistrations(sortedRegistrations);
  };
  const handleSortByCourse = () => {
    resetSort();
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortedByCourse(true);

    const sortedRegistrations = [...registrations];
    sortedRegistrations.sort((a, b) => {
      const courseA = a.course.toLowerCase();
      const courseB = b.course.toLowerCase();
      return newSortDirection === "asc"
        ? courseA.localeCompare(courseB)
        : courseB.localeCompare(courseA);
    });
    setRegistrations(sortedRegistrations);
  };

  const handleSortByDate = () => {
    resetSort();
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortedByDate(true);

    const sortedRegistrations = [...registrations];
    sortedRegistrations.sort((a, b) => {
      const dateA = new Date(a.registration_date);
      const dateB = new Date(b.registration_date);
      return newSortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
    setRegistrations(sortedRegistrations);
  };

  return (
    <TutorDashboardLayout
      smallText="Admin Dashboard"
      rightColumnContent={
        <div
          style={{
            textAlign: "left",
            marginTop: "20px",
            marginRight: "15px",
          }}
        >
          <h3>Manage Student Enrollments</h3>
          <p>
            This dashboard allows administrators to manage student enrollments.
            View and sort enrollments by clicking on column headers.
          </p>
          <p>
            The "Paid" column indicates whether the enrollment has been paid
            for. You can toggle the payment status by clicking on the respective
            button in each row.
          </p>
          <p>
            Additionally, you can track the progress of each course, seeing how
            many classes are completed, booked, and pending respectively.
          </p>{" "}
        </div>
      }
    >
      <div style={{ display: "flex", marginTop: "20px", marginLeft: "60%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "darkblue",
              marginRight: "5px",
              borderRadius: "3px",
            }}
          />
          <div>Completed</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#86d3ff",
              marginRight: "5px",
              borderRadius: "3px",
            }}
          />
          <div>Booked</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#9E9E9E",
              marginRight: "5px",
              borderRadius: "3px",
            }}
          />
          <div>Pending</div>
        </div>
      </div>

      <div className="registrations__table">
        <div
          className="registration__table-header-element"
          style={{ borderTopLeftRadius: "10px" }}
        >
          ID
        </div>
        <div
          className="registration__table-header-element"
          onClick={handleSortByGuardian}
        >
          Guardian {sortedByGuardian && (sortDirection === "asc" ? " ▲" : " ▼")}
        </div>
        <div
          className="registration__table-header-element"
          onClick={handleSortByStudent}
        >
          Student {sortedByStudent && (sortDirection === "asc" ? " ▲" : " ▼")}
        </div>
        <div
          className="registration__table-header-element"
          onClick={handleSortByCourse}
        >
          Course {sortedByCourse && (sortDirection === "asc" ? " ▲" : " ▼")}
        </div>
        <div
          className="registration__table-header-element"
          onClick={handleSortByDate}
        >
          Registration Date{" "}
          {sortedByDate && (sortDirection === "asc" ? " ▲" : " ▼")}
        </div>
        <div
          className="registration__table-header-element"
          onClick={handleByPaid}
        >
          Paid {sortedByPaid && (sortDirection === "asc" ? " ▲" : " ▼")}
        </div>
        <div className="registration__table-header-element">Progress</div>
        <div
          className="registration__table-header-element"
          style={{ borderTopRightRadius: "10px" }}
        >
          Expand
        </div>
        {registrations.map((data) => (
          <RegistrationRow
            data={data}
            handleChange={handleChange}
            curExpand={curExpand}
            setCurExpand={setCurExpand}
          />
        ))}
      </div>
    </TutorDashboardLayout>
  );
};

export default Registrations;
