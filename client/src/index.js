import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);