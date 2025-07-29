import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";

export const getMovieSimilarShows = async (movie_id: string) => {
  try {
    const fetchSimilarShows = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.movie_similar(movie_id),
      next: {
        revalidate: SHOW_REVIEW_CAST_CACHELIFE,
      },
    });

    return fetchSimilarShows;
  } catch (e) {
    console.error(e);
  }
};
