import type { Metadata } from "next";
import {redirect} from "next/navigation";

import AvatarSignout from '@/app/components/AvatarSignout/AvatarSignout';
import MovieList from '@/app/components/MovieList/MovieList';
import HighlightedMovies from '@/app/components/HighlightedMovies/HighlightedMovies';
import {MoviesClient} from '@/app/api/client';
import { isFutureDate } from "@/app/utils/common";
import { useAuthStore } from "@/store";
import { LOGIN_PATH } from "@/app/constants";

export const metadata: Metadata = {
    title: "Movies catalog",
    description: "Application to browse within a movies catalog"
};

export default async function Home() {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if(!isAuthenticated) {
    redirect(LOGIN_PATH)
  }
  const movies = await MoviesClient.getMovies()
  const genres = await MoviesClient.getGenres()
  const userList = await MoviesClient.getUser()
  const userFavMoviesPromises = userList.map(async (userFavId: string) => {
    return await MoviesClient.getMovieById(userFavId)
  })
  const userFavMovies = await Promise.all(userFavMoviesPromises);
  const highlightedMovies = movies.filter(movie => movie.highlighted)
  const comingSoonMovies = movies.filter(movie => isFutureDate(movie.availableDate))

  return (
    <>
      <AvatarSignout />
      <HighlightedMovies highlightedMovies={highlightedMovies}/>
      <MovieList movies={movies} genres={genres} userFavMovies={userFavMovies} comingSoonMovies={comingSoonMovies} />
    </>
  );
};