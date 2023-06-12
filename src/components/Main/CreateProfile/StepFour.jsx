import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import { convertPlace } from '../../../utils/userInputValidation';

function StepFour({ nextStep, previousStep, setLocation }) {
  const [place, setPlace] = useState('');
  const [valid, setValid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = () => {
    if (place === '') {
      setValid('invalid');
      setErrorMessage('Please enter a city and state.');
      return;
    }
    const regex = /[A-Za-z\s]+,\s[A-Za-z]{2}$/;
    if (!regex.test(place)) {
      setValid('invalid');
      setErrorMessage(
        'Please follow the correct format and re-enter your city and state.'
      );
      return;
    }

    const convertedPlace = convertPlace(place);
    setValid('valid');
    setLocation(convertedPlace);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1 className='my-5'>What city are you based in?</h1>
        <p className='mb-4 text-red-500'>
          {valid === 'invalid' ? `${errorMessage}` : ''}
        </p>
        <input
          className={`mt-2 rounded-xl text-center ${valid} ${
            valid === 'invalid' ? 'border-2 border-red-500' : ''
          }`}
          type='text'
          name='location'
          placeholder='eg: Brooklyn, NY'
          onChange={(event) => {
            setValid('validation pending');
            setPlace(event.target.value);
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

export default StepFour;
