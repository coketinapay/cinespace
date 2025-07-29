import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";

export const getMovieReviews = async (movie_id: string) => {
  try {
    const fetchMovieCredits = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.movie_reviews(movie_id),
      next: {
        revalidate: SHOW_REVIEW_CAST_CACHELIFE,
      },
    });

    return fetchMovieCredits;
  } catch (e) {
    console.error(e);
  }
};
