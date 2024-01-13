import "./index.css";
import AddStudentForm from "../../components/AddStudentForm";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";

const localizer = momentLocalizer(moment);
const events = [
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ]

const ParentDash = (props) => {
  return (
    <ParentDashboardLayout>
      <div className="student-info-container">
        {/* <AddStudentForm /> */}
        {/* <hr className="line"></hr> */}
        <button class="header-button">
          <a href="/addStudent" class="header-button">Add a New Student</a>
        </button>
      </div>
      <div className="student-info-container">
        <div className="App">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            style={{ height: "100vh" }}
          />
        </div>
      </div>
      
    </ParentDashboardLayout>
  );
};

export default ParentDash;
