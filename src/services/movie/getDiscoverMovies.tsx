import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";
import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";
import { UrlBuilder } from "@/app/(main)/movie/discover/_movie-filter-box";

export const getMovieDiscover = async ({
  sort_by,
  page,
  include_adult,
}: UrlBuilder) => {
  try {
    const fetchMovieDiscover = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.movie_discover({
        sort_by: sort_by,
        page: page,
        include_adult: include_adult,
      }),
      next: {
        revalidate: SHOW_REVIEW_CAST_CACHELIFE,
      },
    });

    return fetchMovieDiscover;
  } catch (e) {
    console.error(e);
  }
};
