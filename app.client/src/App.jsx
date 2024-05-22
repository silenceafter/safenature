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
import { Provider } from 'react-redux';
import store from './store/store';

const sections = [
  { title: 'Главная', url: '#' },
  { title: 'О нас', url: '#' },
  { title: 'Магазины-партнеры', url: '#' },
  { title: 'Товары бренда', url: '#' },
  { title: 'Карта пунктов приёма отходов', url: '#' },
];

const App = () => {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <CssBaseline />
              <Container maxWidth="lg">
                <Header title="SafeNature" sections={sections} />
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/callback" element={<Callback />} />
                </Routes>
              </Container>
              <Footer
                  title=""
                  description=""
              />
          </div>
        </Router>
      </Provider>
    );
};

export default App;