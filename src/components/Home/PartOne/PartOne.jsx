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
    <div className='flex items-center mx-auto justify-center space-x-[25px]'>
    <div className='w-[40vw] mt-40'>
      <div className='flex item-middle'>
        <h1 className='text-4xl text-gray-800'> Join a community of </h1>
        <h1 className='table ml-2 text-gray-800 text-4xl px-2 border-2 border-solid border-[#e8ca1f] rounded-md'>
          <TextTransition springConfig={presets.spring}>
            {hobbies[index % hobbies.length]}
          </TextTransition>
        </h1>
      </div>
      <h1 className='text-4xl text-gray-800 leading-normal'>
        enthusiasts, share your experiences and build a community.
      </h1>
      <GettingStartedButton />
    </div>
    <ChatBox />
  </div>
  );
}

export default SectionOne;