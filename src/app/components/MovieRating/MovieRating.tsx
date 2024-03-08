'use client'

import React from 'react';

import styles from './MovieRating.module.css';
import {robotoCondensed} from './../../../../public/fonts/fonts';
import { MovieRatingProps } from '@/app/types/movie';


function MovieRating({ rating }: MovieRatingProps) {
  const ratingArray = new Array(Math.floor(rating)).fill(null);

  return (
    <div className={styles['movie-details__rating']}>
      <span className={`${robotoCondensed.className} ${styles['movie-details__label']}`}>Rating:</span>
      <div className={styles['movie-details__stars']}>
        {ratingArray.map((_, index) => (
          <span key={index} className={styles['movie-details__info-star']}></span>
        ))}
      </div>
    </div>
  );
};

export default MovieRating;