import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';

function StepFive({ nextStep, previousStep, setBio }) {
  const [description, setDescription] = useState('');
  const [valid, setValid] = useState('');


  const handleFormSubmit = () => {
    if (description === '') {
      setValid('invalid');
      return;
    }
    setValid('valid');
    setBio(description);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1 className='my-5'>Tell us more about yourself!</h1>
        <p className='mb-4 text-red-500'>
          {valid === 'invalid' ? 'Please fill out your bio.' : ''}
        </p>
        <input
          className={`mt-2 rounded-xl text-center ${valid} ${
            valid === 'invalid' ? 'border-2 border-red-500' : ''
          }`}
          type='text'
          name='bio'
          onChange={(event) => {
            setValid('validation pending');
            setDescription(event.target.value);
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

export default StepFive;
