import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar/Calendar";

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const [calendar, setCalendar] = useState([]);

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
                6: scheduleByDay[6]
            };
            const response = await fetch("http://localhost:8080/tutor/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: 1,
                    weeks: JSON.stringify([{ "start_date": "2021-03-01", "end_date": "2021-03-07" },
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

    return (
        <div className="App">
            <div className="Calendar" style={{ width: '100vw', height: '100vh', marginLeft: '-20px' }}>                <Calendar
                calendar={calendar}
                handleSubmitCalendar={handleSubmitCalendar}
            />
            </div>
        </div >
    );
}
