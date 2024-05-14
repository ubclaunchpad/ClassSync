import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from "../../components/Calendar/Calendar";
import { format, startOfWeek, endOfWeek, addWeeks, isAfter, formatISO, addDays, add } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MainContentLayout } from "../../components/MainContentLayout";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css"; // Import your custom styles

const URL = process.env.REACT_APP_API_URL



export default function ScheduleSelector() {
    const [isLoading, setIsLoading] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const { user } = useAuth()
    const maxDate = new Date(user.enddate);
    const { id } = useParams();
    const userID = localStorage.getItem("userId");
    const [isLoaded, setIsLoaded] = useState(false);

    console.log("id = " + id);
    // const [year, month, day] = id.split('-').map(Number);
    // const date = new Date(year, month - 1, day);
    // console.log("Date", date);

    // const date = new Date(id);
    const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
    console.log("Schedule Start ", startDate);
    async function getAvailability() {
        const response = await fetch(URL + `/tutor/availability/schedule?userID=${userID}&startDate=${startDate.toISOString().split('T')[0]}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        let availability = await response.json();
        console.log("Schedule Availability", availability);
        let dates = convertAvailabilityToISOStrings(availability[0], startDate);
        setCalendar(dates);
        setIsLoaded(true);
        // ...
    }


    const convertAvailabilityToISOStrings = (availability, start) => {
        const result = [];
        console.log("Availability is here ", availability);

        // Get the start of the current week (Sunday)
        let weekStart = start

        console.log("Week Start", weekStart);
        const availabilityArr = Object.values(availability);
        console.log("Availability", availabilityArr.length);
        let startDate;

        for (let i = 0; i < availabilityArr.length; i++) {
            startDate = addDays(weekStart, i);
            console.log("Start date is ", startDate);
            if (availabilityArr[i]) {
                availabilityArr[i].forEach((time) => {
                    const [hours, minutes] = time.split(':');
                    const date = new Date(startDate);
                    date.setHours(hours, minutes);
                    result.push(date);
                });
            }
        }

        console.log("Result is for ", weekStart, result);
        return result;


    }

    useEffect(() => {
        setIsLoaded(false);
        getAvailability();
        console.log("Retrieving Availability for ", startDate)
    }, [startDate]); // Empty dependency array means this effect runs once on mount


    const navigate = useNavigate();


    function getWeeks(startDate, maxDate) {
        const weeks = [];

        let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

        while (!isAfter(currentWeekStart, maxDate)) {
            const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });

            weeks.push({
                startDate: formatISO(currentWeekStart),
                endDate: formatISO(currentWeekEnd)
            });

            currentWeekStart = addWeeks(currentWeekStart, 1);
        }

        return weeks;
    }

    console.log(getWeeks(new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 3, 1)));    // const startDate = startOfWeek(new Date(id), { weekStartsOn: 0 });
    console.log(startDate);


    const navigateToPreviousWeek = () => {
        const previousWeekStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        setStartDate(previousWeekStartDate);
        // navigate(`/schedule/${previousWeekStartDate.toISOString().split('T')[0]}`);
    };

    const navigateToToday = () => {
        const today = new Date();
        const todayStartDate = startOfWeek(today, { weekStartsOn: 0 });
        setStartDate(todayStartDate);
        // navigate(`/schedule/${todayStartDate.toISOString().split('T')[0]}`);
    };

    const navigateToNextWeek = () => {
        console.log("Start Date ", startDate, " Max Date ", maxDate)
        const nextWeekStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        setStartDate(nextWeekStartDate);
        // navigate(`/schedule/${nextWeekStartDate.toISOString().split('T')[0]}`);
    };

    const handleChange = (newDate) => {
        console.log('New date:', newDate);

        // get start of week from this newDate
        const newDateStartOfWeek = startOfWeek(newDate, { weekStartsOn: 0 });
        console.log('Start of week:', newDateStartOfWeek);

        setStartDate(newDateStartOfWeek);
        console.log('Updated startDate:', startDate);

        // navigate(`/schedule/${newDateStartOfWeek.toISOString().split('T')[0]}`);
    }

    async function handleSubmitCalendar(newSchedule) {
        console.log("Submitting Availability")


        setIsLoading(true);
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
                    isRecurring: false,
                    weeks: JSON.stringify([{ "start_date": startDate, "end_date": endOfWeek(startDate) },
                    ]),

                    availability: availability
                })
            });

            response.json().then((data) => {
                console.log(data);
            });

            setIsLoading(false);
        } catch (e) {
            console.log("error");
            setIsLoading(false);
        }
    }

    const today = new Date();
    const minDate = startOfWeek(today, { weekStartsOn: 0 });

    async function getDates() {
        const response = await fetch(URL + `/tutor/availability/dates?id=${localStorage.getItem(userID)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }



    const clearAvailability = async () => {
        console.log("Clearing Availability")

        let url = URL + `/availability/clear`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tutor_id: localStorage.getItem("userId"),
                start_date: startDate,
            })
        });

        if (response.ok) {
            console.log("Availability cleared");


            getAvailability();
        }
    }

    const resetAvailability = async () => {
        console.log("Resetting Availability")

        let url = URL + `/availability/reset`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tutor_id: localStorage.getItem("userId"),
                start_date: startDate,
                end_date: endOfWeek(startDate)
            })
        });


        if (response.ok) {
            console.log("Availability reset");
            getAvailability();
        }
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            {/* <MainContentLayout

                rightColumnContent={
                    <div style={{ textAlign: "left", marginTop: "85px", marginRight: "15px" }}>
                       
                    </div>
                }
            > */}

            <div className="App">
                {console.log("id = " + startDate)}
                <div className="main-container">
                    <div className="button-group">
                        <button className="theme-button" onClick={navigateToToday}>Today</button>
                        <button className="img-btn" onClick={navigateToPreviousWeek} disabled={startDate < new Date()}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg></button>
                        <button className="img-btn" onClick={navigateToNextWeek} disabled={endOfWeek(startDate) >= maxDate}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>                        </div>

                    <div className="date-picker-container">
                        <DatePicker value={startDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
                    </div>

                    <div className="symbol-group">
                        <button className="img-btn" onClick={resetAvailability}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" /></svg></button>
                        <button className="img-btn" onClick={clearAvailability}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" /></svg></button>
                    </div>
                </div>
                <div className="Calendar" style={{ width: '60vw', marginLeft: '5px' }}>
                    {isLoaded && (
                        <Calendar
                            key={calendar}
                            calendar={calendar}
                            handleSubmitCalendar={handleSubmitCalendar}
                            start_date={startDate}
                            isRecurring={false}
                            dateFormat="ddd DD MMM"
                        />


                    )}
                </div>
            </div>
            {/* </MainContentLayout> */}
        </LocalizationProvider >
    );
}
