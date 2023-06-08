import React from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';

function StepOne({ nextStep }) {
  const handleFormSubmit = () => {
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <div className='flex flex-col items-center text-center'>
        <p className='my-5'>
          Before you begin, you'll need to create a profile! Create your profile
          effortlessly on our website in just two minutes. No more boring forms
          or never-ending questions - we totally get you and respect your time.
          Join us now and unlock a world of possibilities in a vibrant
          community. Get started now!
        </p>
      </div>
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

export default StepOne;
