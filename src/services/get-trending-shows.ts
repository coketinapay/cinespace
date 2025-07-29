import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { TheMovieDBResponse } from "@/types/the-moviedb-api";

export const getTrendingShows = async (limit?: number) => {
  try {
    const res = await apiShowsWrapper({
      baseUrl: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    });
    const data = (await res.json()) as TheMovieDBResponse;

    return limit ? data.results.slice(0, limit) : data.results;
  } catch (e: unknown) {
    console.error(e);
    throw new Error("An error occured");
  }
};
