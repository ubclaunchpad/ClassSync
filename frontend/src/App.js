import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

return (
  <div className="App">
    <BrowserRouter>
      <Routes>  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  </div>
);


export default App;