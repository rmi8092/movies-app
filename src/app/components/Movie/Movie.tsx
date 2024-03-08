'use client'

import {useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useStore } from '@/store';
import Button from '@/app/components/Button/Button';
import MovieDetails from '@/app/components/MovieDetails/MovieDetails';
import styles from './Movie.module.css';
import FavoriteMovie from '@/app/components/FavoriteMovie/FavoriteMovie';
import AvatarSignout from '@/app/components/AvatarSignout/AvatarSignout';
import {robotoCondensed, robotoUltraLight} from './../../../../public/fonts/fonts';
import { useLocalStorageMovie } from '@/app/hooks/useLocalStorage';
import { getMovieCast } from '@/app/actions/actions';
import { Cast } from '../../types/movie';
import { HOME_PATH } from '@/app/constants';

function MovieComponent() {
  const router = useRouter();
  const { selectedMovie, setSelectedMovie, comingSoonMovies } = useStore();
  const { movie, updateLocalStorageMovie } = useLocalStorageMovie();
  const [isComingSoonMovie, setIsComingSoonMovie] = useState<boolean>(false)
  const [cast , setCast] = useState<Cast[]>()

  async function getCast(movieId: number) {
    const movieCast = await getMovieCast(movieId)
    setCast(movieCast.cast)
  }

  useEffect(() => {
    const isComingSoon = comingSoonMovies.some(movie => movie.id === selectedMovie?.id)
    if (isComingSoon) {
      setIsComingSoonMovie(true)
    }
    if(selectedMovie?.id) {
      getCast(selectedMovie.id)
    }
  }, []);

  useEffect(() => {
    if(movie?.id) {
      getCast(movie.id)
    }
  }, [movie]);

  useEffect(() => {
    if (selectedMovie) {
      updateLocalStorageMovie(selectedMovie);
    }
  }, [selectedMovie]);

  function handleGoBack() {
    updateLocalStorageMovie(null);
    setSelectedMovie(null)
    router.push(HOME_PATH)
  }

  return (
    movie && cast && (
      <div>
        <div className={styles.hero}>
          <Button classes={styles['hero__back']} onClick={handleGoBack}/>
          <AvatarSignout />
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            className={styles['hero__poster']}
            alt="movie-poster"
            fill={true}
            priority={true}
          />
        </div>
        <main className={styles.info}>
          <div className={styles['info__action-buttons']}>
            <Button classes={`${robotoCondensed.className} antialiased`} text="Trailer" variant="secondary" />
            {!isComingSoonMovie && (
              <Button classes={`${robotoCondensed.className} antialiased`} text="Play" variant="primary" />
            )}
          </div>
          <FavoriteMovie selectedMovie={movie}/>
          <MovieDetails rating={movie.vote_average} cast={cast} genreIds={movie.genre_ids}/>
          <section aria-label='movie-title-description'>
            <h1 className={styles['info__title']}>{movie.title}</h1>
            <p className={`${robotoUltraLight.className} antialiased ${styles['info__description']}`}>{movie.overview}</p>
          </section>
        </main>
      </div>
    )
  );
}

export default MovieComponent