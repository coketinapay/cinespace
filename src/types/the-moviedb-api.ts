import { ReviewCardProps } from "@/components/carousel/reviews-carousel";

export type TheMovieDBResponse = {
  page: number;
  results: TheMovieDBResult[] | ReviewCardProps[];
  total_pages: number;
  total_results: number;
};

export type TheMovieDBResult = {
  name: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type:
    | "tv"
    | "movie"
    | "person"
    | "collection"
    | "company"
    | "network"
    | "award"
    | "keyword";
  genres: Genre[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  tagline: string;
  runtime: number;
  production_companies: ProductionCompanies[];
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompanies = {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TheMovieDBMediaTypes = Pick<
  TheMovieDBResult,
  "media_type"
>["media_type"];
