'use client'

import React, { useEffect, useState } from 'react';

import styles from './MovieDetails.module.css';
import MovieRating from '@/app/components/MovieRating/MovieRating';
import MovieInfo from '@/app/components/MovieInfo/MovieInfo';
import { MovieDetailsProps } from '@/app/types/movie';
import {useStore} from '@/store';

function MovieDetails({ rating = null, cast, genreIds}: MovieDetailsProps) {
  const {genres} = useStore();
  const [computedGenre, setComputedGenre] = useState<string>('');
  const [computedCast, setComputedCast] = useState<string>('');

  function computeMovieGenres() {
    const genreNamesArray = genreIds.map(genreId => {
      const foundGenre = genres.find(genre => Number(genre.id) === genreId);
      return foundGenre ? foundGenre.name : null;
    }).filter(computedGenre => computedGenre !== null);

    if (genreNamesArray) {
      setComputedGenre(genreNamesArray.join(' - '));
    }
  }

  function computeMovieCast() {
    if (!cast || cast.length === 0) {
      setComputedCast('');
      return;
    }
    let namesString = cast.slice(0, 5).map(obj => obj.name).join(', ');
    if (cast.length > 5) {
        namesString += ', and more';
    }
    setComputedCast(namesString);
  }

  useEffect(() => {
    computeMovieGenres();
    computeMovieCast();
  }, [])

  return (
    <section className={styles['movie-details']} aria-label='movie-info'>
      {rating && (
        <MovieRating rating={rating}/>
      )}
      <MovieInfo label="Cast" info={computedCast}/>
      <MovieInfo label="Genre" info={computedGenre}/>
    </section>
  );
};

export default MovieDetails;