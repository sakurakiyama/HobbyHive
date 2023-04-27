import React, {useState, useEffect} from 'react';
import './PartOne.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


function GettingStartedButton() {
  const [button, setButton] = useState('GET STARTED'); 
  const { user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  function handleLogin() {
    loginWithRedirect(); 
  }

  useEffect(() => {
    if (user) {
      setButton('MAIN'); 
    } else {
      setButton('GET STARTED');
    }
  }, [user])
  

  return (
    <div className='buttons'>
    <button className='blob-btn' onClick={() => !user ? handleLogin() : navigate('/main')}>
      {button}
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
  );
}

export default GettingStartedButton;
