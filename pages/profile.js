import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <Image src={user.fbUser.photoURL} alt="Profile-image" />
      <h3>{user.user.username}</h3>
      <p>{user.fbUser.displayName}</p>
      <p>{user.fbUser.email}</p>
      <p>Seller: {user.user.seller ? 'Yes' : 'No'}</p>
      <Button variant="danger" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
