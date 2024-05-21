import { useEffect, useState } from 'react';
import { UserManager } from 'oidc-client';
import './app.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import theme from './theme'; // Ваш файл темы Material-UI
import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Callback } from './pages/callback';
import { Layout } from './components/layout';

function App() {
    return (
      <>
        <Router>
          <div className="App">
              <Routes>
                  <Route exact path="/" element={<Layout />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/callback" element={<Callback />} />
              </Routes>
          </div>
        </Router>
      </>
    );
}

export default App;