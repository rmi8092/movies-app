'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';

import { LoginFormProps } from '@/app/types/movie';
import Button from '@/app/components/Button/Button';
import styles from './LoginForm.module.css';
import {robotoMedium, robotoUltraLight} from './../../../../public/fonts/fonts';

export default function LoginForm({ signin }: LoginFormProps) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signedIn = await signin(username, password)
    if(signedIn) {
      router.push('/');
    }
    else {
      throw new Error('Failed to sign in')
    }
  };

  return (
    <form onSubmit={handleSignin} className={styles.login__form}>
      <input
        className={`${robotoMedium.className} antialiased ${styles.login__input}`}
        name='username'
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.login__input}
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        classes={`${robotoUltraLight.className} antialiased ${styles.login__button}`}
        text='Sign in'
        variant='primary'
        type='submit'
      />
    </form>
  );
}
