import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Confirmation from "./screens/confirmation";
import ParentDash from "./screens/ParentDash";
import "./App.css";
import TutorProfile from "./screens/tutorProfile";
import RegisterTutor from "./screens/registerTutor";
import AddTutor from "./screens/addTutor";
import ScheduleSelector from "./screens/tutorAvailability";
import ScheduleSelectorRecurring from "./screens/recurringAvailability";
import TutorLogin from "./screens/TutorLogin";
import AppointmentCalendar from "./screens/booking";
import TutorCalendar from "./screens/tutorBookings";
import AdminCalendar from "./screens/adminBooking";
import AdminLogin from "./screens/adminLogin";
import StudentDashboard from "./screens/studentDashboard";
import Registrations from "./screens/registrations";
import ShopCourses from "./screens/shopCourses";
import { TutorView } from "./screens/viewTutor/viewTutor";
import AddStudent from "./screens/addStudent";
import Courses from "./screens/courses";
import TutorsList from "./screens/tutorsList";
import { ViewAllTutors } from "./screens/viewAllTutors";
import ClassRecordForm from "./screens/classRecord";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/parentDash" element={<ParentDash />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/registertutor/3f2916a7-02a4-4e7a-942c-402b3e396fa4" element={<RegisterTutor admin={true}/>} />
          <Route path="/registertutor/:token" element={<RegisterTutor admin={false}/>} />

          <Route path="/add-tutor" element={<AddTutor />} />
          <Route path="/viewTutor/:id" element={<TutorView />} />
          <Route
            path="/tutor/availability/recurring"
            element={<ScheduleSelectorRecurring />}
          />
          <Route path="/schedule/:id" element={<ScheduleSelector />} />
          <Route path="/appointment/:id" element={<AppointmentCalendar />} />
          <Route path="/tutor/appointments" element={<TutorCalendar />} />
          <Route path="/admin/appointments" element={<AdminCalendar />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/shop" element={<ShopCourses />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tutors" element={<TutorsList />} />
          <Route path="/allTutors" element={<ViewAllTutors />} />
          <Route path="/class/:id" element={<ClassRecordForm />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
