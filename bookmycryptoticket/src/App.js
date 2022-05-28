import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Formpage from './Components/Home/Form/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/form' element={<Formpage />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
