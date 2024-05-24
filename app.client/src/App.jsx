import './app.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Callback } from './pages/callback';
import { Home } from './pages/home';
import { Account } from './pages/account';
import { About } from './pages/about';
import { Partners } from './pages/partners';
import { Products } from './pages/products';
import { Points } from './pages/points';
import { Article } from './pages/article';
import { AccessDenied } from './pages/accessDenied';
import { BonusExchange } from './pages/bonusExchange';
import { BonusCalculation } from './pages/bonusCalculation';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'markdown-to-jsx';

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
            <main>
              <Routes>
                  <Route path="/" element={<Home />} />
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
                  <Route path="/article" element={<Article />} />
                  <Route path="/access-denied" element={<AccessDenied />} />
              </Routes>
            </main>
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