import { UserManager } from 'oidc-client';
import './app.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import theme from './theme'; // Ваш файл темы Material-UI
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Callback } from './pages/callback';
import { Layout } from './components/layout';
import { Account } from './pages/account';
import { About } from './pages/about';
import { Partners } from './pages/partners';
import { Products } from './pages/products';
import { Points } from './pages/points';
import { AccessDenied } from './pages/accessDenied';
import { BonusExchange } from './pages/bonusExchange';
import { BonusCalculation } from './pages/bonusCalculation';
import { Link, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';
import Sidebar from './components/sidebar';
import MainFeaturedPost from './components/mainFeaturedPost';
import FeaturedPost from './components/featuredPost';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import store from './store/store';

const App = () => {
  const { email, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //
  return (    
    <Router>
      <div className="App">
        <CssBaseline />
          <Container maxWidth="lg">
            <Header title="SafeNature" />
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/account" element={<Account />} />
                <Route path="/about" element={<About />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/products" element={<Products />} />
                <Route path="/points" element={<Points />} />
                <Route path="/bonus-exchange" element={<BonusExchange />} />
                <Route path="/bonus-calculation" element={<BonusCalculation />} />
                <Route path="/access-denied" element={<AccessDenied />} />
            </Routes>
          </Container>
          <Footer
              title=""
              description=""
          />
      </div>
    </Router> 
  );
};

export default App;