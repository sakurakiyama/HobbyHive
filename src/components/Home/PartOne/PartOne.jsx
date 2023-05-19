import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import GettingStartedButton from './GettingStartedButton.jsx';
import ChatBox from './ChatBox.jsx';

const hobbies = [
  'bicycling',
  'pottery',
  'bee keeping',
  'cooking',
  'reading',
  'painting',
  'dancing',
  'baking',
  'photography',
  'hiking',
  'gardening',
];

function SectionOne() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className='flex flex-wrap items-center mx-auto justify-center space-x-[25px] pb-[40px]'>
      <div
        id='tagline'
        className='text-center justify-center w-[100vw] lg:w-[50vw] mt-40'
      >
        <div className='flex flex-col item-middle text-center justify-center'>
          <h1 className='text-gray-800 text-2xl lg:text-4xl'>
            Join a growing community of
          </h1>
          <h1 className='table mx-auto text-gray-800 text-2xl lg:text-4xl px-2 border-2 border-solid border-[#e8ca1f] rounded-md'>
            <TextTransition springConfig={presets.spring}>
              {hobbies[index % hobbies.length]}
            </TextTransition>
          </h1>
        </div>
        <h1 className='text-2xl lg:text-4xl text-gray-800'>
          enthusiasts and share your experiences.
        </h1>
        <GettingStartedButton />
      </div>
      <ChatBox />
    </div>
  );
}

export default SectionOne;
