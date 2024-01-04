import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import { TutorDashboardLayout } from "../TutorDashboardLayout";
import { startOfWeek } from "date-fns";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [startDate, setStartDate] = useState(startOfWeek(new Date()));
    const [isLoaded, setIsLoaded] = useState(false)
    const [openSlots, setOpenSlots] = useState({})
    const [availablePeople, setAvailablePeople] = useState([])
    const [availabilityHashmap, setAvailabilityHashmap] = useState({});
    const [tutorIDs, setTutorIDS] = useState({})


    const [forceRender, setForceRerender] = useState(false);


    const loadData = async () => {
        console.log("Loading data for ", startDate.toISOString().split('T')[0]);
        const url = `http://localhost:8080/availability?date=${startDate.toISOString().split('T')[0]}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            let openSlots = {}
            Object.entries(data.availabilityHashmap).forEach(([day, slots]) => {
                openSlots[day] = Object.keys(slots);
            });

            console.log("Available Slots By Day", openSlots)
            console.log("Slots ", openSlots[3])
            console.log(data.availabilityHashmap)
            setAvailabilityHashmap(data.availabilityHashmap);
            console.log("hashmap", availabilityHashmap)
            setOpenSlots(openSlots)
            console.log(data);

            tutorIdNameMap = data.tutorIdNameMap
            const tutorOptions = Object.entries(data.tutorIdNameMap).map(([value, label]) => ({ value, label }));
            setTutorIDS(tutorOptions)
            setIsLoaded(true)


            // Use the data here
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    useEffect(() => {
        // This code will run whenever `startDate` changes
        console.log('Start date has changed:', startDate);
        setIsLoaded(false)
        loadData()
    }, [startDate]); // Add `startDate` as a dependency

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


        // setTutorIDS(tutorIDs)
        //     const filteredTutorIdNameMap = tutorIDs.forEach([key, value] => {

        // })
        // console.log(filteredTutorIdNameMap)
        const overlaps = eventsData.some(event =>
            (start < event.end && end > event.start)
        );
        // Check if the start time and the next time slot are in the array for the day of the week.
        const isSlotAvailable = openSlots[dayOfWeek] && openSlots[dayOfWeek].includes(startTime) && !overlaps;

        if (isSlotAvailable) {
            setSelectedSlot({ start, end });

            const ids = availabilityHashmap[dayOfWeek][startTime];


            const selected = tutorIDs.filter(item => ids.includes(Number(item.value)));
            setAvailablePeople(selected)
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
                    title: `Intermediate Python`,
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
        const prevTimeSlot = moment(currentTimeSlot, "HH:mm").subtract(30, 'minutes').format("HH:mm");

        if (openSlots[dayOfWeek] && (openSlots[dayOfWeek].includes(currentTimeSlot) || openSlots[dayOfWeek].includes(prevTimeSlot))) {
            return {
                className: "available",
            };
        } else {
            return {
                className: "unavailable"
            }

        }
    };

    return (
        <TutorDashboardLayout
            rightColumnContent={selectedSlot != null && (
                <div className="modal-container">
                    <Modal
                        selectedSlot={selectedSlot.start.toString()}
                        availablePeople={availablePeople} onBook={handleBook}
                        onClose={() => setSelectedSlot(null)}
                    />
                </div>
            )}
        >
            <div className="calendar-container"
            >
                {isLoaded && (
                    <Calendar
                        key={startDate}
                        views={["week"]}
                        selectable
                        localizer={localizer}
                        defaultDate={startDate}
                        defaultView="week"
                        events={eventsData}
                        min={new Date(2020, 1, 0, 7, 0, 0)}
                        max={new Date(2020, 1, 0, 19, 0, 0)}
                        style={{ height: "75vh", width: "90vw" }}
                        onSelectEvent={(event) => alert(`Event: ${event.title}`)}
                        onSelectSlot={handleSelect}
                        slotPropGetter={slotPropGetter}
                        onNavigate={(date) => {
                            setSelectedSlot(null)
                            setStartDate(startOfWeek(date))
                        }}
                    />
                )}
            </div>

        </TutorDashboardLayout>
    );
}
