import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import AddStudent from "./screens/addStudent";
import TutorRegistration from "./screens/tutorRegistration";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/tutorRegistration" element={<TutorRegistration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
