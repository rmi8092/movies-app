"use client"

import React, {useEffect, useState} from 'react';

import { useStore } from '@/store';
import styles from './MovieList.module.css';
import Button from '@/app/components/Button/Button';
import {FilterButton, GenreData, Movie, MovieListProps} from '@/app/types/movie';
import GenreCarousel from '../GenreCarousel/GenreCarousel';
import {robotoCondensed} from './../../../../public/fonts/fonts';
import { COMEDY, DRAMA, THRILLERS, COMING_SOON, MY_LIST, ACTION, ADVENTURE, ANIMATION, CRIME, DOCUMENTARY, FAMILY, FANTASY, HISTORY, HORROR, MUSIC, MYSTERY, ROMANCE, TV_MOVIE, WAR, WESTERN, SCIENCE_FICTION } from '@/app/constants';

function MovieList({movies, genres, /* userFavMovies ,*/ comingSoonMovies}:  MovieListProps) {
  const {setUserFavorites, setGenres, setComingSoonMovies} = useStore();
  // console.log(localStorage.getItem('selectedMovieLS'))


  const initialGenresButtonsState = {
    action: false,
    adventure: false,
    animation: false,
    comedy: false,
    crime: false,
    documentary: false,
    drama: false,
    family: false,
    fantasy: false,
    history: false,
    horror: false,
    music: false,
    mystery: false,
    romance: false,
    science_fiction: false,
    tv_movie: false,
    thriller: false,
    war: false,
    western: false
  };

  const filterButtons: FilterButton[] = [
    { text: COMEDY.title, key: COMEDY.genre },
    { text: DRAMA.title, key: DRAMA.genre },
    { text: THRILLERS.title, key: THRILLERS.genre },
    { text: ACTION.title, key: ACTION.genre },
    { text: ADVENTURE.title, key: ADVENTURE.genre },
    { text: ANIMATION.title, key: ANIMATION.genre },
    { text: CRIME.title, key: CRIME.genre },
    { text: DOCUMENTARY.title, key: DOCUMENTARY.genre },
    { text: FAMILY.title, key: FAMILY.genre },
    { text: FANTASY.title, key: FANTASY.genre },
    { text: HISTORY.title, key: HISTORY.genre },
    { text: HORROR.title, key: HORROR.genre },
    { text: MUSIC.title, key: MUSIC.genre },
    { text: MYSTERY.title, key: MYSTERY.genre },
    { text: ROMANCE.title, key: ROMANCE.genre },
    { text: SCIENCE_FICTION.title, key: SCIENCE_FICTION.genre },
    { text: TV_MOVIE.title, key: TV_MOVIE.genre },
    { text: WAR.title, key: WAR.genre },
    { text: WESTERN.title, key: WESTERN.genre },
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [buttonClicked, setButtonClicked] = useState<{ [key: string]: boolean }>(initialGenresButtonsState);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [adventureMovies, setAdventureMovies] = useState<Movie[]>([]);
  const [animationMovies, setAnimationMovies] = useState<Movie[]>([]);
  const [crimeMovies, setCrimeMovies] = useState<Movie[]>([]);
  const [documentaryMovies, setDocumentaryMovies] = useState<Movie[]>([]);
  const [familyMovies, setFamilyMovies] = useState<Movie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>([]);
  const [historyMovies, setHistoryMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [musicMovies, setMusicMovies] = useState<Movie[]>([]);
  const [mysteryMovies, setMysteryMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [scienceFictionMovies, setScienceFictionMovies] = useState<Movie[]>([]);
  const [tvMovieMovies, setTvMovieMovies] = useState<Movie[]>([]);
  const [warMovies, setWarMovies] = useState<Movie[]>([]);
  const [westernMovies, setWesternMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState<GenreData[]>([])

  function filterMoviesByGenre(genreName: string) {
    const genre = genres.find(genre => genre.name === genreName);
    const genreId = genre ? genre.id : null;
    if (!genreId) {
      return [];
    }
    return movies.filter(movie => movie.genre_ids.includes(Number(genreId)));
  }

  useEffect(() => {
    if(genres.length) {
      setGenres(genres)
      setComedyMovies(filterMoviesByGenre(COMEDY.title));
      setDramaMovies(filterMoviesByGenre(DRAMA.title));
      setThrillerMovies(filterMoviesByGenre(THRILLERS.title));
      setActionMovies(filterMoviesByGenre(ACTION.title));
      setAdventureMovies(filterMoviesByGenre(ADVENTURE.title));
      setAnimationMovies(filterMoviesByGenre(ANIMATION.title));
      setCrimeMovies(filterMoviesByGenre(CRIME.title));
      setDocumentaryMovies(filterMoviesByGenre(DOCUMENTARY.title));
      setFamilyMovies(filterMoviesByGenre(FAMILY.title));
      setFantasyMovies(filterMoviesByGenre(FANTASY.title));
      setHistoryMovies(filterMoviesByGenre(HISTORY.title));
      setHorrorMovies(filterMoviesByGenre(HORROR.title));
      setMusicMovies(filterMoviesByGenre(MUSIC.title));
      setMysteryMovies(filterMoviesByGenre(MYSTERY.title));
      setRomanceMovies(filterMoviesByGenre(ROMANCE.title));
      setScienceFictionMovies(filterMoviesByGenre(SCIENCE_FICTION.title));
      setTvMovieMovies(filterMoviesByGenre(TV_MOVIE.title));
      setWarMovies(filterMoviesByGenre(WAR.title));
      setWesternMovies(filterMoviesByGenre(WESTERN.title));
    }
    /* if(userFavMovies.length) {
      setUserFavorites(userFavMovies)
    } */
    if(comingSoonMovies.length) {
      setComingSoonMovies(comingSoonMovies);
    }
  }, [])

  useEffect(() => {
    setGenreData([
      { title: COMEDY.title, movies: comedyMovies, genre: COMEDY.genre },
      { title: DRAMA.title, movies: dramaMovies, genre: DRAMA.genre },
      { title: THRILLERS.title, movies: thrillerMovies, genre: THRILLERS.genre },
      { title: ACTION.title, movies: actionMovies, genre: ACTION.genre },
      { title: ADVENTURE.title, movies: adventureMovies, genre: ADVENTURE.genre },
      { title: ANIMATION.title, movies: animationMovies, genre: ANIMATION.genre },
      { title: CRIME.title, movies: crimeMovies, genre: CRIME.genre },
      { title: DOCUMENTARY.title, movies: documentaryMovies, genre: DOCUMENTARY.genre },
      { title: FAMILY.title, movies: familyMovies, genre: FAMILY.genre },
      { title: FANTASY.title, movies: fantasyMovies, genre: FANTASY.genre },
      { title: HISTORY.title, movies: historyMovies, genre: HISTORY.genre },
      { title: HORROR.title, movies: horrorMovies, genre: HORROR.genre },
      { title: MUSIC.title, movies: musicMovies, genre: MUSIC.genre },
      { title: MYSTERY.title, movies: mysteryMovies, genre: MYSTERY.genre },
      { title: ROMANCE.title, movies: romanceMovies, genre: ROMANCE.genre },
      { title: SCIENCE_FICTION.title, movies: scienceFictionMovies, genre: SCIENCE_FICTION.genre },
      { title: TV_MOVIE.title, movies: tvMovieMovies, genre: TV_MOVIE.genre },
      { title: WAR.title, movies: warMovies, genre: WAR.genre },
      { title: WESTERN.title, movies: westernMovies, genre: WESTERN.genre },
      { title: COMING_SOON.title, movies: comingSoonMovies, genre: COMING_SOON.genre },
      /* { title: MY_LIST.title, movies: userFavMovies, genre: MY_LIST.genre }, */
    ]);
  }, [comedyMovies, dramaMovies, thrillerMovies, /* userFavMovies, */ comingSoonMovies])

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