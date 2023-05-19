import React from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
import './Home.scss';
import PartOne from './PartOne/PartOne.jsx';
import PartTwo from './PartTwo/PartTwo.jsx';
import PartThree from './Part Three/PartThree.jsx';

function Home() {
  return (
    <div className='homeContainer'>
      <NavBar />
      <PartOne />
      <PartTwo />
      <PartThree />
    </div>
  );
}

export default Home;
