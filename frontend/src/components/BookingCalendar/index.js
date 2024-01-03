import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import TutorProfile from "../../screens/tutorProfile";
import { TutorDashboardLayout } from "../TutorDashboardLayout";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [forceRender, setForceRerender] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setForceRerender((prev) => !prev);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleSelect = ({ start }) => {
        const end = moment(start).add(1, "hour").toDate();

        // Convert the start date to the format used in availableSlotsByDay.
        const startTime = moment(start).format("HH:mm");
        const nextTimeSlot = moment(start).add(30, "minutes").format("HH:mm");

        // Get the day of the week of the start date.
        const dayOfWeek = moment(start).day();

        // Check if the start time and the next time slot are in the array for the day of the week.
        const isSlotAvailable = availableSlotsByDay[dayOfWeek].includes(startTime) &&
            availableSlotsByDay[dayOfWeek].includes(nextTimeSlot);

        if (isSlotAvailable) {
            setSelectedSlot({ start, end });
        } else {
            setSelectedSlot(null);
            console.log("This slot is not available.");
        }
    };
    const handleBook = (person) => {
        if (selectedSlot) {
            setEventsData([
                ...eventsData,
                {
                    start: selectedSlot.start,
                    end: selectedSlot.end,
                    title: `Booked by ${person}`,
                },
            ]);
        }
        setSelectedSlot(null);
    };

    // Array of available slots for each day of the week
    const availableSlotsByDay = {
        0: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Sunday
        1: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Monday
        2: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Tuesday
        3: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Wednesday
        4: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Thursday
        5: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Friday
        6: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Saturday
    };

    const slotPropGetter = (date) => {
        const dayOfWeek = moment(date).day(); // 0 for Sunday, 1 for Monday, etc.
        const timeFormat = "HH:mm";
        const currentTimeSlot = moment(date).format(timeFormat);

        // Check if the current time slot is in the array of availabilities for the specific day
        if (!availableSlotsByDay[dayOfWeek].includes(currentTimeSlot)) {
            return {
                className: "unavailable",
            };
        }
        return {
            className: "available",
        };
    };

    return (
        <TutorDashboardLayout
            rightColumnContent={selectedSlot != null && (
                <div className="modal-container">
                    <Modal
                        selectedSlot={selectedSlot.start.toString()}
                        availablePeople={["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams", "Charlie Brown", "Diana Davis", "Ethan Miller", "Fiona Wilson", "George Thomas"]} onBook={handleBook}
                        onClose={() => setSelectedSlot(null)}
                    />
                </div>
            )}
        >
            <div className="calendar-container"
            >
                <Calendar
                    key={forceRender}
                    views={["week"]}
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="week"
                    events={eventsData}
                    min={new Date(2020, 1, 0, 7, 0, 0)}
                    max={new Date(2020, 1, 0, 19, 0, 0)}
                    style={{ height: "75vh", width: "90vw" }}
                    onSelectEvent={(event) => alert(`Event: ${event.title}`)}
                    onSelectSlot={handleSelect}
                    slotPropGetter={slotPropGetter}
                    dayLayoutAlgorithm="no-overlap"

                />
            </div>

        </TutorDashboardLayout>
    );
}
