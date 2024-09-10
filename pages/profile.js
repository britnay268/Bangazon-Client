/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TfiMenuAlt } from 'react-icons/tfi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { TbZoomMoney } from 'react-icons/tb';
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
      <h3>@{user.user.username}</h3>
      <div>
        <p><FaRegUser /> {user.fbUser.displayName}</p>
        <p><MdOutlineMailOutline /> {user.fbUser.email}</p>
        <Link passHref href="/orders">
          <Nav.Link variant="link" style={{ marginBottom: '15px' }}> <TfiMenuAlt /> Completed Orders</Nav.Link>
        </Link>
        <p><TbZoomMoney /> Seller: {user.user.seller ? 'Yes' : 'No'}</p>
      </div>
      <Button variant="danger" onClick={handleChange}>
        Sign Out
      </Button>
    </div>
  );
}
