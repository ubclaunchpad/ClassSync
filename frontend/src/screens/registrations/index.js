import React, { useEffect, useState } from "react";
import { MainContentLayout } from "../../components/MainContentLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
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
    <MainContentLayout
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

      <table style={{ borderSpacing: '0', borderCollapse: 'collapse' }} className="registrations__table">
        <thead>
          <tr style={{ backgroundColor: '#103da2', color: '#fff' }}>
            <th style={{ textAlign: 'center', borderTopLeftRadius: "10px", padding: '10px' }}>ID</th>
            <th style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }} onClick={handleSortByGuardian}>
              Guardian{" "}
              {sortedByGuardian ? (
                sortDirection === "asc" ? (
                  " ▲"
                ) : (
                  " ▼"
                )
              ) : (
                <FontAwesomeIcon icon={faSort} style={{ paddingLeft: "5px" }} />
              )}
            </th>
            <th style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }} onClick={handleSortByStudent}>
              Student{" "}
              {sortedByStudent ? (
                sortDirection === "asc" ? (
                  " ▲"
                ) : (
                  " ▼"
                )
              ) : (
                <FontAwesomeIcon icon={faSort} style={{ paddingLeft: "5px" }} />
              )}
            </th>
            <th style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }} onClick={handleSortByCourse}>
              Course{" "}
              {sortedByCourse ? (
                sortDirection === "asc" ? (
                  " ▲"
                ) : (
                  " ▼"
                )
              ) : (
                <FontAwesomeIcon icon={faSort} style={{ paddingLeft: "5px" }} />
              )}
            </th>
            <th style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }} onClick={handleSortByDate}>
              Registration Date{" "}
              {sortedByDate ? (
                sortDirection === "asc" ? (
                  " ▲"
                ) : (
                  " ▼"
                )
              ) : (
                <FontAwesomeIcon icon={faSort} style={{ paddingLeft: "5px" }} />
              )}
            </th>
            <th style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }} onClick={handleByPaid}>
              Paid{" "}
              {sortedByPaid ? (
                sortDirection === "asc" ? (
                  " ▲"
                ) : (
                  " ▼"
                )
              ) : (
                <FontAwesomeIcon icon={faSort} style={{ paddingLeft: "5px" }} />
              )}
            </th>
            <th style={{ textAlign: 'center', borderTopRightRadius: "10px", padding: '10px' }}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((data) => (
            <RegistrationRow
              data={data}
              handleChange={handleChange}
              curExpand={curExpand}
              setCurExpand={setCurExpand}
            />
          ))}
        </tbody>
      </table>
    </MainContentLayout>
  );
};

export default Registrations;
