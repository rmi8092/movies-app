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
import { getMovieCast, getMovieVideos } from '@/app/actions/actions';
import { Cast, TrailerData } from '../../types/movie';
import { HOME_PATH, TRAILER, TRAILER_ERROR_MESSAGE, VIMEO_URL, YOUTUBE, YOUTUBE_URL } from '@/app/constants';
import { isFutureDate } from '@/app/utils/common';

function MovieComponent() {
  const router = useRouter();
  const { selectedMovie, setSelectedMovie } = useStore();
  const { movie, updateLocalStorageMovie } = useLocalStorageMovie();
  const [isComingSoonMovie, setIsComingSoonMovie] = useState<boolean>(false)
  const [cast , setCast] = useState<Cast[]>()
  const [trailerData , setTrailerData] = useState<TrailerData>()

  async function getCast(movieId: number) {
    const movieCast = await getMovieCast(movieId)
    setCast(movieCast.cast)
  }

  async function getTrailer(movieId: number) {
    const movieVideos = await getMovieVideos(movieId)
    for (const video of movieVideos.results) {
      if (video.type === TRAILER) {
        const {key, site} = video
        setTrailerData({key, site})
        break;
      }
    };
  }

  useEffect(() => {
    if(selectedMovie?.id) {
      getCast(selectedMovie.id)
    }
  }, []);

  useEffect(() => {
    if(movie?.id) {
      togglePlayButton(movie.release_date)
      getCast(movie.id)
    }
  }, [movie]);

  useEffect(() => {
    if (selectedMovie) {
      updateLocalStorageMovie(selectedMovie);
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (trailerData) {
      showTrailer(trailerData);
    }
  }, [trailerData]);

  function togglePlayButton(movieReleaseDate: string) {
    const isComingSoon = isFutureDate(movieReleaseDate)
    setIsComingSoonMovie(isComingSoon ? true : false)
  }

  function handleGoBack() {
    updateLocalStorageMovie(null);
    setSelectedMovie(null)
    router.push(HOME_PATH)
  }

  function handleTrailer() {
    if(movie?.id) {
      getTrailer(movie.id)
    }
  }

  function showTrailer(trailerData: TrailerData) {
    const siteDomain = trailerData.site === YOUTUBE ? YOUTUBE_URL : VIMEO_URL
    const newWindow = window.open('about:blank', '_blank', 'width=800,height=600');
    if (newWindow) {
      newWindow.location.href = `${siteDomain}${trailerData.key}`;
    } else {
      alert(TRAILER_ERROR_MESSAGE);
    }
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
            <Button classes={`${robotoCondensed.className} antialiased`} text="Trailer" variant="secondary" onClick={handleTrailer}/>
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