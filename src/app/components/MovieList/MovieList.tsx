"use client"

import React, {useEffect, useState} from 'react';

import { useStore } from '@/store';
import styles from './MovieList.module.css';
import Button from '@/app/components/Button/Button';
import { GenreData, MovieGenre, MovieListProps } from '@/app/types/movie';
import GenreCarousel from '../GenreCarousel/GenreCarousel';
import { robotoCondensed } from './../../../../public/fonts/fonts';
import { COMING_SOON, INITIAL_GENRES_BUTTONS_STATE } from '@/app/constants';

function MovieList({movies, genres, /* userFavMovies ,*/ comingSoonMovies}:  MovieListProps) {
  const {setUserFavorites, setGenres, setComingSoonMovies} = useStore();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreData, setGenreData] = useState<GenreData[]>([])
  const [comingSoon, setComingSoon] = useState<GenreData>()
  const [buttonClicked, setButtonClicked] = useState<{ [key: string]: boolean }>(INITIAL_GENRES_BUTTONS_STATE);

  useEffect(() => {
    setGenres(genres);
    setComingSoonMovies(comingSoonMovies);
    setComingSoon({
      title: COMING_SOON.title,
      movies: [...comingSoonMovies],
      genre: COMING_SOON.genre
    })
  }, [genres, comingSoonMovies]);

  useEffect(() => {
    const initialGenreState: { [key: string]: boolean } = genres.reduce((acc: { [key: string]: boolean }, genre) => {
      acc[genre.name.toLowerCase()] = false;
      return acc;
    }, {});
    setSelectedGenres([]);
    setGenreData(generateGenreData(genres));
    setButtonClicked(initialGenreState);
  }, [genres, movies]);

  useEffect(() => {
    setGenreData(generateGenreData(genres, selectedGenres));
  }, [selectedGenres, genres]);

  function filterMoviesByGenre(genreName: string) {
    const genre = genres.find(genre => genre.name === genreName);
    const genreId = genre ? genre.id : null;
    if (!genreId) {
      return [];
    }
    return movies.filter(movie => movie.genre_ids.includes(Number(genreId)));
  }

  function handlerFilterMovies(genre: string) {
    setSelectedGenres(prevGenres =>
      prevGenres.includes(genre) ? prevGenres.filter(g => g !== genre) : [...prevGenres, genre]
    );
    setButtonClicked(prevState => ({
      ...prevState,
      [genre]: !prevState[genre]
    }));
  }

  function generateGenreData(genresList: MovieGenre[], selectedGenresList: string[] = []) {
    return genresList.map(genre => ({
      title: genre.name,
      movies: filterMoviesByGenre(genre.name),
      genre: genre.name.toLowerCase()
    })).filter(genreData => {
      if (selectedGenresList.length === 0) return true;
      return selectedGenresList.includes(genreData.title);
    });
  }

  return (
    <main className={styles['movie-list']}>
      <section className={styles.filter}>
        {genres.map(({name}) => (
          <Button
            key={name}
            classes={`${robotoCondensed.className} antialiased ${styles.filter__button}`}
            text={name}
            variant={buttonClicked[name] ? 'primary' : 'secondary'}
            onClick={() => handlerFilterMovies(name)}
          />
        ))}
      </section>
      {genreData.map(({ title, movies, genre }) => (
        <GenreCarousel
          key={title}
          title={title}
          movies={movies}
          genre={genre}
          visible={true}
        />
      ))}
      {comingSoon && (
        <GenreCarousel
          key={comingSoon.title}
          title={comingSoon.title}
          movies={comingSoonMovies}
          genre={comingSoon.genre}
          visible={true}
        />
      )}
    </main>
  );
};

export default MovieList;