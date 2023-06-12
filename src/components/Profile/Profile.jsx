import React, { useEffect, useState } from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Card } from 'antd';
import { convertName, convertPlace } from '../../utils/userInputValidation.js';

const { Buffer } = require('buffer');

const { Paragraph } = Typography;
const { Meta } = Card;

function Profile() {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [city, setCity] = useState(null);
  const [username, setUsername] = useState(null);
  const [validFirstName, setValidFirstName] = useState(null);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(null);
  const [validLastName, setValidLastName] = useState(null);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(null);
  const [validBio, setValidBio] = useState(null);
  const [validLocation, setValidLocation] = useState(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState(null);

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
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setCity(user.city);
      setBio(user.bio);
      setUsername(user.username);
      const photo = Buffer.from(user.photo).toString('utf-8');
      const dataURI = `data:image/png;base64,${photo}`;
      setPhoto(dataURI);
    }
  }, [userData]);

  function handleFirstName(name) {
    if (!name) {
      setValidFirstName('invalid');
      setFirstNameErrorMessage('Please enter a first name.');
      return;
    }
    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(name)) {
      setValidFirstName('invalid');
      setFirstNameErrorMessage(
        'First names cannot contain any special characters.'
      );
      return;
    }

    const result = convertName(name);
    setValidFirstName('valid');
    setFirstName(result);
  }

  function handleLastName(name) {
    if (!name) {
      setValidLastName('invalid');
      setLastNameErrorMessage('Please enter a last name.');
      return;
    }
    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(name)) {
      setValidLastName('invalid');
      setLastNameErrorMessage(
        'Last names cannot contain any special characters.'
      );
      return;
    }

    const result = convertName(name);
    setValidLastName('valid');
    setLastName(result);
  }

  function handleBio(bio) {
    if (bio === '') {
      setValidBio('invalid');
      setBio('');
      return;
    }
    setValidBio('valid');
    setBio(bio);
  }

  function handleLocation(place) {
    if (place === '') {
      setValidLocation('invalid');
      setLocationErrorMessage('Please enter a location');
      return;
    }

    const regex = /[A-Za-z\s]+,\s[A-Za-z]{2}$/;
    if (!regex.test(place)) {
      setValidLocation('invalid');
      setLocationErrorMessage(
        'Please follow the correct format and re-enter your city and state'
      );

      return;
    }

    const convertedFormat = convertPlace(place);
    setValidLocation('valid');
    setCity(convertedFormat);
  }

  return (
    <div className='profileContainer'>
      <NavBar />
      <div className='flex items-center justify-center'>
        <Card style={{ width: 500 }}>
          <Meta
            avatar={<Avatar size={75} src={photo} />}
            title={'@' + username}
            description={
              <>
                First Name:
                <Paragraph editable={{ onChange: handleFirstName }}>
                  {firstName}
                </Paragraph>
                Last Name:
                <Paragraph editable={{ onChange: handleLastName }}>
                  {lastName}
                </Paragraph>
                Bio:
                <Paragraph editable={{ onChange: handleBio }}>{bio}</Paragraph>
                City:
                <Paragraph editable={{ onChange: handleLocation }}>
                  {city}
                </Paragraph>
                <div className='text-red-600'>
                  <p>
                    {validFirstName === 'invalid'
                      ? `${firstNameErrorMessage}`
                      : ''}
                  </p>
                  <p>
                    {validLastName === 'invalid'
                      ? `${lastNameErrorMessage}`
                      : ''}
                  </p>
                  <p>
                    {validBio === 'invalid' ? 'Please fill out your bio.' : ''}
                  </p>
                  <p>
                    {validLocation === 'invalid'
                      ? `${locationErrorMessage}`
                      : ''}
                  </p>
                </div>
              </>
            }
          />
        </Card>
      </div>
    </div>
  );
}

export default Profile;
