import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Components
import {Login} from './components/Login';
import { Register } from './components/Register';
// import { Signup } from './components/Signup';
import { Profile } from './components/Profile';
import { Dashboard } from './components/Dashboard';
import { BookUser } from './components/BookUser';
import { ErrorPage } from './components/ErrorPage';

// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/book/:user" element={<BookUser />}/>
          <Route path="/error" element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}


export default App;
