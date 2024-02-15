import Image from 'next/image';
import type { Metadata } from "next";

import styles from './Login.module.css';
import LoginForm from '@/app/components/LoginForm/LoginForm';
import { MoviesClient } from '@/app/api/client';

export const metadata: Metadata = {
  title: "Login",
  description: "Application to browse within a movies catalog"
};

async function signin(username: string, password: string): Promise<boolean> {
  'use server'
  return MoviesClient.signIn(username, password);
}

export default async function Login() {
  return (
    <div
      className={styles['login__image']}
    >
      <Image
        src={'/assets/login.png'}
        alt={'/assets/login.png'}
        style={{objectFit: 'cover'}}
        fill={true}
        quality={100}
      />
      <LoginForm signin={signin}/>
    </div>
  );
};