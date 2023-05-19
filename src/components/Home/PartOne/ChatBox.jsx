import React from 'react';
import './PartOne.scss';
import PersonA from './PersonA.png';
import PersonB from './PersonB.png';
import { Avatar } from '@mui/material';

function ChatBox() {
  return (
    <div className='chatBox'>
      <div className='max-w-screen-sm mx-auto p-4 w-[100vw] lg:w-[40vw]'>
        <div className='bg-white rounded-lg shadow-lg p-6 pb-5'>
          <div className='space-y-4'>
            <div className='flex space-x-1 items-end justify-end message-animation message-animation-1'>
              <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  Heyyy, I saw your post in the pottery group and I'm obsessed
                  with your work!
                </p>
              </div>
              <Avatar alt='Person A' src={PersonA} />
            </div>
            <div className='flex space-x-1 items-end message-animation message-animation-2'>
              <Avatar alt='Person B' src={PersonB} />
              <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  Yooo, thanks so much! Pottery is my jam. What kind of pieces
                  do you like to make?
                </p>
              </div>
            </div>
            <div className='flex space-x-1 items-end justify-end message-animation message-animation-3'>
              <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  I'm really into making planters and mugs right now. I love
                  incorporating funky colors and textures.
                </p>
              </div>
              <Avatar alt='Person A' src={PersonA} />
            </div>
            <div className='flex space-x-1 items-end message-animation message-animation-4'>
              <Avatar alt='Person B' src={PersonB} />
              <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  Same! Have you tried any new glazes lately? I just got my
                  hands on this amazing neon pink and I'm in love.
                </p>
              </div>
            </div>
            <div className='flex space-x-1 items-end justify-end message-animation message-animation-5'>
              <div className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  No way! I've been dying to try a neon color. Where did you
                  find it?
                </p>
              </div>
              <Avatar alt='Person A' src={PersonA} />
            </div>
            <div className='flex space-x-1 items-end message-animation message-animation-6'>
              <Avatar alt='Person B' src={PersonB} />
              <div className='bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm max-w-xs'>
                <p>
                  I found it at this cool art supply store downtown. We should
                  totally hit it up together sometime!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
