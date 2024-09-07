/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import Nav2 from './Nav2';

function Signin() {
  return (
    <>
      <Nav2 />
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center signIn-container"
      >
        <img src="/logo.png" alt="logo" className="logo" />
        <Button type="button" size="lg" className="signIn-button" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
