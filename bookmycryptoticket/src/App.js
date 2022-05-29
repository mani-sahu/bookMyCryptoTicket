import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Formpage from './Components/Home/Form/Form';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/form' element={<Formpage />} />
        <Route element={<Profile />} path='/profile' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
