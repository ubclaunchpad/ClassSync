import React, { useEffect, useState } from "react";
import { MainContentLayout } from "../../components/MainContentLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import RegistrationRow from "../../components/RegistrationRow";
import Select from "react-select";

import "./index.css";

const URL = process.env.REACT_APP_API_URL

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [sortedByGuardian, setSortedByGuardian] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedByStudent, setSortedByStudent] = useState(false);
  const [sortedByCourse, setSortedByCourse] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedByPaid, setSortedByPaid] = useState(false);
  const [curExpand, setCurExpand] = useState();
  const [funding, setFunding] = useState(null)

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");


  const fetchRegistrations = async () => {
    let url = URL + `/registrations`;
    const response = await fetch(url);
    const registrations = await response.json();
    console.log("Registrations", registrations);
    setRegistrations(registrations);

    url = URL + "/student";
    const studentsResponse = await fetch(url);
    const studentsData = await studentsResponse.json();
    setStudents(studentsData);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleChange = async (id, paid) => {
    const url = URL + `/registrations/${id}/${paid}`;
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

  const copyScholarshipLink = async () => {
    try {
      const response = await fetch(URL + '/token/scholarship/new/' + studentId.value + '/' + funding.value,);
      const data = await response.json();

      // Now you have the token in `data`, you can copy it to clipboard
      navigator.clipboard.writeText("localhost:3000/funding/" + data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
            The "Paid" column indicates how the enrollment has been paid for. Payment statuses are represented by different letters: "C" for card, "S" for scholarship, and "A" for AFU. You can identify the payment method by looking at the respective letter in each row.







          </p>
          <p>
            Additionally, you can track the progress of each course, seeing how
            many classes are completed, booked, and pending respectively.
          </p>
          <h4 style={{ color: "#333", marginBottom: "10px" }}>
            Select student
          </h4>


          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="color"
            value={studentId}
            onChange={setStudentId}
            options={students.map((student) => ({
              value: student._id,
              label: student._name,
              guardian: student._guardian,
            }))}
            formatOptionLabel={({ label, guardian }) => (
              <div>
                <div>{label}</div>
                <small
                  style={{ fontSize: "0.8em", color: "gray" }}
                >{`Guardian: ${guardian}`}</small>
              </div>
            )}
          />

          <h4 style={{ color: "#333", marginBottom: "10px" }}>
            Select Funding
          </h4>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="color"
            styles={{ marginTop: '10px' }}
            value={funding}
            onChange={setFunding}
            options={[
              { value: 'scholarship', label: 'Scholarship' },
              { value: 'afu', label: 'AFU' }
            ]}
          />
          <button
            disabled={!studentId || funding === null}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: (studentId && funding !== null) ? '#007BFF' : '#6c757d', // '#6c757d' is a common grey
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: (studentId && funding !== null) ? 'pointer' : 'default',
              fontSize: '16px',
              transition: 'all 0.3s ease'
            }}
            onClick={copyScholarshipLink}
          >          Copy Single-Use Link
          </button>


        </div >
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
    </MainContentLayout >
  );
};

export default Registrations;
