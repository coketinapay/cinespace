export type SortOrder = "asc" | "desc";

export const sortOrder = ["asc", "desc"];

export const validSortObjects = [
  { name: "Original Title (Ascending)", value: "original_title.asc" },
  { name: "Original Title (Descending)", value: "original_title.desc" },
  { name: "Popularity (Ascending)", value: "popularity.asc" },
  { name: "Popularity (Descending)", value: "popularity.desc" },
  { name: "Revenue (Ascending)", value: "revenue.asc" },
  { name: "Revenue (Descending)", value: "revenue.desc" },
  {
    name: "Primary Release Date (Ascending)",
    value: "primary_release_date.asc",
  },
  { name: "Title (Ascending)", value: "title.asc" },
  { name: "Title (Descending)", value: "title.desc" },
  {
    name: "Primary Release Date (Descending)",
    value: "primary_release_date.desc",
  },
  { name: "Vote Average (Ascending)", value: "vote_average.asc" },
  { name: "Vote Average (Descending)", value: "vote_average.desc" },
  { name: "Vote Count (Ascending)", value: "vote_count.asc" },
  { name: "Vote Count (Descending)", value: "vote_count.desc" },
];

export type ValidSortTypes = (typeof validSortObjects)[number]["value"];
