import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Registrations = () => {

    const [registrations, setRegistrations] = useState([]);
    const [sortedByGuardian, setSortedByGuardian] = useState(false);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedByStudent, setSortedByStudent] = useState(false);
    const [sortedByCourse, setSortedByCourse] = useState(false);
    const [sortedByDate, setSortedByDate] = useState(false);
    const [sortedByPaid, setSortedByPaid] = useState(false);

    
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
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paid: paid })
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
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByGuardian(true);

        const sortedRegistrations = [...registrations];
        sortedRegistrations.sort((a, b) => {
            const guardianA = a.guardian.toLowerCase();
            const guardianB = b.guardian.toLowerCase();
            return newSortDirection === 'asc' ? guardianA.localeCompare(guardianB) : guardianB.localeCompare(guardianA);
        });
        setRegistrations(sortedRegistrations);
    }

    const handleByPaid = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByPaid(true);

        const sortedRegistrations = [...registrations];
        sortedRegistrations.sort((a, b) => {
            const paidA = Number(a.paid);
            const paidB = Number(b.paid);
            return newSortDirection === 'asc' ? paidA - paidB : paidB - paidA;
        });
        setRegistrations(sortedRegistrations);
    }

    const handleSortByStudent = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByStudent(true);

        const sortedRegistrations = [...registrations];
        sortedRegistrations.sort((a, b) => {
            const studentA = a.student.toLowerCase();
            const studentB = b.student.toLowerCase();
            return newSortDirection === 'asc' ? studentA.localeCompare(studentB) : studentB.localeCompare(studentA);
        });
        setRegistrations(sortedRegistrations);
    }
    const handleSortByCourse = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByCourse(true);

        const sortedRegistrations = [...registrations];
        sortedRegistrations.sort((a, b) => {
            const courseA = a.course.toLowerCase();
            const courseB = b.course.toLowerCase();
            return newSortDirection === 'asc' ? courseA.localeCompare(courseB) : courseB.localeCompare(courseA);
        });
        setRegistrations(sortedRegistrations);
    }

    const handleSortByDate = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByDate(true);

        const sortedRegistrations = [...registrations];
        sortedRegistrations.sort((a, b) => {
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);
            return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setRegistrations(sortedRegistrations);
    }

    return (
        <TutorDashboardLayout
            smallText="Admin Dashboard"
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <h3>Manage Student Enrollments</h3>

                    <p>This dashboard allows administrators to manage student enrollments. View and sort enrollments by clicking on column headers.</p>
                    <p>The "Paid" column indicates whether the enrollment has been paid for. You can toggle the payment status by clicking on the respective button in each row.</p>

                    <p>
                        Additionally, you can track the progress of each course, seeing how many classes are completed, booked, and pending respectively.
                    </p>                </div>
            }>
            <div style={{ display: 'flex', marginTop: '20px', marginLeft: '60%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'darkblue', marginRight: '5px', borderRadius: '3px' }} />
                    <div>Completed</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#86d3ff', marginRight: '5px', borderRadius: '3px' }} />
                    <div>Booked</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#9E9E9E', marginRight: '5px', borderRadius: '3px' }} />
                    <div>Pending</div>
                </div>
            </div>

            <table style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                        <th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByGuardian}
                        >
                            Guardian
                            {sortedByGuardian && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th><th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByStudent}
                        >
                            Student
                            {sortedByStudent && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByCourse}
                        >
                            Course
                            {sortedByCourse && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByDate}
                        >
                            Registration Date
                            {sortedByDate && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleByPaid}
                        >
                            Paid
                            {sortedByPaid && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th>                       <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Progress</th>

                    </tr>
                </thead>
                <tbody>
                    {registrations.map((data) => (
                        <tr key={data.enrollment_id} style={{ borderBottom: '1px solid #ddd', backgroundColor: data.paid ? '#e6ffe6' : 'inherit' }}>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.enrollment_id}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.guardian}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.student}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.course}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{new Date(data.registration_date).toLocaleDateString()}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>
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
                            </td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {[...Array(Math.min(data.completed, 5))].map((_, i) => (
                                        <div key={i} style={{ width: '20px', height: '20px', backgroundColor: 'darkblue', marginRight: '2px', borderRadius: '3px' }} />
                                    ))}
                                    {[...Array(Math.min(data.booked, 5 - data.completed))].map((_, i) => (
                                        <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#86d3ff', marginRight: '2px', borderRadius: '3px' }} />
                                    ))}
                                    {[...Array(Math.max(0, 5 - data.completed - data.booked))].map((_, i) => (
                                        <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#9E9E9E', marginRight: '2px', borderRadius: '3px' }} />

                                    ))}
                                </div>



                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </TutorDashboardLayout>
    );

}

export default Registrations;
