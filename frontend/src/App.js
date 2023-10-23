import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import AddStudent from "./screens/addStudent";
import TutorRegistration from "./screens/tutorRegistration";
import './App.css';
import TutorProfile from "./screens/tutorProfile";
import RegisterTutor from "./screens/registerTutor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/tutorRegistration" element={<TutorRegistration />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route path="/registerTutor" element={<RegisterTutor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;