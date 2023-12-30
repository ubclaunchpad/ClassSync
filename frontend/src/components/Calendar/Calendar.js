import React, { useState, useEffect } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import { addDays, startOfWeek } from 'date-fns';

const Calendar = (props) => {
    console.log("Calendar props ", props.calendar);
    const [schedule, setSchedule] = useState(props.calendar);

    const handleChange = (newSchedule) => {
        console.log("New Schedule ", newSchedule);
        setSchedule(newSchedule);
    };

    return (
        <>
            <ScheduleSelector
                key={[props.start_date, schedule]}
                selection={schedule}
                numDays={7}
                hourlyChunks={2}
                minTime={7}
                maxTime={19}
                timeFormat={"hh:mm A"}
                margin={2}
                dateFormat={props.dateFormat}
                startDate={props.start_date}
                onChange={handleChange}
                selectedColor={"#103da2"}
                unselectedColor={"#B3DEFC"}
                hoveredColor={"#00B0F1"}
            />
            <input type="submit" value="Submit" onClick={() => props.handleSubmitCalendar(schedule, props.isRecurring)} />
        </>
    );
};

export default Calendar;