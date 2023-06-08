import React, { useState, useEffect } from 'react';
import StepWizard from 'react-step-wizard';
import StepOne from './StepOne.jsx';
import StepTwo from './StepTwo.jsx';
import StepThree from './StepThree.jsx';
import StepFour from './StepFour.jsx';
import StepFive from './StepFive.jsx';
import StepSix from './StepSix.jsx';
import StepSeven from './StepSeven.jsx';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function CreateProfile({ onClose, setUserData }) {
  const { user } = useAuth0();

  const defaultProfile = {
    firstName: undefined,
    lastName: undefined,
    photo: undefined,
    username: undefined,
    city: undefined,
    bio: undefined,
    interests: undefined,
  };
  const [profile, setProfile] = useState(defaultProfile);
  const [profileCreated, setProfileCreated] = useState(false);

  const setFullName = (firstName, lastName) => {
    setProfile({
      ...profile,
      firstName: firstName,
      lastName: lastName,
    });
  };

  const setUsername = (username) => {
    setProfile({
      ...profile,
      username: username,
    });
  };

  const setLocation = (location) => {
    setProfile({
      ...profile,
      city: location,
    });
  };

  const setBio = (bio) => {
    setProfile({
      ...profile,
      bio: bio,
    });
  };

  const setInterests = (interests) => {
    setProfile({
      ...profile,
      interests: interests,
    });
  };

  const setPhoto = (photo) => {
    setProfile({
      ...profile,
      photo: photo,
    });
    setProfileCreated(true);
  };

  useEffect(() => {
    if (profileCreated) {
      console.log(profile);
      const formData = new FormData();
      for (const key in profile) {
        formData.append(key, profile[key]);
      }
      formData.append('email', user.email);

      const createUserProfile = async () => {
        try {
          const response = await axios.post('/user/createProfile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setUserData(response.data);
          // TODO: Set the user profile picture to the picture they uploaded when they created an account
        } catch (error) {
          console.log(error);
        }
      };
      createUserProfile();
      onClose();
    }
  }, [profileCreated]);

  return (
    <div className='createProfileContainer'>
      <StepWizard>
        <StepOne />
        <StepTwo setFullName={setFullName} />
        <StepThree setUsername={setUsername} />
        <StepFour setLocation={setLocation} />
        <StepFive setBio={setBio} />
        <StepSix setInterests={setInterests} />
        <StepSeven setPhoto={setPhoto} />
      </StepWizard>
    </div>
  );
}

export default CreateProfile;
