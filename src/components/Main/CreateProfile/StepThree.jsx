import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import axios from 'axios';

function StepThree({ nextStep, previousStep, setUsername }) {
  const [nickname, setNickname] = useState('');
  const [valid, setValid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async () => {
    // Check to see if the username has any special characters other than underscores and periods.
    const regex = /[^A-Za-z0-9_.]/;
    // If it does, show error message and prevent from going to next.
    if (regex.test(nickname)) {
      setValid('invalid');
      setErrorMessage(
        'Username cannot include special characters except underscores and periods.'
      );
      return;
    } else {
      // If there are no invalid characters, check to see if the username is unique.
      setErrorMessage('');
      const { data } = await axios.get('/user/uniqueUsername', {
        params: { username: nickname },
      });
      // If it's not unique, show error message and prevent from going to next.
      if (!data) {
        setValid('invalid');
        setErrorMessage(
          'Sorry, the username you entered is already in use. Please choose a different username.'
        );
        return;
      }
    }
    // Otherwise, go to the next step.
    setValid('valid');
    setUsername(nickname);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center text-center'>
        <h1 className='my-5'>
          Show us your creative side and think of something that reflects your
          personality and interests. Don't be afraid to get creative and have
          some fun with it!
        </h1>
        <p className='mb-4 text-red-500'>
          {valid === 'invalid' ? `${errorMessage}` : ''}
        </p>

        <input
          className={`mt-2 rounded-xl text-center ${valid} ${
            valid === 'invalid' ? 'border-2 border-red-500' : ''
          }`}
          type='text'
          name='username'
          placeholder='username'
          onChange={(event) => {
            setValid('validation pending');
            setNickname(event.target.value);
          }}
        />
      </form>
      <div className='flex flex-row justify-between w-full'>
        <button
          className='mt-5 animate-pulse px-5 py-2'
          onClick={() => {
            previousStep();
          }}
        >
          <BsArrowLeftCircleFill size={30} color={'#e8ac1f'} />
        </button>
        <button
          className='mt-5 animate-pulse px-5 py-2'
          onClick={() => {
            handleFormSubmit();
          }}
        >
          <BsArrowRightCircleFill size={30} color={'#e8ac1f'} />
        </button>
      </div>
    </div>
  );
}

export default StepThree;
