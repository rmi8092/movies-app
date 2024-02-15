"use client"

import React, {useEffect, useState} from 'react';

import { useStore } from '@/store';
import styles from './MovieList.module.css';
import Button from '@/app/components/Button/Button';
import {FilterButton, GenreData, Movie, MovieListProps} from '@/app/types/movie';
import GenreCarousel from '../GenreCarousel/GenreCarousel';
import {robotoCondensed} from './../../../../public/fonts/fonts';
import { COMEDY, DRAMA, THRILLERS, COMING_SOON, MY_LIST } from '@/app/constants';

function MovieList({movies, genres, userFavMovies, comingSoonMovies}:  MovieListProps) {
  const {setUserFavorites, setGenres, setComingSoonMovies} = useStore();

  const filterButtons: FilterButton[] = [
    { text: COMEDY.title, key: COMEDY.genre },
    { text: DRAMA.title, key: DRAMA.genre },
    { text: THRILLERS.title, key: THRILLERS.genre }
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [buttonClicked, setButtonClicked] = useState<{ [key: string]: boolean }>({
    comedy: false,
    drama: false,
    thrillers: false,
  });
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState<GenreData[]>([])

  function filterMoviesByGenre(genreName: string) {
    const genre = genres.find(genre => genre.name === genreName);
    if (!genre) {
      return [];
    }
    return movies.filter(movie => movie.genre === genre.id);
  }

  useEffect(() => {
    if(genres.length) {
      setGenres(genres)
      setDramaMovies(filterMoviesByGenre(DRAMA.title));
      setThrillerMovies(filterMoviesByGenre(THRILLERS.title));
      setComedyMovies(filterMoviesByGenre(COMEDY.title));
    }
    if(userFavMovies.length) {
      setUserFavorites(userFavMovies)
    }
    if(comingSoonMovies.length) {
      setComingSoonMovies(comingSoonMovies);
    }
  }, [])

  useEffect(() => {
    setGenreData([
      { title: COMEDY.title, movies: comedyMovies, genre: COMEDY.genre },
      { title: DRAMA.title, movies: dramaMovies, genre: DRAMA.genre },
      { title: THRILLERS.title, movies: thrillerMovies, genre: THRILLERS.genre },
      { title: COMING_SOON.title, movies: comingSoonMovies, genre: COMING_SOON.genre },
      { title: MY_LIST.title, movies: userFavMovies, genre: MY_LIST.genre },
    ]);
  }, [comedyMovies, dramaMovies, thrillerMovies, userFavMovies, comingSoonMovies])

  function handlerFilterMovies(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(prevGenres => prevGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres(prevGenres => [...prevGenres, genre]);
    }
    setButtonClicked(prevState => ({
      ...prevState,
      [genre]: !prevState[genre]
    }));
  }

  return (
    <main className={styles['movie-list']}>
      <section className={styles.filter}>
        {filterButtons.map(({text, key}) => (
          <Button
            key={key}
            classes={`${robotoCondensed.className} antialiased ${styles.filter__button}`}
            text={text}
            variant={buttonClicked[key] ? 'primary' : 'secondary'}
            onClick={() => handlerFilterMovies(key)}
          />
        ))}
      </section>
      {genreData.map(({ title, movies, genre }) => (
        <GenreCarousel
          key={title}
          title={title}
          movies={movies}
          genre={genre}
          visible={selectedGenres.includes(genre) || selectedGenres.length === 0 || title === 'My List'}
        />
      ))}
    </main>
  );
};

export default MovieList;