import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import { endOfWeek, startOfWeek } from "date-fns";
import Select from "react-select";
import { ParentDashboardLayout } from "../ParentDashboardLayout";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const nextWeekDate = new Date();
nextWeekDate.setDate(nextWeekDate.getDate() + 7);


export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [startDate, setStartDate] = useState(startOfWeek(nextWeekDate));
    const [isLoaded, setIsLoaded] = useState(false)
    const [openSlots, setOpenSlots] = useState({})
    const [availablePeople, setAvailablePeople] = useState([])
    const [availabilityHashmap, setAvailabilityHashmap] = useState({});
    const [tutorIDs, setTutorIDS] = useState({})
    const [title, setTitle] = useState("")
    const [bookingError, setBookingError] = useState(null);
    const [selectedTutors, setSelectedTutors] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);


    const { id } = useParams();

    const [forceRender, setForceRerender] = useState(false);



    const loadData = async () => {
        console.log("Loading data for ", startDate.toISOString().split('T')[0]);



        let url = `http://localhost:8080/tutor/enrollment?course_id=${id}`

        const tutors = await fetch(url);
        const tutorsData = await tutors.json();
        console.log("Course Data", tutorsData)

        const tutorsOptions = tutorsData.map(course => ({
            value: course.tutor_id,
            label: course.tutor_name
        }));


        setFilterOptions(tutorsOptions)

        let tutorIds = selectedTutors.map(tutor => tutor.value).join(',');
        if (tutorIds === "") {
            tutorIds = tutorsOptions.map(option => option.value).join(',');
        }
        console.log("Tutor ids ", tutorsData);



        url = `http://localhost:8080/tutor/select?start_date=${startDate.toISOString().split('T')[0]}&tutor_ids=${tutorIds}`;
        console.log("URL is ", url)
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

            url = `http://localhost:8080/availability/bookings?id=${id}`
            const bookingsResponse = await fetch(url);
            const bookingsData = await bookingsResponse.json();
            console.log("Bookings Data", bookingsData)
            console.log(bookingsData.title)
            setTitle(bookingsData.title)
            console.log("Title is ", title)





            console.log("Date ")
            // console.log(new Date(bookingsData.bookings[0].start_time))

            console.log("Events Data", eventsData)

            let events = []

            bookingsData.bookings.forEach(booking => {
                console.log("Booking is ", booking)

                const end = moment(booking.start_time).add(booking.session_duration, "minute").toDate();
                console.log(end)

                events.push({
                    start: new Date(booking.start_time),
                    end: end,
                    title: bookingsData.title,
                    id: booking.booking_id,
                    tutor_id: booking.tutor_id
                })
            })

            console.log("Event is ", events)
            setEventsData(events);

            console.log("Events Data", eventsData)


            console.log("Bookings", bookingsData)
            console.log("Available Slots By Day", openSlots)
            console.log("Slots ", openSlots[3])
            console.log(data.availabilityHashmap)
            setAvailabilityHashmap(data.availabilityHashmap);
            console.log("hashmap", availabilityHashmap)
            setOpenSlots(openSlots)
            console.log(data);

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
        // setIsLoaded(false)
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
        setBookingError(null); // Clear the error when selecting a new slot
        const end = moment(start).add(1, "hour").toDate();


        // Convert the start date to the format used in availableSlotsByDay.
        const startTime = moment(start).format("HH:mm");
        const nextTimeSlot = moment(start).add(30, "minutes").format("HH:mm");

        // Get the day of the week of the start date.
        const dayOfWeek = moment(start).day();

        // Get difference between start day and current day to create constraint. 
        const currentDate = new Date();
        const diffTime = start - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // setTutorIDS(tutorIDs)
        //     const filteredTutorIdNameMap = tutorIDs.forEach([key, value] => {

        // })
        // console.log(filteredTutorIdNameMap)
        const overlaps = eventsData.some(event =>
            (start < event.end && end > event.start)
        );
        // Check if the start time and the next time slot are in the array for the day of the week.
        const isSlotAvailable = openSlots[dayOfWeek] && openSlots[dayOfWeek].includes(startTime) && !overlaps && diffDays >= 7;

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

    const deleteEvent = async (event) => {

        const response = await fetch(`http://localhost:8080/availability/booking?id=${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log("Deleted booking");
            setEventsData(eventsData.filter(item => item.id !== event.id));

            const selectedTime = event.start.toTimeString().split(' ')[0].substring(0, 5);
            const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000).toTimeString().split(' ')[0].substring(0, 5);
            const times = [selectedTime, thirtyMinsLater];

            let body = JSON.stringify({
                tutor_id: event.tutor_id,
                start_date: startDate.toISOString().split('T')[0],
                end_date: endOfWeek(startDate).toISOString().split('T')[0],
                day: event.start.getDay(),
                times: times
            });

            console.log("Body is ", body)

            let url = "http://localhost:8080/availability/add"

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            });

            if (response.ok) {
                console.log("Added availability");
                loadData()
            } else {

                console.log("Error adding availability");
            }


        } else {
            setBookingError("Failed to delete session")
        }

    }


    const handleBook = async (tutor) => {

        console.log("ID is ", id)
        if (selectedSlot) {

            const response = await fetch('http://localhost:8080/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking: {
                        enrollment_id: id,
                        tutor_id: tutor.value,
                        session_duration: 60,
                        start_time: selectedSlot.start
                    }
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
            // console.log('Success:', data[0].insert_booking);





            if (response.ok) {
                console.log("Booking successful")
                // let events = []
                // const newEvents = data.map(booking => {
                //     const bookingSlot = booking.insert_booking;
                //     console.log("Booking is ", bookingSlot);

                //     const end = moment(bookingSlot[4]).add(bookingSlot[2], "minute").toDate();
                //     console.log(end);

                //     return {
                //         start: new Date(bookingSlot[4]),
                //         end: end,
                //         title: title,
                //     };
                // });
                // console.log("New Events ", newEvents);
                console.log("Events Data ", eventsData);
                // setUpdatedEvents(true)
                setEventsData([
                    ...eventsData,
                    {
                        start: selectedSlot.start,
                        end: selectedSlot.end,
                        title: title,
                        id: data,
                        tutor_id: tutor.value
                    },
                ]);

                const selectedTime = selectedSlot.start.toTimeString().split(' ')[0].substring(0, 5);
                const thirtyMinsLater = new Date(selectedSlot.start.getTime() + 30 * 60000).toTimeString().split(' ')[0].substring(0, 5);
                const times = [selectedTime, thirtyMinsLater];

                let body = JSON.stringify({
                    tutor_id: tutor.value,
                    start_date: startDate.toISOString().split('T')[0],
                    end_date: endOfWeek(startDate).toISOString().split('T')[0],
                    day: selectedSlot.start.getDay(),
                    times: times
                });

                let url = "http://localhost:8080/availability/remove"
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: body
                });

                if (response.ok) {
                    console.log("Removed availability");
                    loadData()
                } else {

                    console.log("Error removing availability");
                }



                console.log("Body is ", body)


                console.log("Events Data is ", eventsData)

            } else {
                console.log("Error adding booking");
                setBookingError('Booking failed: You have exceeded the maximum limit of 5 bookings.');
                console.log(data);

            }





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
        const currentDate = new Date();
        const diffTime = date - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (openSlots[dayOfWeek] && diffDays >= 7 && (openSlots[dayOfWeek].includes(currentTimeSlot) || openSlots[dayOfWeek].includes(prevTimeSlot))) {
            return {
                className: "available",
            };
        } else {
            return {
                className: "unavailable"
            }

        }
    };

    useEffect(() => {
        loadData()
        console.log("Updated Availability")
    }, [selectedTutors]);


    const EventComponent = ({ event }) => (
        <div className="rbc-event" style={{ position: 'relative' }}>
            <div className="event-content">
                {event.title}
            </div>
            <button className="delete-button" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ff6347', // Tomato color
                color: 'white', // White text
                border: 'none', // Remove border
                borderRadius: '5px', // Rounded corners
                padding: '10px 20px', // Padding
                fontSize: '1em', // Text size
                cursor: 'pointer' // Cursor style on hover
            }} onClick={() => deleteEvent(event)}>
                Delete
            </button>
        </div>
    );


    const CustomToolbar = ({ label, onNavigate, onView }) => {
        let currWeek = new Date()
        let isButtonDisabled = startDate < currWeek

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => onNavigate('TODAY')}>
                        Today
                    </button>
                    <button type="button"
                        className={isButtonDisabled ? 'disabled-button' : ''}
                        disabled={isButtonDisabled}
                        onClick={!isButtonDisabled ? () => onNavigate('PREV') : null}
                    >
                        Back
                    </button>
                    <button type="button" onClick={() => onNavigate('NEXT')}>
                        Next
                    </button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => onView('month')}>
                        Month
                    </button>
                    <button type="button" onClick={() => onView('week')}>
                        Week
                    </button>
                    <button type="button" onClick={() => onView('day')}>
                        Day
                    </button>
                </span>
            </div>
        );


    };


    const tutors = [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Doe' },
        { id: '3', firstName: 'Bob', lastName: 'Smith' },
        { id: '4', firstName: 'Alice', lastName: 'Johnson' },
        { id: '5', firstName: 'Charlie', lastName: 'Brown' },
    ];

    const tutorOptions = tutors.map(tutor => ({
        value: tutor.id,
        label: `${tutor.firstName} ${tutor.lastName}`
    }));

    return (
        <ParentDashboardLayout
            rightColumnContent={
                bookingError ? (
                    <div style={{ color: 'red', marginTop: '10px' }}>{bookingError}</div>
                ) : (
                    selectedSlot != null ? (
                        <div className="modal-container">
                            <Modal
                                selectedSlot={selectedSlot.start.toString()}
                                availablePeople={availablePeople}
                                onBook={handleBook}
                                onClose={() => {
                                    setSelectedSlot(null);
                                    setBookingError(null); // Clear the error when closing the modal
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ textAlign: 'left', marginTop: '85px', marginRight: '15px' }}>
                            <h3 style={{ fontSize: '24px', color: '#333' }}>Booking a Class</h3>
                            <p style={{ fontSize: '16px', color: '#333', marginTop: '20px' }}>
                                To book a class, please select an available slot from the calendar. After selecting a slot, you will be able to choose from a list of available tutors to book your class with.
                            </p>
                        </div>
                    )
                )
            }
        >
            <div className="calendar-container">
                {isLoaded && (
                    <div width="100vw">
                        <Select
                            value={selectedTutors}
                            onChange={setSelectedTutors}
                            options={filterOptions}
                            isSearchable
                            isMulti
                            placeholder="Filter by tutor..."
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: '90%',
                                    paddingBottom: '10px',
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    width: '40%',
                                    marginLeft: `${selectedTutors.length * 10}%`
                                }),
                                multiValue: (styles) => {
                                    return {
                                        ...styles,
                                        backgroundColor: `hsla(200, 100%, 80%, 1)` // Change 200 to any value between 0 and 360
                                    };
                                },
                            }}
                        />
                        <Calendar
                            key={eventsData + availabilityHashmap}
                            views={["week"]}
                            selectable
                            localizer={localizer}
                            defaultDate={startDate}
                            defaultView="week"
                            components={{
                                event: EventComponent,
                                toolbar: CustomToolbar
                            }}
                            events={eventsData}
                            min={new Date(2020, 1, 0, 7, 0, 0)}
                            max={new Date(2020, 1, 0, 19, 0, 0)}
                            style={{ height: "75vh", width: "90vw" }}
                            onSelectEvent={deleteEvent}
                            onSelectSlot={handleSelect}
                            slotPropGetter={slotPropGetter}
                            onNavigate={(date) => {
                                setSelectedSlot(null)
                                setStartDate(startOfWeek(date))
                            }}
                        />
                    </div>
                )}
            </div>
        </ParentDashboardLayout>
    )
}