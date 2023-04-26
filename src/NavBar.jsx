import React from 'react';
import textLogo from './images/textLogo.png';
import './styles/navBar.scss'
function NavBar() {
  return (
    <div id='navBarContainer'>
      <div id='left'>
        <img className='textLogo' alt='bee hobby hive' src={textLogo}></img>
      </div>
      <div className='spacer'></div>
      <div id='right'></div>
    </div>
  );
}

export default NavBar;
