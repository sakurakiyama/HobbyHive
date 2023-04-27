import React from 'react';
import NavBar from '../NavigationBar/NavBar.jsx'
import './Home.scss';
import PartOne from './PartOne/PartOne.jsx'
import PartTwo from './PartTwo/PartTwo.jsx'


function Home() {

  return (
    <div className='homeContainer'>
      <NavBar />
      <PartOne />
      <PartTwo />
    </div>
  );
}

export default Home;
