import { TheMovieDBMediaTypes } from "./the-moviedb-api";

export type SearchQueryProps = {
  q: string;
  filter: TheMovieDBMediaTypes;
  page: number;
};

export type DisplayShowProps = {
  id: string;
} & Pick<SearchQueryProps, "filter" | "page">;
