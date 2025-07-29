export type ApiShowsWrapper = {
  baseUrl: string;
  next?: NextFetchRequestConfig;
  cache?: "force-cache" | "no-store";
};

export const apiShowsWrapper = ({ baseUrl, next }: ApiShowsWrapper) => {
  const res = fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`,
    },
    next,
  });
  return res;
};
