import React from 'react'
import * as dates from 'date-arithmetic'
import PropTypes from 'prop-types'
import cn from 'classnames'
import dayjs from 'dayjs'
import styles from './agenda.css'

function rangeFunc(start, end, unit = 'day') {
    let current = start
    const days = []
    while (dates.lte(current, end, unit)) {
        days.push(current)
        current = dates.add(current, 1, unit)
    }
    return days
}

function inRange(e, start, end, accessors) {
    const eStart = dates.startOf(accessors.start(e), 'day')
    const eEnd = accessors.end(e)
    const startsBeforeEnd = dates.lte(eStart, end, 'day')
    const endsAfterStart = !dates.eq(eStart, eEnd, 'minutes')
        ? dates.gt(eEnd, start, 'minutes')
        : dates.gte(eEnd, start, 'minutes')
    return startsBeforeEnd && endsAfterStart
}
export const AgendaView = ({ accessors, localizer, length, date, events, getters, eventPropGetter }) => {
    const renderDay = (day, events) => {
        events = events.filter((e) =>
            inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
        );

        return (
            events.map((event, idx) => {
                const userProps = eventPropGetter(event); // Use eventPropGetter here

                return (
                    <div key={idx} className={`rbc-agenda-event-card ${userProps.className}`} style={userProps.style}>
                        <div className="rbc-agenda-date">
                            {localizer.format(day, 'MMMM DD')}
                        </div>
                        <div className="rbc-agenda-time">
                            {timeRangeLabel(day, event)}
                        </div>
                        <div className="rbc-agenda-event-title">
                            {accessors.title(event)}
                        </div>
                    </div>
                );
            })
        );


    };

    const timeRangeLabel = (day, event) => {
        const end = accessors.end(event);
        const start = accessors.start(event);

        if (!accessors.allDay(event)) {
            if (dayjs(start).day() === dayjs(end).day()) {
                const timePeriod = `${dayjs(start).format('h:mma')} – ${dayjs(
                    end
                ).format('h:mma')}`;
                return timePeriod;
            } else {
                const startDate = dayjs(start).format('DD-MM YYYY, h:mma');
                const endDate = dayjs(end).format('DD-MM YYYY, h:mma');
                return `${startDate} – ${endDate}`;
            }
        }
    };

    const end = dates.add(date, length, 'day');
    const range = rangeFunc(date, end, 'day');
    events = events.filter((event) => inRange(event, date, end, accessors));
    events.sort((a, b) => +accessors.start(a) - +accessors.start(b));

    return (
        <div className="rbc-agenda-view">
            {events.length !== 0
                ? range.map((day, idx) => renderDay(day, events, idx))
                : <div className="rbc-agenda-no-events">No event dates in range</div>}
        </div>
    );
};
AgendaView.title = (start, { localizer }) => {
    const end = dates.add(start, 1, 'month')
    return localizer.format({ start, end }, 'agendaHeaderFormat')
}

AgendaView.navigate = (date, action) => {
    const sDate = dayjs(date).startOf('month').toDate()
    switch (action) {
        case 'PREV':
            return dates.add(sDate, -1, 'month')
        case 'NEXT':
            return dates.add(sDate, 1, 'month')
        default:
            return date
    }
}

AgendaView.propTypes = {
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    length: PropTypes.number,
    selected: PropTypes.object,
    accessors: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
}