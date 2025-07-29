import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { TheMovieDBResponse } from "@/types/the-moviedb-api";

export const getPopularMovies = async () => {
  try {
    const res = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.popular_movies(),
      next: {
        revalidate: 86400, // 24 hours - popular movies don't change that often
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch popular movies: ${res.status}`);
    }

    const data = (await res.json()) as TheMovieDBResponse;
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
