import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from "../../components/Calendar/Calendar";
import { format, startOfWeek, endOfWeek, addWeeks, isAfter, formatISO, addDays, add } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TutorDashboardLayout } from "../../components/TutorDashboardLayout";




export default function ScheduleSelector() {
    const [isLoading, setIsLoading] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [maxDate, setMaxDate] = useState(new Date());
    const { id } = useParams();
    const userID = localStorage.getItem("userID");
    const [isLoaded, setIsLoaded] = useState(false);

    console.log("id = " + id);
    const [year, month, day] = id.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    console.log("Date", date);

    // const date = new Date(id);
    const [startDate, setStartDate] = useState(startOfWeek(date, { weekStartsOn: 0 }));
    console.log("Schedule Start ", startDate);
    async function getAvailability() {
        const response = await fetch(`http://localhost:8080/tutor/availability/schedule?userID=${userID}&startDate=${startDate.toISOString().split('T')[0]}`, {
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
            availabilityArr[i].forEach((time) => {
                const [hours, minutes] = time.split(':');
                const date = new Date(startDate);
                date.setHours(hours, minutes);
                result.push(date);
            })
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
        navigate(`/schedule/${previousWeekStartDate.toISOString().split('T')[0]}`);
    };

    const navigateToNextWeek = () => {
        const nextWeekStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        setStartDate(nextWeekStartDate);
        navigate(`/schedule/${nextWeekStartDate.toISOString().split('T')[0]}`);
    };

    const handleChange = (newDate) => {
        console.log('New date:', newDate);

        // get start of week from this newDate
        const newDateStartOfWeek = startOfWeek(newDate, { weekStartsOn: 0 });
        console.log('Start of week:', newDateStartOfWeek);

        setStartDate(newDateStartOfWeek);
        console.log('Updated startDate:', startDate);

        navigate(`/schedule/${newDateStartOfWeek.toISOString().split('T')[0]}`);
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
            const response = await fetch("http://localhost:8080/tutor/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: localStorage.getItem("userID"),
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
        const response = await fetch(`http://localhost:8080/tutor/availability/dates?id=${localStorage.getItem(userID)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }


    useEffect(() => {
        getDates()
            .then(dates => {
                let date = new Date(dates.end_date);

                setMaxDate(date);
                console.log("Max Date", maxDate);
            })
            .catch(error => console.error('There was an error!', error));
    }, []); // Empty dependency array means this effect runs once on mount

    const resetAvailability = async () => {
        console.log("Resetting Availability")

        let url = `http://localhost:8080/availability/reset`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tutor_id: localStorage.getItem("userID"),
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TutorDashboardLayout>

                <div className="App">
                    {console.log("id = " + startDate)}
                    <button onClick={navigateToPreviousWeek}>Previous Week</button>
                    <button onClick={navigateToNextWeek}>Next Week</button>
                    <button onClick={resetAvailability}>Reset to Recurring</button>
                    <DatePicker value={startDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
                    <div className="Calendar" style={{ width: '60vw', height: '100vh', marginLeft: '-20px' }}>
                        {isLoaded && (
                            <Calendar
                                calendar={calendar}
                                handleSubmitCalendar={handleSubmitCalendar}
                                start_date={startDate}
                                isRecurring={false}
                                dateFormat="ddd DD MMM"
                            />
                        )}
                    </div>
                </div>
            </TutorDashboardLayout>
        </LocalizationProvider >
    );
}
