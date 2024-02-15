'use server'

import {BASE_URL} from '@/app/constants';
import { UserFavorites } from "@/app/types/movie";
import { useAuthStore } from '@/store';

export async function addFavorite(id: string): Promise<UserFavorites> {
  const token = useAuthStore.getState().token
  const payload = {id}
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  };
  const res = await fetch(`${BASE_URL}/user/list`, requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function removeFavorite(id: string): Promise<UserFavorites> {
  const token = useAuthStore.getState().token
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  };
  const res = await fetch(`${BASE_URL}/user/list/${id}`, requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function signOut(): Promise<boolean> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res: Response = await fetch(`${BASE_URL}/auth/sign-out`, requestOptions)
  if (!res) {
    throw new Error('Failed to fetch data')
  }
  useAuthStore.getState().logout();
  return true
}

