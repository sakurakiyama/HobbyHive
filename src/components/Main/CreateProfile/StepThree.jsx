import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
function StepThree({ nextStep, previousStep, setUsername }) {
  const [nickname, setNickname] = useState('');
  const handleFormSubmit = () => {
    // TODO: Add functionality to make sure that the username is unique and doesn't contain any symbols
    setUsername(nickname);
    nextStep();
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center text-center'>
        <h1 className='my-5'>
          Show us your creative side and think of something that reflects your
          personality and interests. Don't be afraid to get creative and have
          some fun with it!{' '}
        </h1>
        <input
          className='rounded-xl text-center'
          type='text'
          name='username'
          placeholder='username'
          onChange={(event) => {
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
