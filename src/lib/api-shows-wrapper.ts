export type ApiShowsWrapper = {
  baseUrl: string;
  next?: NextFetchRequestConfig;
  cache?: "force-cache" | "no-store";
};

export const apiShowsWrapper = ({ baseUrl, next }: ApiShowsWrapper) => {
  const apiCall = fetch(baseUrl, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTFlODE5Y2Q2OTg4NzI4YjU3YzgxYTdiNGQ2ODk0MiIsIm5iZiI6MTc1MTYxMTYxOS43MDEsInN1YiI6IjY4Njc3OGUzNGE2MzA5MTgyMTliYzc5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FpDrqyb8_r2YUOBecAeeLWRRBL_vASpNVZXeUSsANEA`,
    },
    next,
  });
  return apiCall;
};
