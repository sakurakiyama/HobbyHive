import React, { useState, useEffect } from 'react';

function Interests({ userData, handleClick, interestClicked }) {
  return (
    <>
      {userData &&
        userData.interests &&
        userData.interests.map((current) => {
          const { icon, id, interest } = current;
          return (
            <div
              key={id}
              onClick={() => {
                handleClick(id);
              }}
            >
              <img
                className={`
                hover:translate-y-1
                w-[10vw] h-auto rounded-full shadow-xl ${
                  // When true, add grayscale class.
                  interestClicked[id] ? 'grayscale' : ''
                }`}
                src={icon}
                alt={interest}
              ></img>
              <p className='mt-3 flex flex-col items-center text-slate-500 opacity-40 font-thin'>
                {interest.toUpperCase()}
              </p>
            </div>
          );
        })}
    </>
  );
}

export default Interests;
