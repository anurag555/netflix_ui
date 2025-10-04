import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './element/Home/Home';
import Header from './element/Header/Header';
import "./App.scss"

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
