import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/base';
import { Box } from '@mui/material';
import axios from 'axios';
import CreateProfile from './CreateProfile/CreateProfile.jsx';
import Interests from './Interests/Interests.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

function Main() {
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [interestClicked, setInterestClicked] = useState({});
  
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    if (!user) {
      navigate('/');
    }
    // Otherwise, create or get the user data.
    else {
      async function sendUser() {
        try {
          const response = await axios.post('/user/getOrCreateUser', {
            email: user.email,
          });
          const data = response.data;
          // if the response data doesn't include a bio, open the modal to prompt the user to create a profile
          if (!data.profileready) {
            setOpen(true);
          }
          // Otherwise, the profile has already been created therefore, set state.
          else {
            const interests = await axios.get(`/user/getInterests/${data.id}`);
            setUserData({ user: data, interests: interests.data });
          }
        } catch (error) {
          console.log(error);
        }
      }
      sendUser();
    }
  }, []);

  function handleClick(key) {
    if (interestClicked[key]) {
      setInterestClicked({
        ...interestClicked,
        [key]: false,
      });
    } else {
      setInterestClicked({
        ...interestClicked,
        [key]: true,
      });
    }
  }

  return (
    <div>
      <NavBar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CreateProfile onClose={handleClose} setUserData={setUserData} />
        </Box>
      </Modal>
      <div className='flex place-content-center space-x-10'>
        <Interests userData={userData} handleClick={handleClick} interestClicked={interestClicked} />
      </div>
    </div>
  );
}

export default Main;
