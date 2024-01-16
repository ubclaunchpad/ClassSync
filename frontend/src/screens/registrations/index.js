import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';

const Registrations = () => {

    const [registrations, setRegistrations] = useState([]);

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


    return (
        <TutorDashboardLayout>
            <div style={{ display: 'flex', marginTop: '20px', marginLeft: '70%' }}>
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

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Enrollment ID</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Guardian</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Student</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Course</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Registration Date</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Paid</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Progress</th>

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