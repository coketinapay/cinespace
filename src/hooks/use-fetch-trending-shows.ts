import { SHOW_REVIEW_CAST_CACHELIFE } from "@/constants/cache";
import { getTrendingShows } from "@/services/get-trending-shows";
import { useQuery } from "@tanstack/react-query";

function useFetchTrendingShows({
  limit,
  shouldFetch,
}: {
  limit?: number;
  shouldFetch?: boolean;
}) {
  const { data, error, isFetching } = useQuery({
    queryKey: ["all-trending-shows", { limit }],
    queryFn: () => getTrendingShows(limit),
    enabled: shouldFetch,
    refetchOnMount: false,
    staleTime: SHOW_REVIEW_CAST_CACHELIFE,
    refetchOnWindowFocus: false,
  });

  return { allTrendingShows: data, error, isFetching };
}

export default useFetchTrendingShows;
