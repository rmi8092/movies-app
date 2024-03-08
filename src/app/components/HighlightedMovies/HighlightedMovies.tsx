'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button/Button';
import { Movie } from '@/app/types/movie';
import styles from './HighlightedMovies.module.css';
import {robotoCondensed, robotoUltraLight} from './../../../../public/fonts/fonts';
import { useStore } from '@/store';
import { MOVIE_PATH } from '@/app/constants';
import {dashTitle} from '@/app/utils/common';

const HighlightedMovies = ({ highlightedMovies }: {highlightedMovies: Movie[]}) => {
  const router = useRouter();
  const { selectedMovie, setSelectedMovie } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % highlightedMovies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [highlightedMovies.length]);

  function handleGoToImage(index: number) {
    setCurrentImageIndex(index);
  }

  const truncateDescription = (overview: string): string => {
    return `${overview.substring(0, 200)}...`
  }

  function handleDiscoverMovie(movie: Movie): void {
    setSelectedMovie(movie);
  }
  
  useEffect(() => {
    if(selectedMovie) {
      router.push(`${MOVIE_PATH}/${dashTitle(selectedMovie.title)}`)
    }
  }, [selectedMovie])

  return (
    <div className={styles.slider}>
      {highlightedMovies.map((movie, index) => (
        <div key={movie.id} className={styles['slider__image-wrapper']} style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
          <div className={styles.slider__info}>
            <h1 className={`${robotoCondensed.className} antialiased ${styles.slider__title}`}>{movie.title}</h1>
            <p className={`${robotoUltraLight.className} antialiased ${styles.slider__description}`}>{truncateDescription(movie.overview)}</p>
            <Button
              classes={`${robotoCondensed.className} antialiased ${styles['slider__action-button']}`}
              text='Discover'
              variant='primary'
              onClick={() => handleDiscoverMovie(movie)}
            />
          </div>
          <Image
            className={styles['slider__image']}
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.backdrop_path}
            fill={true}
            sizes="100vw"
            priority={true}
          />
        </div>
      ))}
      <div className={styles['slider__nav-wrapper']}>
        <div className={styles['slider__nav']}>
          {highlightedMovies.map((movie, index) => (
            <button
              key={movie.id}
              className={`${styles['slider__nav']} ${index === currentImageIndex ? styles['slider__nav--active'] : ''}`}
              onClick={() => handleGoToImage(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightedMovies;
