import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import AddStudent from "./screens/addStudent";
import AddTutor from "./screens/addTutor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/add-tutor" element={<AddTutor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
