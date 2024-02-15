'use client'

import React, {useEffect, useState} from 'react';

import {robotoCondensed} from '../../../../public/fonts/fonts';
import styles from './FavoriteMovie.module.css';
import {Movie} from '@/app/types/movie';
import {addFavorite, removeFavorite} from '@/app/actions/actions';
import { useStore } from '@/store';
import Button from '@/app/components/Button/Button';

function FavoriteMovie({selectedMovie}: {selectedMovie: Movie}) {
  const {userFavorites} = useStore()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const isMovieInFavorites = userFavorites.some(movie => movie.id === selectedMovie.id)
    setIsFavorite(isMovieInFavorites)
  }, [])

  function handleUpdateFavorite(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.preventDefault();
    if(isFavorite) {
      const removeFavoriteRes = removeFavorite(selectedMovie.id)
      if(!removeFavoriteRes) {
        throw new Error('Failed to sign out');
      }
      setIsFavorite(false)
    }
    else {
      const addFavoriteRes = addFavorite(selectedMovie.id)
      if(!addFavoriteRes) {
        throw new Error('Failed to sign out');
      }
      setIsFavorite(true)
    }
  }

  return (
    <div className={styles['info__favorite']}>
      <Button
        classes={`${styles['info__favorite-icon']} ${isFavorite ? styles['info__favorite-icon--remove'] : styles['info__favorite-icon--add']}`}
        onClick={handleUpdateFavorite}
      />
      <span className={`${robotoCondensed.className} antialiased ${styles['favorite__button-label']}`}>
        {isFavorite ? 'Remove from my list' : 'Add to my list'}
      </span>
    </div>
  );
};

export default FavoriteMovie