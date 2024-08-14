import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import TutorDashboard from "./screens/tutorDashboard";
import { ViewAllTutors } from "./screens/viewAllTutors";
import ClassRecordForm from "./screens/classRecord";
import { CourseCurriculumView } from "./screens/courseCurriculum";
import Layout from "./screens/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import TrialBookingCalendar from "./components/TrialBookingCalendar"

import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LogPage from "./components/LogPage";
import { ViewAllCourses } from "./components/BrowseCourses";
import AdminDash from "./components/AdminDash";
import SelectCourses from "./screens/selectCourses";
import ScholarshipRegistration from "./screens/scholarshipRegistration";
import CompleteRegistration from "./screens/completeRegistration";

function PrivateRoute({ Component, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  let path = "/";


  if (roles.includes("guardian")) {
    path = "/";
  } else if (roles.includes("tutor")) {
    path = "/tutor/login";
  } else if (roles.includes("admin")) {
    path = "/admin/login";
  }

  if (loading) {
    return <p>Loading</p>; // or return a loading indicator
  }

  return user && roles.includes(user.role) ? (
    <Component />
  ) : (
    <Navigate to={path} state={{ from: location }} />
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path="/test" element={<Test> <p>Hello World</p></Test>}/> */}
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/confirmation" element={<Confirmation />} /> */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/tutor/login" element={<TutorLogin />} />
              <Route
                path="/registertutor/3f2916a7-02a4-4e7a-942c-402b3e396fa4"
                element={<RegisterTutor admin={true} />}
              />
              <Route path="/completeregistration" element={<CompleteRegistration />} />
              <Route
                path="/registertutor/:token"
                element={<RegisterTutor admin={false} />}
              />




              <Route
                path="/funding/:funding/:id/code/:code"
                element={
                  <PrivateRoute Component={ScholarshipRegistration} roles={["guardian"]} />
                }
              />

              <Route
                path="/parentDash"
                element={
                  <PrivateRoute Component={ParentDash} roles={["guardian"]} />
                }
              />
              <Route
                path="/addStudent"
                element={
                  <PrivateRoute Component={AddStudent} roles={["guardian"]} />
                }
              />
              <Route
                path="/tutorProfile"
                element={
                  <PrivateRoute Component={TutorProfile} roles={["tutor"]} />
                }
              />

              {/* <Route path="/add-tutor" element={<AddTutor />} /> */}
              <Route
                path="/viewTutor/:id"
                element={
                  <PrivateRoute
                    Component={TutorView}
                    roles={["admin", "tutor", "guardian"]}
                  />
                }
              />
              <Route
                path="/curriculum"
                element={
                  <PrivateRoute
                    Component={ViewAllCourses}
                    roles={["tutor", "admin"]}
                  />
                }
              />
              <Route
                path="/adminDash"
                element={
                  <PrivateRoute
                    Component={AdminDash}
                    roles={["admin"]}
                  />
                }
              />

              <Route
                path="/course/:id"
                element={
                  <PrivateRoute
                    Component={CourseCurriculumView}
                    roles={["admin", "tutor"]}
                  />
                }
              />
              <Route
                path="/tutor/availability"
                element={
                  <PrivateRoute
                    Component={ScheduleSelectorRecurring}
                    roles={["tutor"]}
                  />
                }
              />
              <Route
                path="/tutorDash"
                element={
                  <PrivateRoute
                    Component={TutorDashboard}
                    roles={["admin", "tutor"]}
                  />
                }
              />

              <Route
                path="/schedule"
                element={
                  <PrivateRoute
                    Component={ScheduleSelector}
                    roles={["tutor"]}
                  />
                }
              />
              <Route
                path="/appointment/:id"
                element={
                  <PrivateRoute
                    Component={AppointmentCalendar}
                    roles={["guardian"]}
                  />
                }
              />
              <Route
                path="/tutor/appointments"
                element={
                  <PrivateRoute Component={TutorCalendar} roles={["tutor"]} />
                }
              />
              <Route
                path="/student/:id"
                element={
                  <PrivateRoute
                    Component={StudentDashboard}
                    roles={["guardian"]}
                  />
                }
              />
              <Route
                path="/admin/appointments"
                element={
                  <PrivateRoute Component={AdminCalendar} roles={["admin"]} />
                }
              />

              <Route
                path="/logs"
                element={<PrivateRoute Component={LogPage} roles={["admin"]} />}
              />

              <Route
                path="/registrations"
                element={
                  <PrivateRoute Component={Registrations} roles={["admin"]} />
                }
              />
              <Route
                path="/courses"
                element={<PrivateRoute Component={Courses} roles={["admin"]} />}
              />
              <Route
                path="/tutors"
                element={
                  <PrivateRoute Component={TutorsList} roles={["admin"]} />
                }
              />
              <Route
                path="/shop"
                element={
                  <PrivateRoute Component={ShopCourses} roles={["guardian"]} />
                }
              />
              {/* sid = student id, and cid = course id */}
              <Route
                path="book/trial/:sid/course/:cid"
                element={
                  <PrivateRoute Component={TrialBookingCalendar} roles={["guardian"]} />
                }
              />
              <Route
                path="/trial/:id"
                element={
                  <PrivateRoute Component={SelectCourses} roles={["guardian"]} />
                }
              />

              <Route
                path="/allTutors"
                element={
                  <PrivateRoute
                    Component={ViewAllTutors}
                    roles={["admin", "tutor", "guardian"]}
                  />
                }
              />
              <Route
                path="/tutorDash"
                element={
                  <PrivateRoute
                    Component={TutorDashboard}
                    roles={["admin", "tutor"]}
                  />
                }
              />
              <Route
                path="/class/:id"
                element={
                  <PrivateRoute
                    Component={ClassRecordForm}
                    roles={["tutor", "admin"]}
                  />
                }
              />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
