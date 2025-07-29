import { apiShowsWrapper } from "@/lib/api-shows-wrapper";
import { MOVIES_API } from "@/vendors/the-moviedb-api";

export const getMovieById = async (movie_id: string) => {
  try {
    const res = await apiShowsWrapper({
      baseUrl: MOVIES_API.read.movie(movie_id),
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};
