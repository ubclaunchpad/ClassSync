import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Confirmation from "./screens/confirmation";
import AddStudent from "./screens/addStudent";
import "./App.css";
import TutorProfile from "./screens/tutorProfile";
import RegisterTutor from "./screens/registerTutor";
import AddTutor from "./screens/addTutor";
import ScheduleSelector from "./screens/tutorAvailability";
import ScheduleSelectorRecurring from "./screens/recurringAvailability";
import TutorLogin from "./screens/TutorLogin";
import AppointmentCalendar from "./screens/booking";
import TutorCalendar from "./screens/tutorBookings";
import AdminLogin from "./screens/adminLogin";
import StudentDashboard from "./screens/studentDashboard";
import Registrations from "./screens/registrations";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/registerTutor" element={<RegisterTutor />} />
          <Route path="/add-tutor" element={<AddTutor />} />
          <Route
            path="/tutor/availability/recurring"
            element={<ScheduleSelectorRecurring />}
          />
          <Route path="/schedule/:id" element={<ScheduleSelector />} />
          <Route path="/appointment/:id" element={<AppointmentCalendar />} />
          <Route path="/tutor/appointments" element={<TutorCalendar />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/registrations" element={<Registrations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
