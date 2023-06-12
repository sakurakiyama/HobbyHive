import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import { convertName } from '../../../utils/userInputValidation';

function StepTwo({ nextStep, previousStep, setFullName }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [valid, setValid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = () => {
    // If either fields are not filled out, do not let them proceed.
    if (firstName === '' || lastName === '') {
      setValid('invalid');
      setErrorMessage('Please enter a first name and/ last name.');
      return;
    }

    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(firstName) || !regex.test(lastName)) {
      setValid('invalid');
      setErrorMessage(
        'First and last names cannot contain any special characters.'
      );
      return;
    }

    const first = convertName(firstName);
    const last = convertName(lastName);
    setValid('valid');
    setFullName(first, last);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1 className='my-5'>What's your name?</h1>
        <p className='mb-4 text-red-500'>
          {valid === 'invalid' ? `${errorMessage}` : ''}
        </p>

        <input
          className={`mt-2 rounded-xl text-center ${valid} ${
            valid === 'invalid' ? 'border-2 border-red-500' : ''
          }`}
          type='text'
          name='firstName'
          placeholder='first name'
          onChange={(event) => {
            setValid('validation pending');
            setFirstName(event.target.value);
          }}
        />
        <input
          className={`mt-2 rounded-xl text-center ${valid} ${
            valid === 'invalid' ? 'border-2 border-red-500' : ''
          }`}
          type='text'
          name='lastName'
          placeholder='last name'
          onChange={(event) => {
            setValid('validation pending');
            setLastName(event.target.value);
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

export default StepTwo;
