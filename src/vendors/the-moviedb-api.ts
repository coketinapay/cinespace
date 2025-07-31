import { UrlBuilder } from "@/app/(main)/movie/discover/_movie-filter-box";

export type MovieIdProp = string;
export type PosterPathProp = string;
export type BackdropPathProp = string;

export const MOVIES_API = {
  create: {},
  read: {
    movie_reviews: (movie_id: MovieIdProp) =>
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    movie_credits: (movie_id: MovieIdProp) =>
      `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    movie_similar: (movie_id: MovieIdProp) =>
      `https://api.themoviedb.org/3/movie/${movie_id}/similar`,
    movie: (movie_id: MovieIdProp) =>
      `https://api.themoviedb.org/3/movie/${movie_id}`,
    popular_movies: () =>
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    movie_discover: ({ include_adult, page, sort_by }: UrlBuilder) =>
      `https://api.themoviedb.org/3/discover/movie?include_adult=${include_adult}&include_video=false&language=en-US&page=${page}&sort_by=${sort_by}`,
  },
  update: {},
  delete: {},
} as const;

export const RESOURCE_PATH = {
  poster: (poster_path: PosterPathProp) =>
    `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`,
  backdrop: (backdrop_path: BackdropPathProp) =>
    `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${backdrop_path}`,
} as const;
