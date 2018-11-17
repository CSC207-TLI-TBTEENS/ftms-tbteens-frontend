import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import Navbar from './Navbar';

const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Main/>
    </div>
  </Router>
)

export default App;
