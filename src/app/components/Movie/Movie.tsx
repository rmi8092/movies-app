'use client'

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link'

import { useStore } from '@/store';
import Button from '@/app/components/Button/Button';
import MovieDetails from '@/app/components/MovieDetails/MovieDetails';
import styles from './Movie.module.css';
import FavoriteMovie from '@/app/components/FavoriteMovie/FavoriteMovie';
import AvatarSignout from '@/app/components/AvatarSignout/AvatarSignout';
import {robotoCondensed, robotoUltraLight} from '../../../../public/fonts/fonts';
import { useLocalStorageMovie } from '@/app/hooks/useLocalStorage';

function MovieComponent() {
  const { selectedMovie, comingSoonMovies } = useStore();
  const { movie, updateLocalStorageMovie } = useLocalStorageMovie();
  const [isComingSoonMovie, setIsComingSoonMovie] = useState<boolean>(false)

  useEffect(() => {
    const isComingSoon = comingSoonMovies.some(movie => movie.id === selectedMovie?.id)
    if (isComingSoon) {
      setIsComingSoonMovie(true)
    }
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      updateLocalStorageMovie(selectedMovie);
    }
  }, [selectedMovie, updateLocalStorageMovie]);

  return (
    movie && (
      <div>
        <div className={styles.hero}>
          <Link href="/" className={styles['hero__back']} replace></Link>
          <AvatarSignout />
          <Image
            src={movie?.poster}
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
          <MovieDetails rating={movie.rating} cast={movie.cast} genre={movie.genre}/>
          <section aria-label='movie-title-description'>
            <h1 className={styles['info__title']}>{movie.title}</h1>
            <p className={`${robotoUltraLight.className} antialiased ${styles['info__description']}`}>{movie.description}</p>
          </section>
        </main>
      </div>
    )
  );
}

export default MovieComponent