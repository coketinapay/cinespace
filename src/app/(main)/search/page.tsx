import { TheMovieDBMediaTypes } from "@/types/the-moviedb-api";
import React from "react";

export type SearchQueryProps = {
  q: string;
  filter: TheMovieDBMediaTypes;
  page: number;
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchQueryProps>;
}) => {
  const { q } = await searchParams;
  return <div>{q}</div>;
};

export default page;
