import { MovieGenre, UserFavorites, Movie, MoviesResponse, UpcomingMoviesResponse, MovieGenreResponse, MovieCastResponse } from "@/app/types/movie";
import {BASE_URL} from '@/app/constants';
import {generateRequestOptions} from '@/app/utils/common';
import { useAuthStore } from '@/store';
import { SigninResponse } from "@/app/types/auth";
import { headers } from "next/headers";

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
  async getMovies(): Promise<MoviesResponse> {
    const res: Response = await fetch(`${process.env.API_URL}/movie/top_rated?language=en-US&page=1`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getPopularMovies(): Promise<MoviesResponse> {
    const res: Response = await fetch(`${process.env.API_URL}/movie/popular?language=en-US&page=1`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getGenres(): Promise<MovieGenreResponse> {
    const res: Response = await fetch(`${process.env.API_URL}/genre/movie/list?language=en`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  /* async getCast(movieId: number): Promise<MovieCastResponse> {
    const res: Response = await fetch(`${process.env.API_URL}/movie/${movieId}/credits?language=en`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }, */
  async getUpcomingMovies(): Promise<UpcomingMoviesResponse> {
    const res: Response = await fetch(`${process.env.API_URL}/movie/upcoming?language=en`, generateRequestOptions({method: 'GET', auth: true}));
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },
  async getUser(): Promise<any[]> {// Promise<Movie[]> {
    const res: Response = await fetch(`${process.env.API_URL}/account/20932764/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, generateRequestOptions({method: 'GET', auth: true}));
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