import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import AddStudent from "./screens/addStudent";
import './App.css';
import TutorProfile from "./screens/tutorProfile";
import RegisterTutor from "./screens/registerTutor";
import AddTutor from "./screens/addTutor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route path="/registerTutor" element={<RegisterTutor />} />
          <Route path="/add-tutor" element={<AddTutor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;