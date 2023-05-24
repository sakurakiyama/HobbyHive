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
              key={interest + id}
              onClick={() => {
                handleClick(interest + id);
              }}
            >
              <img
                className={`
                hover:translate-y-1
                w-[10vw] h-auto rounded-full shadow-xl ${
                  // When true, add grayscale class.
                  interestClicked[interest + id] ? 'grayscale' : ''
                }`}
                src={icon}
                alt={interest}
              ></img>
            </div>
          );
        })}
    </>
  );
}

export default Interests;
