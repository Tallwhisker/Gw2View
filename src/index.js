import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Header from './pages/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Bltp from './pages/bltp/Bltp';
import Search from './pages/search/Search';

import MaterialStorage from './pages/inventory/MaterialStorage';
import Bank from './pages/inventory/Bank';
import Bags from './pages/inventory/Bags';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />}/>
          <Route path='materialstorage' element={<MaterialStorage />}/>
          <Route path='bags' element={<Bags />}/>
          <Route path='bank' element={<Bank />}/>
          <Route path='bltp' element={<Bltp />}/>
          <Route path='search' element={<Search />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
