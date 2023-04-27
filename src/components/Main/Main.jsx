import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default Main;
