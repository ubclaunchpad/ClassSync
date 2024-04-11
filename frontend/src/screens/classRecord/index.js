import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
} from "@material-ui/core";
import { MainContentLayout } from "../../components/MainContentLayout";

const ClassRecordForm = () => {
  const [learningGoals, setLearningGoals] = useState([]);
  const [selectedTab, setSelectedTab] = useState(2);
  const [fileList, setFileList] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  const handleCheckboxChange = (goal) => {
    // Toggle the checked state of the clicked learning goal
    setLearningGoals((prevGoals) => {
      if (prevGoals.includes(goal)) {
        return prevGoals.filter((g) => g !== goal);
      } else {
        return [...prevGoals, goal];
      }
    });
  };

  const [goals, setGoals] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [reloadFiles, setReloadFiles] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/class?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setClassInfo(data);
      })
      .catch((error) => console.error("Error:", error));

    fetch(`http://localhost:8080/booking/notes?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setClassDetails(data);
        setSelectedTab(data.length - 1);
        console.log("Loading ", data);
        setNotes(data[data.length - 1].notes);
      })
      .catch((error) => console.error("Error:", error));

    fetch(`http://localhost:8080/learninggoals?id=${id}`)
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error:", error));

    fetch(`http://localhost:8080/course/files?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFileList(data);
        console.log("Files loaded");
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileIcons = {
    pdf: "📄",
    doc: "📃",
    jpg: "🖼️",
    png: "🖼️",
    jpeg: "🖼️",
    mp4: "📹",
    pptx: "📊",
    default: "📎",
  };

  const handleSingleFileDownload = async (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Call a local API to get shared files
    const getSharedFiles = async () => {
      const response = await fetch(
        `http://localhost:8080/sharedFiles?id=${id}`
      );
      const data = await response.json();
      console.log("Shared files are ", data);
      setSharedFiles(data);
    };

    getSharedFiles();
  }, [reloadFiles]);

  const handleFileShare = async () => {
    try {
      const response = await fetch("http://localhost:8080/booking/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, files: selectedFiles }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setReloadFiles(reloadFiles + 1);
      console.log("Files shared successfully");
    } catch (error) {
      console.error("Error sharing files:", error);
    }
  };

  const handleFileDownload = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);

      // Use setTimeout to delay the click event
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
      }, i * 1000); // 2000ms delay between each download
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFiles((prevFiles) => {
      if (prevFiles.some((prevFile) => prevFile.name === file.name)) {
        console.log(
          "Selected files are ",
          prevFiles.filter((prevFile) => prevFile.name !== file.name)
        );
        return prevFiles.filter((prevFile) => prevFile.name !== file.name);
      } else {
        console.log("Selected files are ", [...prevFiles, file]);
        return [...prevFiles, file];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.length == 0) {
      setSelectedFiles(fileList);
    } else {
      setSelectedFiles([]);
    }
  };
  const [notes, setNotes] = useState({});

  const [saveText, setSaveText] = useState("Save");

  const handleSave = async () => {
    const completedGoalIndices = goals.reduce((indices, goal, index) => {
      if (goal.completed) {
        indices.push(index);
      }
      return indices;
    }, []);

    let data = {
      enrollment_id: classInfo.enrollment_id,
      completed: completedGoalIndices,
      booking_id: id,
      notes: JSON.stringify(notes),
    };

    console.log("Saving data ", data);
    try {
      let response = await fetch("http://localhost:8080/classInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSaveText("Saved");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MainContentLayout rightColumnContent={  <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "4px",
          padding: "10px",
          width: "95%", // Change the width to 100% or any desired width
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          background: "white",
          color: "#003a8c",
          fontFamily: "Arial, sans-serif",
          transition: "all 0.3s ease",
          cursor: "pointer",
          margin: "20px 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row", // Change the flexDirection to row
          alignItems: "flex-start", // Change alignItems to flex-start
          flexWrap: "wrap", // Add flexWrap to wrap
        }}
      >
        <div
          style={{
            backgroundColor: "#103da2",
            borderRadius: "4px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "0",
            marginRight: "0",
          }}
        >
          <h3 style={{ margin: "10px 0", color: "white" }}>
            {classInfo.course}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <strong>
            <svg
              style={{ marginRight: "10px" }}
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
          </strong>
          {classInfo.start_time != null &&
            new Date(classInfo.start_time).toLocaleString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "50%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <strong>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                </svg>
              </strong>
              {classInfo.student}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <strong>
                {" "}
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              </strong>{" "}
              1 hour
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <svg
                style={{ marginRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <rect fill="none" height="24" width="24" />
                <g>
                  <path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z" />
                </g>
              </svg>
              <a
                href={`https://${classInfo.link}`}
                style={{ marginRight: "10px" }}
              >
                Meeting Link
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <svg
                style={{ marginRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
              </svg>
              <a href={`/course/${classInfo.course_id}`}>Lesson Plan</a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "20px",
            marginTop: "5px",
            minWidth: "100%",
          }}
        >
          {Array.from({ length: classDetails.length - 1 }).map(
            (_, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: "#103da2",
                  borderRight: "1px solid white",
                }}
              ></div>
            )
          )}
          <div
            style={{
              flex: 1,
              backgroundColor: "#00B0F1",
              borderRight: "1px solid white",
            }}
          ></div>
          {Array.from({ length: 5 - classDetails.length }).map(
            (_, index) => (
              <div
                key={index + classDetails.length}
                style={{
                  flex: 1,
                  backgroundColor: "lightgrey",
                  borderRight: "1px solid white",
                }}
              ></div>
            )
          )}
        </div>
      </div>

      {/* Below - Green Div */}
      <div
        style={{
          padding: "10px",
          width: "95%",
          backgroundColor: "white",
          maxHeight: "550px",

          borderRadius: "4px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h4
          style={{
            fontSize: "18px",
            marginBottom: "15px",
            color: "#103da2",
            marginTop: "0px",
          }}
        >
          Tutor Resource Files
        </h4>
        <div>
          <p style={{ fontSize: "0.9em", color: "#555" }}>
            This is a collection of all the files available for the tutor to
            use during the session. Tutors can select any files they find
            useful and share them directly with the students using the
            "Share" button.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={
                fileList != null && selectedFiles.length === fileList.length
              }
              onChange={handleSelectAll}
              style={{ marginRight: "10px" }}
            />
            {selectedFiles.length === 0 &&
            (!sharedFiles || sharedFiles.length === 0) ? (
              <button
                style={{
                  marginRight: "auto",
                  marginLeft: "5px",
                  backgroundColor: "#d3d3d3",
                  border: "none",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  color: "#fff",
                }}
                disabled
              >
                Share
              </button>
            ) : (
              <button
                onClick={handleFileShare}
                style={{
                  marginRight: "auto",
                  marginLeft: "5px",
                  backgroundColor: "#1890ff",
                  border: "none",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  color: "#fff",
                }}
              >
                {selectedFiles.length > 0 ? "Share" : "Unshare All"}
              </button>
            )}{" "}
            <button
              onClick={handleFileDownload}
              style={{
                backgroundColor:
                  selectedFiles.length < 2 ? "#d3d3d3" : "#1890ff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                color: "#fff",
                cursor:
                  selectedFiles.length < 2 ? "not-allowed" : "pointer",
              }}
              disabled={selectedFiles.length < 2}
            >
              Download
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {fileList != null &&
              fileList.length > 0 &&
              fileList.map((file) => (
                <li
                  key={file.name}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "left",
                    textAlign: "left",
                    cursor: "pointer",
                    backgroundColor: "#e6f7ff",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFiles.some(
                      (selectedFile) => selectedFile.name === file.name
                    )}
                    onChange={() => handleFileSelect(file)}
                    style={{ marginRight: "8px" }}
                  />
                  <span>
                    <div
                      key={JSON.stringify(sharedFiles)}
                      style={{ display: "inline-block" }}
                    >
                      {sharedFiles != null &&
                        sharedFiles.length > 0 &&
                        sharedFiles.some(
                          (selectedFile) => selectedFile.name === file.name
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enable-background="new 0 0 24 24"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <g>
                              <rect fill="none" height="24" width="24" />
                            </g>
                            <g>
                              <g />
                              <g>
                                <g>
                                  <path
                                    d="M16.67,13.13C18.04,14.06,19,15.32,19,17v3h4v-3 C23,14.82,19.43,13.53,16.67,13.13z"
                                    fill-rule="evenodd"
                                  />
                                </g>
                                <g>
                                  <circle
                                    cx="9"
                                    cy="8"
                                    fill-rule="evenodd"
                                    r="4"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="M15,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4c-0.47,0-0.91,0.1-1.33,0.24 C14.5,5.27,15,6.58,15,8s-0.5,2.73-1.33,3.76C14.09,11.9,14.53,12,15,12z"
                                    fill-rule="evenodd"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="M9,13c-2.67,0-8,1.34-8,4v3h16v-3C17,14.34,11.67,13,9,13z"
                                    fill-rule="evenodd"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                        )}
                    </div>
                    {fileIcons[file.name.split(".").pop()] ||
                      fileIcons.default}
                  </span>
                  <span
                    style={{
                      marginLeft: "8px",
                      textDecoration: "none", // Remove the underline
                      color: "rgb(16, 61, 162)", // Darken the color for better visibility
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = "underline";
                    }} // Add underline on hover
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = "none";
                    }} // Remove underline when not hovering
                    onClick={() => {
                      handleSingleFileDownload(file);
                    }}
                  >
                    {file.name}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>}>
      <div style={{ display: "flex"}}>
    

        {/* To the right - Red Div */}
        <div
          style={{
            // backgroundColor: "#f0f8ff",
            flex: "3",
            alignItems: "flex-start",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Card>
            {/* <CardHeader title="Pill Buttons Card" /> */}
            <CardContent>
              <Tabs
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
                TabIndicatorProps={{ style: { background: "#103da2" } }}
                textColor="inherit"
                variant="fullWidth"
              >
                {classDetails.length > 0 &&
                  [...Array(classDetails.length)].map((_, index) => (
                    <Tab
                      key={index}
                      label={`Class ${index + 1}`}
                      value={index}
                      style={{
                        backgroundColor:
                          selectedTab === index ? "#86d3ff" : "#103da2",
                        color: selectedTab === index ? "#000" : "#fff",
                        opacity: 1, // Set opacity to 1
                      }}
                    />
                  ))}
              </Tabs>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%", // Adjust as needed
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "45%", // Adjust as needed
                  }}
                >
                  <h3 style={{ color: "#103da2", marginBottom: "10px" }}>
                    Learning Goals
                  </h3>
                  {goals.map((goal, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "left",
                        backgroundColor: "#ffffff",
                        marginBottom: "5px",
                      }}
                    >
                      <div className="round" style={{ marginRight: "10px" }}>
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          checked={goal.completed}
                          onChange={() => {
                            setSaveText("Save");
                            const newGoals = [...goals];
                            newGoals[index].completed =
                              !newGoals[index].completed;
                            setGoals(newGoals);
                          }}
                        />{" "}
                        <label htmlFor={`checkbox-${index}`}></label>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ fontSize: "16px" }}>{goal.goal}</label>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedTab ==
                (classDetails.length > 0 ? classDetails.length - 1 : 0) ? (
                  <form
                    noValidate
                    autoComplete="off"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "left",
                      width: "45%",
                    }}
                  >
                    <div style={{ width: "100%", maxWidth: "600px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#103da2",
                          marginBottom: "20px",
                        }}
                      >
                        <p style={{ marginBottom: "0" }}>
                          Tutor: {classInfo.tutor}
                        </p>{" "}
                        {/* Replace with actual tutor name */}
                        <p style={{ marginBottom: "0" }}>
                          {" "}
                          {new Date(classInfo.start_time).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>{" "}
                        {/* Replace with actual date */}
                      </div>
                      {classDetails.length > 0 &&
                        Object.entries(classDetails[selectedTab].notes).map(
                          ([key, value], index) => (
                            <div key={index}>
                              <p>{key}</p>
                              <TextField
                                id={`outlined-multiline-flexible-${index}`}
                                multiline
                                rowsMax={4}
                                variant="outlined"
                                style={{ width: "100%", marginBottom: "20px" }}
                                defaultValue={value}
                                onChange={(event) => {
                                  setSaveText("Save");
                                  setNotes((prevNotes) => ({
                                    ...prevNotes,
                                    [key]: event.target.value,
                                  }));
                                }}
                              />
                            </div>
                          )
                        )}
                    </div>
                    <Button
                      variant="contained"
                      color={saveText === "Saved" ? "secondary" : "primary"}
                      style={{ marginTop: "20px" }}
                      onClick={() => {
                        setSaveText("Saving..");
                        handleSave();
                      }}
                    >
                      {saveText}
                    </Button>
                  </form>
                ) : (
                  <div style={{ width: "45%", maxWidth: "600px" }}>
                    <div
                      key={classDetails}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#103da2",
                        marginBottom: "20px",
                      }}
                    >
                      {classDetails[selectedTab] ? (
                        <>
                          <p style={{ marginBottom: "0" }}>
                            Tutor: {classDetails[selectedTab].tutor}
                          </p>
                          <p style={{ marginBottom: "0" }}>
                            {new Date(
                              classDetails[selectedTab].start_time
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      {classDetails.length > 0 &&
                        classDetails[selectedTab] &&
                        Object.entries(classDetails[selectedTab].notes).map(
                          ([key, value], index) => (
                            <div key={index}>
                              <p>{key}</p>
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "0px 10px",
                                  borderRadius: "4px",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                <p>{value}</p>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainContentLayout>
  );
};

export default ClassRecordForm;
