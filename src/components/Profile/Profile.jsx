import React, { useEffect, useState } from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Avatar,
  Typography,
  Card,
  Select,
  Space,
  Skeleton,
} from 'antd';
import { convertName, convertPlace } from '../../utils/userInputValidation.js';

const { Buffer } = require('buffer');

const { Paragraph } = Typography;
const { Meta } = Card;

// TODO: Add functionality for updating profile picture
function Profile() {
  const [userData, setUserData] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState(null);
  const [allInterests, setAllInterests] = useState(null);
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
  const [validInterests, setValidInterests] = useState(null);
  const [loading, setLoading] = useState(true);

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

          // Set selected interests.
          const interests = data.interests;
          const selected = [];
          for (const element of interests) {
            selected.push(element.interest);
          }
          setSelectedInterests(selected);

          // Set interest options.
          const response = await axios.get('/interests/getInterests');
          const allInterests = response.data;

          const options = [];

          for (let i = 0; i < allInterests.length; i++) {
            options.push({
              label: allInterests[i].interest,
              value: allInterests[i].interest,
            });
          }
          setAllInterests(options);
        } catch (error) {
          console.log(error);
        }
      }
      getUser();
    }
  }, []);

  // Once the userData state is set, set the input fields with the current user information.
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
      setLoading(false);
    }
  }, [userData]);

  // Validate first name changes.
  function handleFirstName(name) {
    if (!name) {
      setValidFirstName('invalid');
      setFirstNameErrorMessage('Please enter a first name.');

      setTimeout(() => {
        setValidFirstName('valid');
      }, 2000);
      return;
    }

    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(name)) {
      setValidFirstName('invalid');
      setFirstNameErrorMessage(
        'First names cannot contain any special characters.'
      );
      setTimeout(() => {
        setValidFirstName('valid');
      }, 2000);
      return;
    }

    const result = convertName(name);
    setValidFirstName('valid');
    setFirstName(result);
  }

  // Validate last name changes.
  function handleLastName(name) {
    if (!name) {
      setValidLastName('invalid');
      setLastNameErrorMessage('Please enter a last name.');
      setTimeout(() => {
        setValidLastName('valid');
      }, 2000);
      return;
    }
    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(name)) {
      setValidLastName('invalid');
      setLastNameErrorMessage(
        'Last names cannot contain any special characters.'
      );
      setTimeout(() => {
        setValidLastName('valid');
      }, 2000);
      return;
    }

    const result = convertName(name);
    setValidLastName('valid');
    setLastName(result);
  }

  // Validate bio changes.
  function handleBio(bio) {
    if (bio === '') {
      setValidBio('invalid');
      setTimeout(() => {
        setValidBio('valid');
      }, 2000);
      return;
    }
    setValidBio('valid');
    setBio(bio);
  }

  // Validate city changes.
  function handleLocation(place) {
    if (place === '') {
      setValidLocation('invalid');
      setLocationErrorMessage('Please enter a location');
      setTimeout(() => {
        setValidLocation('valid');
      }, 2000);
      return;
    }

    const regex = /[A-Za-z\s]+,\s[A-Za-z]{2}$/;
    if (!regex.test(place)) {
      setValidLocation('invalid');
      setLocationErrorMessage(
        'Please follow the correct format and re-enter your city and state'
      );
      setTimeout(() => {
        setValidLocation('valid');
      }, 2000);
      return;
    }

    const convertedFormat = convertPlace(place);
    setValidLocation('valid');
    setCity(convertedFormat);
  }

  // Add an interest.
  function addInterest(value) {
    setSelectedInterests([...selectedInterests, value]);
  }

  // Remove an interest.
  function removeInterest(value) {
    // If there's only one item in the list, it cannot be removed.
    if (selectedInterests.length <= 1) {
      setValidInterests('invalid');
      setTimeout(() => {
        setValidInterests('valid');
      }, 2000);
      return;
    }
    setSelectedInterests(
      selectedInterests.filter((element) => {
        return element !== value;
      })
    );
  }

  async function handleSubmit() {
    const { data } = await axios.patch('/user/updateProfile', {
      email: user.email,
      interests: selectedInterests,
      firstname: firstName,
      lastname: lastName,
      bio: bio,
      city: city,
    });

    // TODO: On save, show user green string 'saved'.
  }

  return (
    <div className='profileContainer'>
      <NavBar />
      <div className='flex items-center justify-center'>
        <Card style={{ width: 500 }}>
          <Skeleton active loading={loading}>
            <Meta
              avatar={<Avatar size={75} src={photo} />}
              title={'@' + username}
              description={
                <>
                  {/* <div className='h-4 w-[200px] bg-slate-200 animate-pulse rounded	'></div> */}
                  First Name:
                  <Paragraph editable={{ onChange: handleFirstName }}>
                    {firstName}
                  </Paragraph>
                  Last Name:
                  <Paragraph editable={{ onChange: handleLastName }}>
                    {lastName}
                  </Paragraph>
                  Bio:
                  <Paragraph editable={{ onChange: handleBio }}>
                    {bio}
                  </Paragraph>
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
                      {validBio === 'invalid'
                        ? 'Please fill out your bio.'
                        : ''}
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
          </Skeleton>

          <div className='mt-[25px] text-center'>
            {selectedInterests && (
              <Space style={{ width: '80%' }} direction='vertical'>
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  value={selectedInterests}
                  onDeselect={removeInterest}
                  onSelect={addInterest}
                  options={allInterests}
                />
              </Space>
            )}
            <p className='text-red-600'>
              {validInterests === 'invalid'
                ? 'You must select at least one interest'
                : ''}
            </p>
          </div>
        </Card>
      </div>
      <div className='text-center mt-[25px]'>
        <Button
          style={{ background: 'white', borderColor: 'grey' }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Profile;
