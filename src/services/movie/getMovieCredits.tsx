import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";
export const getMovieCredits = async (movie_id: string) => {
  try {
    const fetchCredits = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.movie_credits(movie_id),
      next: {
        revalidate: SHOW_REVIEW_CAST_CACHELIFE,
      },
    });

    return fetchCredits;
  } catch (e) {
    console.error(e);
  }
};
