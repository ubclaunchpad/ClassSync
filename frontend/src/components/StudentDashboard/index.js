import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addDays, endOfWeek, startOfWeek } from 'date-fns';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { faL } from '@fortawesome/free-solid-svg-icons';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';
const URL = process.env.REACT_APP_API_URL


const Course = (props) => {
    const [lessons, setLessons] = useState([]);
    const [loaded, setLoaded] = useState(false)

    const fetchData = async () => {
        const url = URL + `/availability/bookings?id=${props.id}`;
        const bookingsResponse = await fetch(url);
        const bookingsData = await bookingsResponse.json();
        console.log("Bookings Data", bookingsData);
        // Fetch course details here

        let appointments = [];

        for (let booking of bookingsData.bookings) {
            console.log("Booking is ", booking)
            let bookingDate = new Date(booking.start_time);
            let editDate = addDays(new Date(), 2);


            appointments.push({
                id: booking.booking_id,
                start: new Date(booking.start_time),
                time: bookingDate.getHours().toString().padStart(2, '0') + ':' + bookingDate.getMinutes().toString().padStart(2, '0'),
                readOnly: bookingDate <= editDate

            });
        }
        appointments.sort((a, b) => a.start - b.start);
        setLessons(appointments)
        setLoaded(true)

    };

    useEffect(() => {




        fetchData();


    }, [props.id]);

    const deleteEvent = async (event) => {

        const response = await fetch(URL + `/availability/booking?id=${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log("Deleted booking");

            const selectedTime = event.start.toTimeString().split(' ')[0].substring(0, 5);
            const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000).toTimeString().split(' ')[0].substring(0, 5);
            const times = [selectedTime, thirtyMinsLater];

            let body = JSON.stringify({
                tutor_id: localStorage.getItem('userID'),
                start_date: startOfWeek(event.start).toISOString().split('T')[0],
                end_date: endOfWeek(event.start).toISOString().split('T')[0],
                day: event.start.getDay(),
                times: times
            });

            console.log("Body is ", body)

            let url = URL + "/availability/add"

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            });

            if (response.ok) {
                console.log("Added availability");
                fetchData();

            } else {

                console.log("Error adding availability");
            }


        } else {
            // setBookingError("Failed to delete session")
        }

    }



    return (
        <div>
            <Accordion id={props.id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${props.id}-header`}
                >
                    <Typography style={{ flexGrow: 1 }}>{props.title}</Typography>
                    {loaded && lessons.length < 5 && (
                        <button
                            style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                margin: '0 10px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontFamily: 'Arial, sans-serif',
                                alignSelf: 'center'
                            }}
                            onClick={() => window.location.href = `/appointment/${props.id}`}
                        >
                            Book
                        </button>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0px', fontFamily: 'Arial, sans-serif' }}>
                        <table style={{
                            width: '100%',
                            marginTop: '10px',
                            textAlign: 'center',
                            borderCollapse: 'collapse',
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #ddd',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <tbody>
                                {lessons.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{
                                            padding: '10px',
                                            fontSize: '16px',
                                            color: '#333',
                                            textAlign: 'center'
                                        }}>
                                            No classes booked yet
                                        </td>
                                    </tr>
                                ) : (
                                    lessons.map((appointment, index) => (
                                        <tr key={index} style={{
                                            borderBottom: '1px solid #ddd'
                                        }}>
                                            <td style={{
                                                padding: '10px',
                                                fontSize: '16px',
                                                color: '#333'
                                            }}>
                                                {new Date(appointment.start).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                            </td>
                                            <td style={{
                                                padding: '10px',
                                                fontSize: '16px',
                                                color: '#333'
                                            }}>
                                                {appointment.time}
                                            </td>
                                            <td style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {!appointment.readOnly &&
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                            fontFamily: 'Arial, sans-serif',
                                                            fontSize: '16px',
                                                            padding: '5px 10px',
                                                            backgroundColor: 'transparent',
                                                            color: '#fff'
                                                        }}
                                                        onClick={() => deleteEvent(appointment)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                            <path d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                        </svg>
                                                    </button>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default Course;