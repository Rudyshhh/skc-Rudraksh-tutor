import './App.css';
import React from 'react';
import Home from './components/home';
import ScrollToTop from './components/scroll';
import PythonTutor from './tutor'; 
import PYQuiz from './PYQuiz';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App" style={{margin:0, padding:0}}>
      <ScrollToTop />
      <Routes>
      <Route path="/" exact element={<PythonTutor/>}></Route>
      <Route path="/PYQuiz" element={<PYQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
