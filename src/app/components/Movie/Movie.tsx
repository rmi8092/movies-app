'use client'

import {useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip'

import { useStore } from '@/store';
import Button from '@/app/components/Button/Button';
import MovieDetails from '@/app/components/MovieDetails/MovieDetails';
import styles from './Movie.module.css';
import FavoriteMovie from '@/app/components/FavoriteMovie/FavoriteMovie';
import AvatarSignout from '@/app/components/AvatarSignout/AvatarSignout';
import VideoPopup from '@/app/components/VideoPopup/VideoPopup';
import MovieReviews from '@/app/components/MovieReviews/MovieReviews';
import {robotoCondensed, robotoUltraLight} from './../../../../public/fonts/fonts';
import { useLocalStorageMovie } from '@/app/hooks/useLocalStorage';
import { getMovieCast, getMovieVideos, getReviewsByMovieId } from '@/app/actions/actions';
import { Cast, ReviewsResult, TrailerData } from '@/app/types/movie';
import { HOME_PATH, NO_FULL_MOVIES, TRAILER } from '@/app/constants';
import { isFutureDate } from '@/app/utils/common';

function MovieComponent() {
  const router = useRouter();
  const { selectedMovie, setSelectedMovie } = useStore();
  const { movie, updateLocalStorageMovie } = useLocalStorageMovie();
  const [isComingSoonMovie, setIsComingSoonMovie] = useState<boolean>(false)
  const [cast , setCast] = useState<Cast[]>()
  const [reviews , setReviews] = useState<ReviewsResult[]>()
  const [trailerData , setTrailerData] = useState<TrailerData>()
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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

  async function getReviews(movieId: number) {
    const movieReviews = await getReviewsByMovieId(movieId)
    setReviews(movieReviews.results)
  }

  useEffect(() => {
    if(selectedMovie?.id) {
      getCast(selectedMovie.id)
      getReviews(selectedMovie.id)
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
      setIsPopupOpen(true);
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

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
              <>
                <a data-tooltip-id="tooltip" data-tooltip-content={NO_FULL_MOVIES} data-tooltip-place="right">
                  <Button classes={`${robotoCondensed.className} antialiased`} text="Play" variant="primary"/>
                </a>
                <Tooltip id="tooltip" style={{ backgroundColor: "rgba(117, 27, 92, 0.7)", fontSize: "16px" }}/>
              </>
            )}
          </div>
          <FavoriteMovie selectedMovie={movie}/>
          <MovieDetails rating={movie.vote_average} cast={cast} genreIds={movie.genre_ids}/>
          <section aria-label='movie-title-description'>
            <h1 className={styles['info__title']}>{movie.title}</h1>
            <p className={`${robotoUltraLight.className} antialiased ${styles['info__description']}`}>{movie.overview}</p>
          </section>
          {reviews && (
            <MovieReviews reviews={reviews}></MovieReviews>
          )}
        </main>
        {trailerData && isPopupOpen && (
          <VideoPopup videoSite={trailerData.site} videoKey={trailerData.key} isOpen={isPopupOpen} onClose={closePopup} setIsPopupOpen={setIsPopupOpen}/>
        )}
      </div>
    )
  );
}

export default MovieComponent