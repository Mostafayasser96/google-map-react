import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './components/login/login';
import Map from './components/map/map';
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/map' element={<Map />} />
       </Routes>
      </Router>
    </div>
  );
}

export default App;
