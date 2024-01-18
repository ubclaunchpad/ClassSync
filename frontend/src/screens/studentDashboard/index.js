import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import Course from '../../components/StudentDashboard'; // import the Course component
import { ParentDashboardLayout } from '../../components/ParentDashboardLayout';

const StudentDashboard = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/student/${id}/courses`);
                const data = await response.json();
                setCourses(data);
                console.log(data);
                if (data.length > 0) {
                    setSelectedEnrollmentId(data[0].enrollment_id);
                    setTitle(data[0].course_title);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    const handleTabClick = (enrollmentId, title) => {
        setSelectedEnrollmentId(enrollmentId);
        setTitle(title)
    };

    return (
        <ParentDashboardLayout>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>

                <h2 style={{ color: '#333', marginTop: '30px', textAlign: 'center' }}>Registered Courses</h2>
                <ul className="custom-tabs" style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'center' }}>
                    {courses.map(course => (
                        <li className="custom-tab-item" key={course.enrollment_id} style={{ margin: '0 10px' }}>
                            <a
                                className={`custom-tab-link ${selectedEnrollmentId === course.enrollment_id ? 'active' : ''}`}
                                href="#"
                                onClick={() => handleTabClick(course.enrollment_id, course.course_title)}
                                style={{ color: '#007BFF', textDecoration: 'none' }}
                            >
                                {course.course_title}
                            </a>
                        </li>
                    ))}
                </ul>

                {selectedEnrollmentId && <Course id={selectedEnrollmentId} title={title} />}
            </div>
        </ParentDashboardLayout>
    );
};

export default StudentDashboard;