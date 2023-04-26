import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import './styles/home.scss';
import TextTransition, { presets } from 'react-text-transition';
import peopleHero from './images/hero.jpg';

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

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className='homeContainer'>
      <NavBar />
      {/* section one*/}
      <div className='flex items-center mx-auto justify-center space-x-[25px]'>
        <div className='w-[40vw] mt-40'>
          <div className='flex item-middle'>
             {/* tag line and getting started */}
            <h1 className='text-4xl text-gray-800'> Join a community of </h1>
            <h1 className='table ml-2 text-gray-800 text-4xl px-2 border-2 border-solid border-[#e8ca1f] rounded-md'>
              <TextTransition springConfig={presets.wobbly}>
                {hobbies[index % hobbies.length]}
              </TextTransition>
            </h1>
          </div>
          <h1 className='text-4xl text-gray-800 leading-normal'>
            {' '}
            enthusiasts, share your experiences and build a community.
          </h1>
          <div className='buttons'>
            <button className='blob-btn'>
              GET STARTED
              <span className='blob-btn__inner'>
                <span className='blob-btn__blobs'>
                  <span className='blob-btn__blob'></span>
                  <span className='blob-btn__blob'></span>
                  <span className='blob-btn__blob'></span>
                  <span className='blob-btn__blob'></span>
                </span>
              </span>
            </button>
            <br />

            <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
              <defs>
                <filter id='goo'>
                  <feGaussianBlur
                    in='SourceGraphic'
                    result='blur'
                    stdDeviation='10'
                  ></feGaussianBlur>
                  <feColorMatrix
                    in='blur'
                    mode='matrix'
                    values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7'
                    result='goo'
                  ></feColorMatrix>
                  <feBlend in2='goo' in='SourceGraphic' result='mix'></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
         {/* chat box */}
        <div className='chatBox'>
          <div className='max-w-screen-sm mx-auto p-4 w-[40vw]'>
            <div className='bg-white rounded-lg shadow-lg p-6 pb-5'>
              <div className='space-y-4'>
                <div className='flex items-end justify-end message-animation message-animation-1'>
                  <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      Heyyy, I saw your post in the pottery group and I'm
                      obsessed with your work!
                    </p>
                  </div>
                </div>
                <div className='flex items-end message-animation message-animation-2'>
                  <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      Yooo, thanks so much! Pottery is my jam. What kind of
                      pieces do you like to make?
                    </p>
                  </div>
                </div>
                <div className='flex items-end justify-end message-animation message-animation-3'>
                  <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      I'm really into making planters and mugs right now. I love
                      incorporating funky colors and textures.
                    </p>
                  </div>
                </div>
                <div className='flex items-end message-animation message-animation-4'>
                  <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      Same! Have you tried any new glazes lately? I just got my
                      hands on this amazing neon pink and I'm in love.
                    </p>
                  </div>
                </div>
                <div className='flex items-end justify-end message-animation message-animation-5'>
                  <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      No way! I've been dying to try a neon color. Where did you
                      find it?
                    </p>
                  </div>
                </div>
                <div className='flex items-end message-animation message-animation-6'>
                  <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                    <p>
                      I found it at this cool art supply store downtown. We
                      should totally hit it up together sometime!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section two */}
      <div
        id='sectionTwo'
        className='flex items-center mx-auto justify-center space-x-[25px]'
      >
        {/* large hero photo */}
        <div className='mt-8 mb-8'>
          <img
            className='max-w-screen-md mx-auto rounded-lg'
            src={peopleHero}
            alt='people'
          ></img>
        </div>
        <div className='w-[40vw]'>
          <h1 className='text-2xl text-gray-800 mb-3'>
            A social networking platform designed to connect people by their
            shared interests and passions.
          </h1>
          <h1 className='text-md text-gray-800'>
            We understand that having a shared interest is one of the most
            effective ways to connect with others. That's why we've built a
            platform that allows users to join groups based on their hobbies,
            connect with like-minded individuals, and plan events to enjoy their
            hobbies together. Whether you're into sports, art, music, cooking,
            gaming, or any other hobby, you'll be able to find a group of people
            who share your interests and are excited to connect.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
