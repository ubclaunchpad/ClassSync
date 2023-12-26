import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from "../../components/Calendar/Calendar";
import { set, startOfWeek, addWeeks, endOfWeek } from 'date-fns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { Datepicker } from 'flowbite-react';




export default function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [maxDate, setMaxDate] = useState(new Date());
    const { id } = useParams();

    const [startDate, setStartDate] = useState(startOfWeek(new Date(id), { weekStartsOn: 0 }));

    const navigate = useNavigate();

    // const startDate = startOfWeek(new Date(id), { weekStartsOn: 0 });
    console.log(startDate);


    const navigateToPreviousWeek = () => {
        const previousWeekStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        setStartDate(previousWeekStartDate);
        navigate(`/schedule/${previousWeekStartDate.toISOString().split('T')[0]}`);
    };

    const navigateToNextWeek = () => {
        const nextWeekStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        setStartDate(nextWeekStartDate);
        navigate(`/schedule/${nextWeekStartDate.toISOString().split('T')[0]}`);
    };

    const handleChange = (newDate) => {
        // get start of week from this newDate
        const newDateStartOfWeek = startOfWeek(newDate, { weekStartsOn: 0 });
        setStartDate(newDateStartOfWeek);
    }

    async function handleSubmitCalendar(newSchedule, isRecurring) {
        console.log("Submitting Availability")

        if (isRecurring) {
            console.log("Recurring");
        } else {
            console.log("Not recurring");
            console.log(startDate)
            const end_date = endOfWeek(startDate);
            console.log(end_date)
        }


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
                6: scheduleByDay[6]
            };
            const response = await fetch("http://localhost:8080/tutor/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: 1,
                    start_date: startDate,

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
        const response = await fetch("http://localhost:8080/tutor/availability/dates", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // let maxDate;

    getDates()
        .then(dates => {
            setMaxDate(new Date(dates.end_date));
            console.log("Max Date", maxDate);
        })
        .catch(error => console.error('There was an error!', error));






    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <div className="App">
                {console.log("id = " + startDate)}
                <button onClick={navigateToPreviousWeek}>Previous Week</button>
                <button onClick={navigateToNextWeek}>Next Week</button>
                {/* <DatePicker value={startDate} /> */}
                <DatePicker value={startDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
                <div className="Calendar" style={{ width: '100vw', height: '100vh', marginLeft: '-20px' }}>
                    <Calendar
                        calendar={calendar}
                        handleSubmitCalendar={handleSubmitCalendar}
                        start_date={startDate}
                        isRecurring={false}
                        dateFormat="ddd DD MMM"
                    />
                </div>
            </div>
        </LocalizationProvider >
    );
}
