import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = async () => {
    await router.push('/');
    signOut();
  };

  return (
    <div className="profile">
      <Image src={user.fbUser.photoURL} alt="Profile-image" />
      <h3>{user.user.username}</h3>
      <p>{user.fbUser.displayName}</p>
      <p>{user.fbUser.email}</p>
      <p>Seller: {user.user.seller ? 'Yes' : 'No'}</p>
      <Button variant="danger" onClick={handleChange}>
        Sign Out
      </Button>
    </div>
  );
}
