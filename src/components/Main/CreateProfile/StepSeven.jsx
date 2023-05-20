import React, { useState } from 'react';
import './Steps.scss';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';

function StepSeven({ nextStep, previousStep, setPhoto }) {
  const [selectedFile, setSelectedFile] = useState('');

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = () => {
    // TODO: Add functionality to make sure there's a file
    setPhoto(selectedFile);
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1>Upload a photo</h1>
        <label className='my-5'>Photo</label>
        <input type='file' name='file' onChange={changeHandler} />
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

export default StepSeven;
