import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Confirmation from "./screens/confirmation";
import AddStudent from "./screens/addStudent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/addStudent" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
