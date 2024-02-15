'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {useStore} from './../../../store';
import {Movie, GenreCarouselProps, ImageSize} from '@/app/types/movie';
import styles from './GenreCarousel.module.css';
import {dashTitle} from '@/app/utils/common';
import {robotoCondensed} from './../../../../public/fonts/fonts';
import { MOVIE_PATH } from '@/app/constants';

function GenreCarousel({title, movies, visible, genre}: GenreCarouselProps) {
  const router = useRouter();
  const { selectedMovie, setSelectedMovie } = useStore();
  const [imageSize, setImageSize] = useState<ImageSize>({width: 0, height: 0});
  
  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

  useEffect(() => {
    const width = genre === 'comingSoon' ? 400 : 261
    const height = genre === 'comingSoon' ? 261 : 386
    setImageSize({width, height})
  }, [])

  useEffect(() => {
    if(selectedMovie) {
      router.push(`${MOVIE_PATH}/${dashTitle(selectedMovie.title)}`)
    }
  }, [selectedMovie])

  return (
    <>
      {visible && (
        <section className={styles.genre}>
          {movies.length !== 0 && (
            <>
              <h2 className={`${robotoCondensed.className} antialiased ${styles.genre__title}`}>{title}</h2>
              <div className={styles.genre__carousel}>
                {movies.map(movie => {
                  return (
                    <div
                      key={movie.id}
                      className={`${genre === 'comingSoon' ? styles['genre__image-wrapper--coming-soon'] : styles['genre__image-wrapper']}`}
                    >
                      <Image
                        className={styles['genre__image']}
                        src={movie.thumbnail}
                        alt={movie.thumbnail}
                        width={imageSize.width}
                        height={imageSize.height}
                        onClick={() => handleSelectMovie(movie)}
                      />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default GenreCarousel;