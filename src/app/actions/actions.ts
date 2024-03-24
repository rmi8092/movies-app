'use server'

import {BASE_URL} from '@/app/constants';
import { UserFavorites, MovieCastResponse, MovieVideosResponse, ReviewsResponse } from "@/app/types/movie";
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

export async function getMovieCast(movieId: number): Promise<MovieCastResponse> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
    },
  };
  const res = await fetch(`${process.env.API_URL}/movie/${movieId}/credits?language=en`, requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getMovieVideos(movieId: number): Promise<MovieVideosResponse> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
    },
  };
  const res = await fetch(`${process.env.API_URL}/movie/${movieId}/videos?language=en`, requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getReviewsByMovieId(movieId: number): Promise<ReviewsResponse> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
    },
  };
  const res = await fetch(`${process.env.API_URL}/movie/${movieId}/reviews?language=en`, requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
