import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/base';
import { Box } from '@mui/material';
import axios from 'axios';
import CreateProfile from './CreateProfile/CreateProfile.jsx';
import Interests from './Interests/Interests.jsx';
import Map from './Map/Map.jsx';
import { FaMicrophone, FaSearch } from 'react-icons/fa';

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
  const [inputField, setInputField] = useState([]);
  const [position, setPosition] = useState({ address: undefined });

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
            // TODO: Set the user profile picture to the picture they uploaded when they created an account
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

  function finalPosition() {
    setPosition({ address: inputField });
  }

  function addToInput(event) {
    setInputField(event.target.value);
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
      {/* Search bar here */}
      <div className='max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl pb-10'>
        <div className='md:flex'>
          <div className='w-full p-3'>
            <div className='relative'>
              <span className='absolute top-5 left-4 border-r pr-4'>
                <FaMicrophone className=' text-gray-400 hover:text-green-500 hover:cursor-pointer' />
              </span>

              <input
                type='text'
                className='pl-16 bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer'
                name=''
                onChange={addToInput}
              />
              <span className='absolute top-5 right-5 cursor-pointer'>
                {/* TODO: On click, we need to search for the location provided and populate all groups on a map with the selected interests */}
                <FaSearch
                  onClick={finalPosition}
                  className='text-gray-500 hover:text-gray-600'
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Interest icons here */}
      <div className='flex place-content-center space-x-10'>
        <Interests
          userData={userData}
          handleClick={handleClick}
          interestClicked={interestClicked}
        />
      </div>
      {/* Map here */}
      <div>
        <Map position={position} />
      </div>
    </div>
  );
}

export default Main;
