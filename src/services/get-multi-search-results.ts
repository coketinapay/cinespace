import { apiShowsWrapper } from "@/lib/api-shows-wrapper";

export const getMultiSearchResults = async (searchQuery: string) => {
  try {
    const res = await apiShowsWrapper({
      baseUrl: `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US`,
    });
    return res;
  } catch (e) {
    console.error(e);
    throw new Error("An error occured");
  }
};
