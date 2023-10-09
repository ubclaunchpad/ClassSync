import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import AddStudent from "./screens/addStudent/addStudent";
import Login from "./screens/login/index";
import './App.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
