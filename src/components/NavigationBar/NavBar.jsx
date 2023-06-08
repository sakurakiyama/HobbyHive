import React, { useState, useEffect } from 'react';
import TextLogo from '../../images/TextLogo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Menu } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { VscMail } from 'react-icons/vsc';

// TODO: Remove font family but add other themes in the future
const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand sans-serif',
  },
});

function NavBar() {
  const { user, logout } = useAuth0();
  const [userPhoto, setUserPhoto] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = anchorEl;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserPhoto(user.picture);
    }
  }, [user]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseDropDown() {
    setAnchorEl(null);
  }

  function exit() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  return (
    <div
      id='navBarContainer'
      className='pl-[50px] pr-[50px] flex items-center w-full	h-[100px]'
    >
      <div className='flex float-left'>
        <img
          className='w-[300px] h-auto'
          alt='bee hobby hive'
          src={TextLogo}
        ></img>
      </div>
      <div className='w-full'></div>
      <div className='flex float-right space-x-4 min-w-[40px] '>
        <button>
          <VscMail size={35} />
        </button>
        <button
          className='outline-0 border-none cursor-pointer position-relative bg-transparent touch-manipulation  '
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {user ? (
            <img
              alt='User Profile'
              className='max-w-[40px] xs:max-w-[30px] rounded-full'
              src={userPhoto}
            />
          ) : null}
        </button>
        <ThemeProvider theme={theme}>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open ? true : false}
            onClose={handleCloseDropDown}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={handleCloseDropDown}>My Account</MenuItem>
            <MenuItem onClick={handleCloseDropDown}>My Groups</MenuItem>
            <MenuItem onClick={() => exit()}>Logout</MenuItem>
          </Menu>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default NavBar;
