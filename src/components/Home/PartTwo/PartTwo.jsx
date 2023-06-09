import React from 'react';
import PublicMarket from './PublicMarket.jpg';
import './PartTwo.scss';
function PartTwo() {
  return (
    <div id='partTwo' className='p-20'>
      <div className='flex flex-wrap items-center mx-auto justify-center xl:space-x-[80px]'>
        {/* item 1 */}
        <div className='flex mt-8 mb-8 w-full w-[100vw] xl:w-[40vw]'>
          <img
            className='mx-auto rounded-lg'
            src={PublicMarket}
            alt='people'
          ></img>
        </div>
        {/* item 2 */}
        <div id='introduction' className=' w-[100vw] xl:w-[40vw]'>
          <h1 className='text-lg lg:text-2xl text-gray-800 mb-3'>
            A social networking platform designed to connect people by their
            shared interests and passions.
          </h1>
          <h1 className='text-md lg:text-lg text-gray-800 mt-8'>
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

export default PartTwo;
