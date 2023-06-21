import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home.jsx';
import SignUp from './Main/CreateProfile/CreateProfile.jsx';
import Main from './Main/Main.jsx';
import Profile from './Profile/Profile.jsx';
import UserGroups from './Groups/UserGroups.jsx';
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/signup' element={<SignUp />}></Route>
      <Route exact path='/main' element={<Main />}></Route>
      <Route exact path='/profile' element={<Profile />}></Route>
      <Route exact path='/groups' element={<UserGroups />}></Route>
    </Routes>
  );
}

export default App;
