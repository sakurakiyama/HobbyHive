import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';

function StepSeven({ previousStep, setPhoto }) {
  const [selectedFile, setSelectedFile] = useState('');
  const [valid, setValid] = useState('');

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = () => {
    if (selectedFile === '') {
      setValid('invalid');
      return;
    }
    setValid('valid');
    setPhoto(selectedFile);
  };

  return (
    <div className='stepContainer'>
      <form className='flex flex-col items-center'>
        <h1 className='my-5'>Upload a photo</h1>
        <p className='mb-4 text-red-500'>
          {valid === 'invalid' ? 'Please upload a photo.' : ''}
        </p>
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
