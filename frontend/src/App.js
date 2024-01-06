import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Confirmation from "./screens/confirmation";
import AddStudent from "./screens/addStudent";
import "./App.css";
import TutorProfile from "./screens/tutorProfile";
import RegisterTutor from "./screens/registerTutor";
import AddTutor from "./screens/addTutor";
import { TutorView } from "./screens/viewTutor/viewTutor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route path="/registerTutor" element={<RegisterTutor />} />
          <Route path="/add-tutor" element={<AddTutor />} />
          <Route path="/viewTutor" element={<TutorView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
