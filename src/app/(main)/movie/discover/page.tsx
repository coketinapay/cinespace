import { notFound } from "next/navigation";
import React from "react";
import MovieFilterBox from "./_movie-filter-box";
import { ScrollToTopButton } from "./_scroll-to-top-button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Layers } from "lucide-react";
import { getMovieDiscover } from "@/services/movie/getDiscoverMovies";
import PaginationButtons from "@/components/pagination-buttons";
import { TheMovieDBResponse, TheMovieDBResult } from "@/types/the-moviedb-api";
import { RESOURCE_PATH } from "@/vendors/the-moviedb-api";
import { RenderRatingStar } from "@/components/render-rating-star";
export type SortOrder = "asc" | "desc";

export const sortOrder = ["asc", "desc"];

export const validSortObjects = [
  { name: "Original Title (Ascending)", value: "original_title.asc" },
  { name: "Original Title (Descending)", value: "original_title.desc" },
  { name: "Popularity (Ascending)", value: "popularity.asc" },
  { name: "Popularity (Descending)", value: "popularity.desc" },
  { name: "Revenue (Ascending)", value: "revenue.asc" },
  { name: "Revenue (Descending)", value: "revenue.desc" },
  {
    name: "Primary Release Date (Ascending)",
    value: "primary_release_date.asc",
  },
  { name: "Title (Ascending)", value: "title.asc" },
  { name: "Title (Descending)", value: "title.desc" },
  {
    name: "Primary Release Date (Descending)",
    value: "primary_release_date.desc",
  },
  { name: "Vote Average (Ascending)", value: "vote_average.asc" },
  { name: "Vote Average (Descending)", value: "vote_average.desc" },
  { name: "Vote Count (Ascending)", value: "vote_count.asc" },
  { name: "Vote Count (Descending)", value: "vote_count.desc" },
];

export type ValidSortTypes = (typeof validSortObjects)[number]["value"];

const isValidSort = (sort_by: string) => {
  return validSortObjects.some((sort) => sort.value === sort_by);
};

export type MovieSearchParams = {
  page: string;
  sort_by: ValidSortTypes;
  include_adult: string;
};

const page = async ({ searchParams }: { searchParams: MovieSearchParams }) => {
  const props = await searchParams;

  if (!props.page || !props.sort_by || !props.include_adult) return notFound();

  if (parseInt(props.page) > 500) return notFound();

  if (!isValidSort(props.sort_by)) return notFound();

  if (props.include_adult !== "true" && props.include_adult !== "false")
    return notFound();

  const fetchMovieDiscover = await getMovieDiscover({
    include_adult: props.include_adult,
    sort_by: props.sort_by,
    page: props.page,
  });

  const fetchMovieData =
    (await fetchMovieDiscover?.json()) as TheMovieDBResponse;

  const result = fetchMovieData.results as TheMovieDBResult[];

  const MAX_PAGE = 500;

  return (
    <div>
      <div className="show-container w-[100%]">
        <div className="content-box flex flex-col gap-3 lg:flex-row">
          <Image
            alt="Discover Page"
            src="/discover.jpg"
            width={1000}
            height={1000}
            className="object-fit h-[400px] max-w-[90%] rounded-sm"
            draggable="false"
            priority
          />
          <div className="flex flex-col justify-center gap-x-5">
            <Badge className="gradient">
              <Layers />
              Discover
            </Badge>
            <h1 className="mt-3 text-2xl font-bold">Discover Movies</h1>
            <p className="mt-1 text-lg">
              Explore a curated mix of trending, top rated, and upcoming movies
            </p>
            <Link href="#movies-box" className="mt-5">
              <Button className="w-[100%] bg-blue-700 transition-transform duration-300 hover:bg-blue-700 hover:opacity-90">
                Discover now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="show-container mt-0 flex gap-x-2">
        <MovieFilterBox
          sort_by={props.sort_by}
          include_adult={props.include_adult}
        />

        <div id="movies-box" className="content-box w-[100%] scroll-mt-20">
          <div className="flex items-center justify-center gap-x-1">
            <PaginationButtons
              current_page={parseInt(props.page)}
              MAX_PAGE={MAX_PAGE}
            />
          </div>
          {result.map((item) => (
            <div key={item.id} className="content-box mt-3 flex space-x-3">
              <Image
                alt={item.title}
                src={`${item.poster_path ? RESOURCE_PATH.poster(item.poster_path) : "/placeholder.jpg"}`}
                width={1000}
                height={1000}
                className="object-fit h-[150px] w-[99px] rounded-sm"
                draggable="false"
                priority
              />
              <div className="flex flex-col">
                <h1 className="font-medium">{item.title}</h1>
                <p className="line-clamp-3 text-sm">{item.overview}</p>
                <div className="mt-2 flex items-center gap-x-1">
                  <RenderRatingStar rating={item.vote_average} size={12} />
                  <p className="flex items-center justify-center text-sm">
                    {Math.round(item.vote_average)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton href_id="#movies-box" threshold={30} />
    </div>
  );
};

export default page;
