import React from 'react';
import TextLogo from '../../images/TextLogo.png';
import './NavBar.scss';
function NavBar() {
  return (
    <div id='navBarContainer'>
      <div id='left'>
        <img className='textLogo' alt='bee hobby hive' src={TextLogo}></img>
      </div>
      <div className='spacer'></div>
      <div id='right'></div>
    </div>
  );
}

export default NavBar;
