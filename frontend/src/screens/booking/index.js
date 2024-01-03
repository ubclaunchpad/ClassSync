import React from "react";
import Calendar from "../../components/BookingCalendar";
import "./index.css"; // Import your custom styles
const AppointmentCalendar = () => {
    const [selectedSlot, setSelectedSlot] = React.useState(null);

    const handleBookClick = (slot) => {
        console.log(`Booking slot ${slot.start} - ${slot.end}`);
        setSelectedSlot(null);
    };

    return (

        <Calendar onSelectSlot={setSelectedSlot} />


    );
};

export default AppointmentCalendar;
