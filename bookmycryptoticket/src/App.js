import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Formpage from './Components/Home/Form/Form';

import Profile from './Components/Profile';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useEffect, useState } from "react";


function App() {
  const [page, setPage] = useState('');

  return (
    <BrowserRouter>
      <Navbar currentPage={page} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/form' element={<Formpage />} />
        <Route element={<Profile />} path='/profile' />
      </Routes>
      <Footer />
    </BrowserRouter>

  );




}

export default App;
