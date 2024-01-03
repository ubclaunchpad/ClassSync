import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar/Calendar";
import { startOfWeek, endOfWeek, addWeeks, isAfter, formatISO, addDays, set } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import "./index.css"; // Import your custom styles
import { TutorDashboardLayout } from "../../components/TutorDashboardLayout";
import { textAlign } from "@mui/system";




export default function ScheduleSelectorRecurring() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [maxDate, setMaxDate] = useState(new Date());
    const userid = localStorage.getItem("userID");
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });

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
            const response = await fetch("http://localhost:8080/tutor/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: localStorage.getItem("userID"),
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
        const response = await fetch("http://localhost:8080/tutor/availability/dates", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }


    const loadAvailability = async () => {
        const response = await fetch(`http://localhost:8080/tutor/availability/recurring?userID=${userid}`, {
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



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TutorDashboardLayout

                rightColumnContent={
                    <div style={{ textAlign: "left", marginTop: "85px", marginRight: "15px" }}>
                        <h3> Set Recurring Availability</h3>

                        <p>Enhance your tutoring experience by setting recurring availability for your classes! Streamline your schedule and make it easy for students to book sessions with you regularly. </p>
                        <p>Simply click and drag to select the days and times you are available for tutoring and click submit. </p>
                        <p>You can always update your recurring availability or change your availability for a week if needed.</p>                    </div>
                }>

                <div className="App">
                    <div className="Calendar" style={{ width: '60vw', height: '100vh', marginLeft: '-20px' }}>
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
            </TutorDashboardLayout >
        </LocalizationProvider >
    );
}
