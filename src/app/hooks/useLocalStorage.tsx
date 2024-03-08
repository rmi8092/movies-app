import { useEffect, useState } from 'react';
import { Movie } from '@/app/types/movie';

export function useLocalStorageMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const storedMovie = localStorage.getItem('selectedMovieLS');
    if (storedMovie) {
      setMovie(JSON.parse(storedMovie));
    }
  }, []);

  const updateLocalStorageMovie = (newMovie: Movie | null) => {
    localStorage.setItem('selectedMovieLS', JSON.stringify(newMovie));
    setMovie(newMovie);
  };

  return { movie, updateLocalStorageMovie };
}