import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar/Calendar";
import { startOfWeek, endOfWeek, addWeeks, isAfter, formatISO, addDays, set } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import "./index.css"; // Import your custom styles
import { MainContentLayout } from "../../components/MainContentLayout";
import { textAlign } from "@mui/system";
import { useNavigate } from "react-router-dom"
import ScheduleSelector from "../tutorAvailability";



const URL = process.env.REACT_APP_API_URL

export default function ScheduleSelectorRecurring() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [isRecurring, setIsRecurring] = useState(true)
    const [maxDate, setMaxDate] = useState(new Date());
    const userid = localStorage.getItem("userId");
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });
    const navigate = useNavigate()

    console.log(startDate);




    function getWeeks(startDate, maxDate) {
        const weeks = [];

        let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

        while (!isAfter(currentWeekStart, maxDate)) {
            const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });

            weeks.push({
                start_date: formatISO(currentWeekStart),
                end_date: formatISO(currentWeekEnd)
            });

            currentWeekStart = addWeeks(currentWeekStart, 1);
        }

        return weeks;
    }

    console.log("Weeks", getWeeks(new Date(new Date().getFullYear(), 0, 2), new Date(new Date().getFullYear(), 3, 1)));    // const startDate = startOfWeek(new Date(id), { weekStartsOn: 0 });


    async function handleSubmitCalendar(newSchedule, isRecurring) {
        console.log("Submitting Availability")


        try {
            const scheduleByDay = Array(7).fill().map(() => []);

            // Iterate over newSchedule
            for (const date of newSchedule) {
                // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
                const day = date.getDay();

                // Get the time as a string in the format "HH:MM"
                const time = date.toTimeString().split(' ')[0].substring(0, 5);

                // Add the time to the corresponding day's array
                scheduleByDay[day].push(time);
            }
            console.log("Submitting Availability")
            console.log(scheduleByDay);

            const availability = {
                0: scheduleByDay[0],
                1: scheduleByDay[1],
                2: scheduleByDay[2],
                3: scheduleByDay[3],
                4: scheduleByDay[4],
                5: scheduleByDay[5],
                6: scheduleByDay[6]
            };
            const response = await fetch(URL + "/tutor/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: localStorage.getItem("userId"),
                    isRecurring: true,
                    weeks: JSON.stringify(getWeeks(startDate, maxDate)),
                    availability: availability
                })
            });

            response.json().then((data) => {
                console.log(data);
            });

        } catch (e) {
            console.log("error");
        }
    }
    const today = new Date();
    const minDate = startOfWeek(today, { weekStartsOn: 0 });

    async function getDates() {
        const response = await fetch(URL + `/tutor/availability/dates?id=${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }


    const loadAvailability = async () => {
        const response = await fetch(URL + `/tutor/availability/recurring?userID=${userid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const availability = await response.json();
        console.log("Availability", availability);

        let dates = convertAvailabilityToISOStrings(availability[0]);
        setCalendar(dates);
        setIsLoaded(true);

    }

    const convertAvailabilityToISOStrings = (availability) => {
        const result = [];
        console.log("Availability is here ", availability);

        // Get the start of the current week (Sunday)
        let weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });

        console.log("Week Start", weekStart);
        const availabilityArr = Object.values(availability);
        console.log("Availability", availabilityArr.length);
        let startDate;

        for (let i = 0; i < availabilityArr.length; i++) {


            startDate = addDays(weekStart, i);
            console.log("Start date is ", startDate);
            availabilityArr[i].forEach((time) => {
                const [hours, minutes] = time.split(':');
                const date = new Date(startDate);
                date.setHours(hours, minutes);
                result.push(date);
            })
        }

        console.log("Result is ", result);
        return result;


    }

    useEffect(() => {
        getDates()
            .then(dates => {
                setMaxDate(new Date(dates.end_date));
                console.log("Max Date", maxDate);
            })
            .catch(error => console.error('There was an error!', error));
        loadAvailability();
    }, []); // Empty dependency array means this effect runs once on mount
    const navigateToToday = () => {
        const today = new Date();
        const todayStartDate = startOfWeek(today, { weekStartsOn: 0 });
        navigate(`/schedule`);
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MainContentLayout

                rightColumnContent={
                    <div style={{ textAlign: "left", marginTop: "85px", marginRight: "15px" }}>
                        <div style={{ display: 'flex', borderRadius: '5px', overflow: 'hidden' }}>
                            <button onClick={() => setIsRecurring(true)} style={{
                                backgroundColor: isRecurring ? '#103da2' : '#fff',
                                color: isRecurring ? '#fff' : '#555',
                                border: '1px solid #103da2',
                                padding: '10px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                flex: '1',
                                fontSize: '16px',
                                margin: '0',
                                cursor: 'pointer',
                                borderTopLeftRadius: '5px',
                                borderBottomLeftRadius: '5px',
                                transition: 'background-color 0.3s, color 0.3s'
                            }}>
                                Recurring
                            </button>
                            <button onClick={() => setIsRecurring(false)} style={{
                                backgroundColor: !isRecurring ? '#103da2' : '#fff',
                                color: !isRecurring ? '#fff' : '#555',
                                border: '1px solid #103da2',
                                padding: '10px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                flex: '1',
                                fontSize: '16px',
                                margin: '0',
                                cursor: 'pointer',
                                borderTopRightRadius: '5px',
                                borderBottomRightRadius: '5px',
                                transition: 'background-color 0.3s, color 0.3s'
                            }}>
                                Weekly
                            </button>
                        </div>


                        {isRecurring ? (
                            <>
                                <h3> Set Recurring Availability</h3>
                                <p>Enhance your tutoring experience by setting recurring availability for your classes! Streamline your schedule and make it easy for students to book sessions with you regularly. </p>
                                <p>Simply click and drag to select the days and times you are available for tutoring and click submit. </p>
                                <p>You can always update your recurring availability or change your availability for a week if needed.</p>
                            </>
                        ) : (
                            <>
                                <h3> Set Weekly Availability</h3>
                                <p>Need to adjust your schedule for a specific week? No problem! You can easily change your availability for any week. </p>
                                <p>Just navigate to the week you want to change, then click and drag to select the new times you are available. When you're done, click the 'Submit' button to save your changes. </p>
                                <p >Remember, you can always reset to your recurring availability or clear your availability for a week if needed.</p>
                            </>
                        )}
                    </div>
                }>

                {isRecurring && (
                    <div className="App">
                        <div className="Calendar" style={{ width: '60vw', marginLeft: '-20px' }}>
                            {isLoaded && (
                                <Calendar
                                    calendar={calendar}
                                    handleSubmitCalendar={handleSubmitCalendar}
                                    start_date={startDate}
                                    isRecurring={true}
                                    dateFormat="ddd"
                                />
                            )}
                        </div>
                    </div>
                )}

                {!isRecurring && <ScheduleSelector />}
            </MainContentLayout >
        </LocalizationProvider >
    );
}
