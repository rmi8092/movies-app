import { MovieGenre, UserFavorites, Movie } from "@/app/types/movie";
import {BASE_URL} from '@/app/constants';
import {generateRequestOptions} from '@/app/utils/common';
import { useAuthStore } from '@/store';
import { SigninResponse } from "@/app/types/auth";

export const MoviesClient = {
  async signIn(username: string, password: string): Promise<boolean> {
    const signinPayload = {email: username, password}
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinPayload),
    };
    const res: Response = await fetch(`${BASE_URL}/auth/sign-in`, requestOptions)
    const tokenResponse: SigninResponse = await res.json()
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    useAuthStore.getState().login(tokenResponse.token);
    return true
  },
  async getMovies(): Promise<Movie[]> {
    const res: Response = await fetch(`${BASE_URL}/movies`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getGenres(): Promise<MovieGenre[]> {
    const res = await fetch(`${BASE_URL}/genres`, generateRequestOptions({method: 'GET', auth: true}))
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getUser(): Promise<UserFavorites> {
    const res = await fetch(`${BASE_URL}/user`, generateRequestOptions({method: 'GET', auth: true}))
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getMovieById(id: string): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/movies/${id}`, generateRequestOptions({method: 'GET', auth: true}))
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getGenreById(id: string): Promise<MovieGenre> {
    const res = await fetch(`${BASE_URL}/genres/${id}`, generateRequestOptions({method: 'GET', auth: true}))
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
}