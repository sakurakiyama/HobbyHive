import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home.jsx'
import SignUp from './CreateProfile/CreateProfile.jsx';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/signup' element={<SignUp />}></Route>
    </Routes>
  );
}

export default App;
