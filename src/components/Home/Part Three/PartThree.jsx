import React from 'react';
import Introduction from './Introduction.mp4';

function PartThree() {
  return (
    <div>
      <video
        className='w-full'
        loop
        controls
        autoPlay={true}
        muted
        src={Introduction}
      ></video>
    </div>
  );
}

export default PartThree;
