import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';

function StepFour({ nextStep, previousStep, setLocation }) {
  const [place, setPlace] = useState('');

  const handleFormSubmit = () => {
    // TODO: Add functionality to make sure the field is filled out. 
    // TODO: Add functionality to make this a drop down. 
    setLocation(place);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1>What city are you based in?</h1>
        <label className='my-5'>City and State</label>
        <input
          className='rounded-xl text-center'
          type='text'
          name='location'
          placeholder='eg: Brooklyn, NY'
          onChange={(event) => {
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
