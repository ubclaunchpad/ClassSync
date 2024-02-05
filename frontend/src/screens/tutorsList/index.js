import './index.css';
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import React, { useState, useEffect } from 'react';


const TutorsList = () => {
    const [tutors, setTutors] = useState(null);

    const fetchData = async () => {
        try {
            let url = "http://localhost:8080/tutors"
            const teacherListResponse = await fetch(url);
            // console.log("Tutors Response", teacherListResponse);

            const teacherListData = await teacherListResponse.json();
            // console.log("Tutors Data", teacherListResponse);
            setTutors(teacherListData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // return (

    //     <ParentDashboardLayout>

    //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //             <h2>All Tutors</h2>
    //             {tutors && tutors.map((tutor, index) => (
    //                 <div key={index}
    //                     style={{
    //                         display: 'flex',
    //                         flexDirection: 'row',
    //                         width: '80%',
    //                         alignItems: 'center',
    //                         justifyContent: 'space-between',
    //                         marginBottom: '20px',
    //                         border: '1px solid #ddd',
    //                         borderRadius: '10px',
    //                         padding: '20px',
    //                         boxSizing: 'border-box',
    //                         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    //                         backgroundColor: '#f9f9f9',
    //                     }}>
    //                     <img src='https://images.squarespace-cdn.com/content/v1/63b64f0411726e490366a3cb/1672892283063-R28O2XMQOO9VTVXFVAKM/class_covers_WEBSITE-Scratch-Bg-.jpg?format=1000w' alt="tutorPicture" style={{ width: '240px', height: '160px', marginRight: '20px', borderRadius: '10px' }} />
    //                     <div style={{ flex: 1 }}>
    //                         <h3 style={{ color: '#103DA2', marginBottom: '10px' }}>{tutor.f_name} {tutor.l_name}</h3>
    //                         <p style={{ color: 'grey', marginBottom: '10px' }}>{tutor.bio}</p>
    //                     </div>
    //                 </div>

    //             ))}
    //         </div>
    //     </ParentDashboardLayout>
    // );


    return (
        <TutorDashboardLayout
            smallText="Admin Dashboard"
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <h3>List of all Tutors</h3>

                    <p>This dashboard allows administrators to manage student enrollments. View and sort enrollments by clicking on column headers.</p>
                    <p>The "Paid" column indicates whether the enrollment has been paid for. You can toggle the payment status by clicking on the respective button in each row.</p>

                    <p>
                        Additionally, you can track the progress of each course, seeing how many classes are completed, booked, and pending respectively.
                    </p>                </div>
            }>
            

            <table style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>First Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>Last Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>Bio</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}></th>

                    </tr>
                </thead>
                <tbody>
                    {tutors && tutors.map((data, index) => (
                        <tr key={data.tutor_id} style={{ borderBottom: '1px solid #ddd', backgroundColor: data.paid ? '#e6ffe6' : 'inherit' }}>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.tutor_id}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.f_name}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.l_name}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.bio}</td>
                            <td style={{ padding: '10px', textAlign: 'centre' }}>
                                <button style={{ alignContent:'center', padding: '10px', backgroundColor: '#0091e6', border: '1px solid #ddd', borderRadius: '8px',textAlign:'center', width: '100px', color:'white', fontWeight:'bold' }}
                                 onClick={null}>See More</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TutorDashboardLayout>
    );
}
export default TutorsList;