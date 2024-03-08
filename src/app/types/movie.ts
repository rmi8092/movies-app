export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
export interface UpcomingMoviesResponse {
  dates: {
    maximum: string,
    minimum: string
  },
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieTitle {
  title: string
}

export interface MovieGenre {
  id: string;
  name: string;
}

export interface MovieGenreResponse {
  genres: MovieGenre[];
}

export interface MovieCastResponse {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface MovieListProps {
  movies: Movie[];
  genres: MovieGenre[];
  userFavMovies?: Movie[];
  comingSoonMovies: Movie[];
}

export interface MovieRatingProps {
  rating: number;
}

export interface MovieInfoProps {
  label: string;
  info: string;
}

export interface MovieDetailsProps {
  rating: number | null;
  cast: Cast[] | undefined;
  genreIds: number[];
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