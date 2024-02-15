'use client'

import React from 'react';

import styles from './MovieInfo.module.css';
import {robotoCondensed, robotoLight} from './../../../../public/fonts/fonts';
import { MovieInfoProps } from '@/app/types/movie';

function MovieInfo({ label, info }: MovieInfoProps) {
  return (
    <div className={styles['movie-details__info']}>
      <span className={`${robotoCondensed.className} antialiased ${styles['movie-details__label']}`}>{label}:</span>
      <span className={`${robotoLight.className} antialiased ${styles['movie-details__info-data']}`}>{info}</span>
    </div>
  );
};

export default MovieInfo;