import { create } from 'zustand'

import {Movie, MovieGenre} from '@/app/types/movie'
import { AuthActions, AuthState } from '@/app/types/auth'

type Store = {
  movies: Movie[]
  genres: MovieGenre[]
  selectedMovie: Movie | null
  userFavorites: Movie[]
  comingSoonMovies: Movie[]
  setMovies: (moviesAPI: Movie[]) => void
  setGenres: (genresAPI: MovieGenre[]) => void
  setSelectedMovie: (userSelectedMovie: Movie) => void
  setUserFavorites: (userList: Movie[]) => void
  setComingSoonMovies: (movies: Movie[]) => void
}

export const useStore = create<Store>()((set) => ({
  movies: [],
  genres: [],
  selectedMovie: null,
  userFavorites: [],
  comingSoonMovies: [],
  setMovies: (moviesAPI: Movie[]) => set((state) => ({ movies: moviesAPI })),
  setGenres: (genresAPI: MovieGenre[]) => set((state) => ({ genres: genresAPI })),
  setSelectedMovie: (userSelectedMovie: Movie) => set((state) => ({ selectedMovie: userSelectedMovie })),
  setUserFavorites: (userList: Movie[]) => set((state) => ({ userFavorites: userList })),
  setComingSoonMovies: (movies: Movie[]) => set((state) => ({ comingSoonMovies: movies })),
}))

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: null,
  isAuthenticated: false,
  login: (token: string) =>
    set((state) => ({
      token,
      isAuthenticated: true,
    })),
  logout: () =>
    set((state) => ({
      token: null,
      isAuthenticated: false,
    })),
}));