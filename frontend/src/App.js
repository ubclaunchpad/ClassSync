import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import AddStudent from "./screens/addStudent";
import Login from "./screens/login";
import './App.css';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
