import React, { useState } from 'react';
import './Steps.scss';
import { BsArrowRightCircleFill } from 'react-icons/bs';

function StepTwo({ nextStep, setFullName }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFormSubmit = () => {
    // TODO: Add functionality to make sure there are no numbers or symbols
    setFullName(firstName, lastName);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1>What's your name?</h1>
        <input
          className='rounded-xl my-5 text-center'
          type='text'
          name='firstName'
          placeholder='first name'
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <input
          className='rounded-xl text-center'
          type='text'
          name='lastName'
          placeholder='last name'
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </form>
      <div className='flex flex-col items-center'>
        <button
          className='mt-5 animate-pulse px-5 py-2 '
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
