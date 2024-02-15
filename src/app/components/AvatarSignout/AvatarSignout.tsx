'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button/Button';
import styles from './AvatarSignout.module.css';
import {robotoCondensed} from './../../../../public/fonts/fonts';
import {signOut} from '@/app/actions/actions';

function AvatarSignout(): JSX.Element {
  const router = useRouter();
  const [showSignoutButton, setShowSignoutButton] = useState<boolean>(false);

  async function handleSignout() {
    const signOutRes = await signOut()
    if(signOutRes) {
      router.push('/login');
    }
    else {
      throw new Error('Failed to sign out');
    }
  }

  const handleMouseEnter = (): void => {
    setShowSignoutButton(true);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleSignout();
  };

  return (
    <>
      <div
        className={styles.avatar}
        onMouseEnter={handleMouseEnter}
      ></div>
      {showSignoutButton && (
        <Button
          classes={`${robotoCondensed.className} antialiased ${styles['slider__action-button']}`}
          text='Sign out'
          variant='primary'
          onClick={handleButtonClick}
        />
      )}
    </>
  );
};

export default AvatarSignout;