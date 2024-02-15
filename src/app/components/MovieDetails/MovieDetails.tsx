'use client'

import React, { useEffect, useState } from 'react';

import styles from './MovieDetails.module.css';
import MovieRating from '@/app/components/MovieRating/MovieRating';
import MovieInfo from '@/app/components/MovieInfo/MovieInfo';
import { MovieDetailsProps } from '@/app/types/movie';
import {useStore} from '@/store';

function MovieData({ rating = null, cast, genre}: MovieDetailsProps) {
  const {genres} = useStore();
  const [genreName, setGenreName] = useState<string>('');

  useEffect(() => {
    const movieGenre = genres.find(genreItem => genreItem.id === genre)
    if(movieGenre) {
      setGenreName(movieGenre.name)
    }
  }, [])

  return (
    <section className={styles['movie-details']} aria-label='movie-info'>
      {rating && (
        <MovieRating rating={rating}/>
      )}
      <MovieInfo label="Cast" info={cast}/>
      <MovieInfo label="Genre" info={genreName}/>
    </section>
  );
};

export default MovieData;