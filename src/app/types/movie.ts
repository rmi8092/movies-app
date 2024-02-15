export interface Movie {
  highlighted: boolean
  rating: number | null
  poster: string
  cast: string
  thumbnail: string
  description: string
  id: string
  genre: string
  availableDate: string
  title: string
}

export interface MovieTitle {
  title: string
}

export interface MovieGenre {
  id: string;
  name: string;
}

export interface MovieListProps {
  movies: Movie[];
  genres: MovieGenre[];
  userFavMovies: Movie[];
  comingSoonMovies: Movie[];
}

export interface MovieRatingProps {
  rating: number | null;
}

export interface MovieInfoProps {
  label: string;
  info: string;
}

export interface MovieDetailsProps {
  rating: number | null;
  cast: string;
  genre: string;
}

export interface GenreCarouselProps {
  title: string;
  movies: Movie[];
  visible: boolean;
  genre: string;
}

export interface ImageSize {
  width: number;
  height: number;
}

export interface GenreData {
  title: string,
  movies: Movie[]
  genre: string
}

export interface FilterButton {
  text: string,
  key: string
}

export interface UserFavorites extends Array<string> {}

export interface LoginFormProps {
  signin: (username: string, password: string) => Promise<boolean>;
}