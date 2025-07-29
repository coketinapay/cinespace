import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { TheMovieDBResponse } from "@/types/the-moviedb-api";
import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";

export const getPopularMovies = async () => {
  try {
    const res = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.popular_movies(),
      next: {
        revalidate: SHOW_REVIEW_CAST_CACHELIFE, // 24 hours - popular movies don't change that often
      },
    });
    const data = (await res.json()) as TheMovieDBResponse;
    return data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};
