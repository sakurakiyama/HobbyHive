import React, { useEffect, useState } from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography } from 'antd';
const { Buffer } = require('buffer');

const { Paragraph } = Typography;

function Profile() {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [city, setCity] = useState(null);

  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    if (!user) {
      navigate('/');
    }
    // Otherwise get the user data.
    else {
      async function getUser() {
        try {
          const { data } = await axios.post('/user/getAllUserData', {
            email: user.email,
          });
          setUserData({ user: data.user, interests: data.interests });
        } catch (error) {
          console.log(error);
        }
      }
      getUser();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const { user } = userData;
      console.log(user);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setCity(user.city);
      setBio(user.bio);
      const photo = Buffer.from(user.photo).toString('utf-8');
      const dataURI = `data:image/png;base64,${photo}`;
      setPhoto(dataURI);
    }
  }, [userData]);
  return (
    <div className='profileContainer'>
      <NavBar />
      <div className='flex items-center justify-center'>
        <div className='items-center text-center w-100'>
          <Avatar size={75} src={photo} />

          <Paragraph editable={{ onChange: setFirstName }}>
            {firstName}
          </Paragraph>
          <Paragraph editable={{ onChange: setLastName }}>{lastName}</Paragraph>
          <Paragraph editable={{ onChange: setBio }}>{bio}</Paragraph>
          <Paragraph editable={{ onChange: setCity }}>{city}</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Profile;
