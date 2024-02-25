import React, { useEffect, useState, useCallback, useRef } from 'react';
import Modal from 'react-modal';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { FaFilter } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';

import Instructions from '../Instructions';
import FileUpload from '../FileUpload';
import LearningGoals from '../LearningGoals';


import { FaRedo } from 'react-icons/fa';

export const AddCourseModal = ({ showModal, handleCloseModal, courses }) => {
    const [step, setStep] = useState(1);
    const [firstEdit, setFirstEdit] = useState(true)
    console.log("Courses are ", courses)
    const [checkedCourses, setCheckedCourses] = useState([])

    const [courseId, setCourseId] = useState(null)

    const [uploadedFiles, setUploadedFiles] = useState([])
    const createCourse = async e => {
        e.preventDefault()
        let difficulty;
        switch (selectedIndex) {
            case 1:
                difficulty = 'Beginner';
                break;
            case 2:
                difficulty = 'Intermediate';
                break;
            case 3:
                difficulty = 'Advanced';
                break;
            default:
                difficulty = 'Beginner';
                break;
        }

        let learning_goals = learningGoals.split("\n").map(val => val.trim()).filter(val => val.length > 0);

        const body = {
            name: formValues.name,
            age: formValues.age,
            description: formValues.description,
            color: formValues.color,
            prerequisites: formValues.prerequisites,
            image: formValues.image,
            info_page: html,
            files: uploadedFiles,
            learning_goals: learning_goals,
            difficulty: difficulty,
        }
        // const body = JSON.stringify(formValues)
        // body["color"] = formValues.color

        const URL = "http://localhost:8080/course"
        try {
            const response = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setCourseId(data.course_id)
            handleNextStep(e)
        } catch (error) {
            console.error('There has been a problem with creating this course', error);
            alert(error)
        }
    }
    const [tutors, setTutors] = useState([])
    const [courseMap, setCourseMap] = useState([])
    const [allTutors, setAllTutors] = useState([])
    const loadTutors = async () => {

        let url = "http://localhost:8080/course/tutor"

        let response = await fetch(url);
        const map = await response.json();
        setCourseMap(map)

        console.log(map)

        url = "http://localhost:8080/tutors"
        response = await fetch(url)
        const tutors = await response.json()
        console.log(tutors)
        setAllTutors(tutors)
        setTutors(tutors)


    }

    useEffect(() => {
        if (step === 4) {
            loadTutors()
        }
    }, [step])

    const handleStep2Submit = async e => {
        e.preventDefault()

        if (!files?.length) return

        const formData = new FormData()

        files.forEach((file, index) => formData.append('images', file));
        const URL = "http://localhost:8080/upload/all"
        const data = await fetch(URL, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
        console.log(data.imageUrls)
        const transformedData = Object.entries(data.imageUrls).map(([name, url]) => {
            return { name, url };
        });
        setUploadedFiles(transformedData)
        console.log(transformedData);
    }

    const [selectedIndex, setSelectedIndex] = useState(null);
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }
    })
    const handleReset = () => {
        setTutors(allTutors)
        setCheckedCourses([])
        setSearchInput('');
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '*',
        maxSize: 1024 * 13000,
        onDrop
    })
    const handleNextStep = (event) => {
        // event.preventDefault();
        console.log(formValues)
        console.log(selectedIndex)

        setStep(step + 1);
    };

    const handleBack = (event) => {
        // event.preventDefault();
        setStep(step - 1);
    };



    const handleMouseOver = (index) => {
        setSelectedIndex(index);
    };

    const handleMouseOut = () => {
        setSelectedIndex(null);
    };

    const [learningGoals, setLearningGoals] = useState('');
    let trimmedValues = learningGoals.split("\n").map(val => val.trim()).filter(val => val.length > 0);
    let listItems = trimmedValues.map(val => `<li>${val}</li>`).join('');
    let contentState = stateFromHTML(`<ul>${listItems}</ul><h1>Hello</h1>`);

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));

    const handleLearningGoalsChange = (event) => {
        let value = event.target.value;
        setLearningGoals(event.target.value);
    };

    const getContentState = () => {
        let trimmedValues = learningGoals.split("\n").map(val => val.trim()).filter(val => val.length > 0);
        let listItems = trimmedValues.map(val => `<li>${val}</li>`).join('');
        let contentState = stateFromHTML(`<h1> Course Title </h1> <h4> Learning Goals <h4> <ul>${listItems}</ul>`);
        return contentState

    }

    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert Draft.js editor content to HTML
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = rawContentState.blocks.map(block => {
            return `<p>${block.text}</p>`;
        }).join('');

        // Here you can use 'learningGoals' and 'htmlContent' as needed
        console.log('Learning Goals:', learningGoals);
        console.log('Instructions HTML:', htmlContent);

        // Proceed to the next step
        handleNextStep();
    };

    // const [filteredTutors, setFilteredTutors] = useState(tutors)
    const [subsetTutors, setSubsetTutors] = useState(tutors)
    const [fileNames, setFileNames] = useState([]);
    const [rejected, setRejected] = useState([])

    const [files, setFiles] = useState([])
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {

        setFilteredTutors(tutors.filter(tutor => tutor.tutor_name.toLowerCase().includes(searchInput.toLowerCase())));

    }, [searchInput, tutors])
    //   const tutors = ['Tutor 1', 'Tutor 2', 'Tutor 3'];

    const [filteredTutors, setFilteredTutors] = useState(tutors)
    // const filteredTutors = tutors.filter(tutor => tutor.tutor_name.toLowerCase().includes(searchInput.toLowerCase()));
    // 


    const handleFileUpload = (event) => {
        const names = Array.from(event.target.files).map(file => file.name);
        setFileNames(prevNames => [...prevNames, ...names]);
    };

    // const handleDelete = (name) => {
    //     setFileNames(fileNames.filter(fileName => fileName !== name));
    // };

    const handleDelete = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (step === 3 && firstEdit) {
            let trimmedValues = learningGoals.split("\n").map(val => val.trim()).filter(val => val.length > 0);
            let listItems = trimmedValues.map(val => `<li>${val}</li>`).join('');
            let contentState = stateFromHTML(`<h1> ${formValues.name} </h1>
        <h4> Learning Goals </h4>
        
        <ul>${listItems}</ul>`);
            setEditorState(EditorState.createWithContent(contentState));
            setFirstEdit(false)
        }
    }, [step, learningGoals, firstEdit]);
    const getEditorState = () => {
        if (firstEdit) {
            return EditorState.createWithContent(contentState)
        } else {
            return editorState
        }

    }

    const [formValues, setFormValues] = useState({
        image: null,
        name: '',
        age: '',
        color: '#fff',
        prerequisites: '',
        description: '',
    });
    useEffect(() => {
        console.log("Checked courses updated")
        setSearchInput('');

        let filteringTutors = tutors;
        const checkedCourseIds = Object.keys(checkedCourses).filter(course_id => checkedCourses[course_id]);

        console.log("Checked course Ids", checkedCourseIds)
        if (checkedCourseIds.length > 0) {
            filteringTutors = allTutors.filter(tutor => {
                const tutorCourses = courseMap.find(item => item.tutor_id === tutor.tutor_id)?.course_ids || [];
                return checkedCourseIds.some(course_id => tutorCourses.includes(Number(course_id)));
            });
        } else {
            console.log("In else block")
            filteringTutors = allTutors
        }

        console.log("Resulting Tutors is ", filteringTutors)
        setTutors(filteringTutors)
    }, [checkedCourses, allTutors]);




    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };
    const filterDivRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (filterDivRef.current && !filterDivRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }

        const uuid = uuidv4(); // Generate a UUID
        const modifiedFileName = `${uuid}_${selectedFile.name}`;

        const formData = new FormData();
        formData.append('image', selectedFile, modifiedFileName);

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                // Assuming the server responds with the uploaded image URL
                const uploadedImageUrl = data.imageUrl;
                setFormValues({
                    ...formValues,
                    image: uploadedImageUrl,
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    };
    const [html, setHTML] = useState(null)

    const addTutors = async (e) => {
        e.preventDefault()
        let url = "http://localhost:8080/course/tutors"
        const tutorIds = Object.keys(checkedTutors).filter(tutor_id => checkedTutors[tutor_id]);

        const body = {
            course_id: courseId,
            tutor_ids: tutorIds
        }

        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // const response = await data.json()
        if (data.ok) {
            setStep(1)
            setCourseId(null)
            handleCloseModal(e)
        } else {
            alert("There was an error adding tutors")

        }
    }


    const [selectAll, setSelectAll] = useState(false);
    const [checkedTutors, setCheckedTutors] = useState({});
    const [hoveredIndex, setHoveredIndex] = useState(null)
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '80%',
                    maxWidth: '800px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <div style={{ width: '90%', height: '20px', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        width: `${(step / 4) * 100}%`,
                        backgroundColor: '#103da2',
                        borderRadius: '5px',
                        transition: 'width 0.5s ease-in-out', // Optional: Add smooth transition
                    }}
                ></div>
            </div>

            <button
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#666',
                    cursor: 'pointer'
                }}
                onClick={handleCloseModal}
            >
                &times;
            </button>
            {step === 1 ? (
                // Your existing form goes here
                <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>         <h2 style={{ color: '#103da2', marginBottom: '20px' }}>{'Add a New Course'}</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ color: '#103da2', marginBottom: '10px' }}>
                            <span style={{ display: 'block', marginBottom: '5px' }}>Banner Upload:</span>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px' }}
                            />
                        </label>
                        {formValues.image && <img src={formValues.image} style={{ width: '90px', height: 'auto', borderRadius: '10px', marginLeft: '10px' }} />}    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label style={{ color: '#103da2', marginBottom: '10px' }}>
                                <span style={{ display: 'block', marginBottom: '5px' }}>Name:</span>
                                <input type="text" name="name" value={formValues.name} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px' }} />
                            </label>
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                            <label style={{ color: '#103da2', marginBottom: '10px' }}>
                                <span style={{ display: 'block', marginBottom: '5px' }}>Difficulty:</span>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {[1, 2, 3].map((index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            fill={
                                                index <= hoveredIndex
                                                    ? '#00B0F1' // color when hovered
                                                    : index <= selectedIndex
                                                        ? '#00B0F1' // color when selected
                                                        : 'none' // default color
                                            }
                                            style={{ cursor: 'pointer', marginRight: '5px' }}
                                            onMouseOver={() => {
                                                setHoveredIndex(index);
                                            }}
                                            onMouseOut={() => {
                                                setHoveredIndex(null);
                                            }}
                                            onClick={() => {
                                                handleMouseOver(index);
                                            }}
                                        >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="lightgrey" />
                                        </svg>
                                    ))}
                                </div>


                            </label>
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                            <label style={{ color: '#103da2', marginBottom: '10px' }}>
                                <span style={{ display: 'block', marginBottom: '5px' }}>Color:</span>
                                <input type="color" name="color" value={formValues.color} onChange={handleInputChange}

                                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px', backgroundColor: `${formValues.color}` }} />
                            </label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label style={{ color: '#103da2', marginBottom: '10px' }}>
                                <span style={{ display: 'block', marginBottom: '5px' }}>Target Age:</span>
                                <input type="text" name="age" value={formValues.age} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px' }} />
                            </label>
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                            <label style={{ color: '#103da2', marginBottom: '10px' }}>
                                <span style={{ display: 'block', marginBottom: '5px' }}>Pre-Requisites:</span>
                                <input type="text" name="prerequisites" value={formValues.prerequisites} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px' }} />
                            </label>
                        </div>
                    </div>
                    <label style={{ color: '#103da2', marginBottom: '10px' }}>
                        <span style={{ display: 'block', marginBottom: '5px' }}>Description:</span>
                        <textarea name="description" value={formValues.description} onChange={handleInputChange} rows="4" style={{ padding: '10px', maxHeight: '200px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '14px', width: '100%' }}></textarea>
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#ccc',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                                marginRight: '10px',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleNextStep}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                            }}
                        >
                            Next
                        </button>
                    </div>
                    {/* <button type="submit">Next</button> */}
                </form>
            ) : step === 2 ? (
                // Your step 2 content goes here
                <>
                    <h2>{`Step 2: Add Learning Goals and Files`}</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <LearningGoals learningGoals={learningGoals} handleLearningGoalsChange={handleLearningGoalsChange} />
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                            <FileUpload getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} files={files} handleDelete={handleDelete} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button
                            onClick={handleBack}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={(e) => {
                                handleStep2Submit(e)
                                handleNextStep(e)
                            }
                            }
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                            }}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : step === 3 ? (
                <>
                    <Instructions title="Test Title" editorState={editorState} handleEditorStateChange={handleEditorStateChange} />


                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button
                            // type="button"
                            onClick={handleBack}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                            }}
                        >
                            Back
                        </button>
                        <button
                            // type="submit"
                            onClick={(e) => {

                                // Get the current content of the editor
                                const contentState = editorState.getCurrentContent();

                                // Convert the content state to raw JS
                                const rawContent = convertToRaw(contentState);

                                // Convert the raw JS to HTML
                                const html = draftToHtml(rawContent);

                                console.log(html);
                                setHTML(html)
                                createCourse(e)
                            }}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                fontSize: '14px',
                            }}
                        >
                            {'Create'}
                        </button>
                    </div>
                </>
            ) :
                (

                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
                        <h2 style={{ color: '#103da2' }}>Select Tutors</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label
                                onClick={() => {
                                    const newCheckedTutors = {};
                                    filteredTutors.forEach(tutor => {
                                        newCheckedTutors[tutor.tutor_id] = !selectAll;
                                    });
                                    setCheckedTutors(newCheckedTutors);
                                    setSelectAll(!selectAll);
                                }}
                                style={{ color: selectAll ? '#103da2' : 'grey', cursor: 'pointer', fontWeight: 'bold' }}                            >
                                Select All
                            </label>
                            <p style={{ margin: '0', padding: '0', fontSize: '14px', color: '#103da2' }}>{Object.values(checkedTutors).filter(Boolean).length} selected</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flex: 1, marginRight: '10px', fontSize: '14px' }}
                            />                        <div style={{ position: 'relative' }}>
                                <FaFilter onClick={() => setShowFilters(!showFilters)} style={{ cursor: 'pointer' }} />
                                {showFilters && (
                                    <div
                                        ref={filterDivRef}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            backgroundColor: '#fff',
                                            width: '250px',
                                            maxHeight: '100px',
                                            overflowY: 'auto',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            padding: '10px',
                                            fontSize: '14px'
                                        }}


                                    >
                                        {courses.map((option, index) => (
                                            <div key={index}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={option.course_id}
                                                        checked={checkedCourses[option.course_id] || false}
                                                        onChange={() => {
                                                            setCheckedCourses({ ...checkedCourses, [option.course_id]: !checkedCourses[option.course_id] });
                                                        }}
                                                    />
                                                    {option.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FaRedo onClick={handleReset} style={{ cursor: 'pointer', marginLeft: '5px' }} />

                            </div>
                        </div>

                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            {filteredTutors.map((tutor, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    <label style={{ fontSize: '14px' }}>
                                        <input
                                            type="checkbox"
                                            value={tutor.tutor_id}
                                            checked={checkedTutors[tutor.tutor_id] || false}
                                            onChange={() => {
                                                setCheckedTutors({ ...checkedTutors, [tutor.tutor_id]: !checkedTutors[tutor.tutor_id] });
                                            }}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {tutor.tutor_name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <div style={{ flexGrow: 1 }}></div>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    addTutors(e)
                                }}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007BFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    fontSize: '14px',
                                }}
                            >
                                {`Add Tutors`}
                            </button>
                        </div>
                    </div>
                )}
        </Modal>
    );
};
