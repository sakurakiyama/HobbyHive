import React, { useState } from 'react';
import './Steps.scss';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';


function StepFive({nextStep, previousStep, setBio}) {
  const [description, setDescription] = useState('')

  const handleFormSubmit = () => {
    // TODO: Add functionality to make sure the field is filled out. 
    setBio(description);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1 className='my-5'>Tell us more about yourself!</h1>
        <input
          className='rounded-xl'
          type='text'
          name='bio'
          onChange={(event) => {
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
