import ScheduleSelector from "react-schedule-selector";
import React from "react";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        console.log("props received = " + JSON.stringify(this.props.calendar));
        this.state = {
            schedule: this.props.calendar
        };


        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.start_date !== prevProps.start_date) {
            // `start_date` prop has changed, update the component
        }
    }

    handleChange = (newSchedule) => {

        this.setState({
            schedule: newSchedule

        });

    };

    render() {

        console.log("props received = " + JSON.stringify(this.props.start_date));


        return (
            <>
                <ScheduleSelector
                    key={this.props.start_date}
                    selection={this.state.schedule}
                    numDays={7}
                    hourlyChunks={2}
                    minTime={7}
                    maxTime={19}
                    timeFormat={"hh:mm A"}
                    margin={2}
                    dateFormat={this.props.dateFormat}
                    startDate={this.props.start_date}
                    onChange={this.handleChange}
                    selectedColor={"#103da2"}
                    unselectedColor={"#B3DEFC"}
                    hoveredColor={"#00B0F1"}


                />
                <input type="submit" value="Submit" onClick={() => this.props.handleSubmitCalendar(this.state.schedule, this.props.isRecurring)} />

            </>
        );
    }
}
