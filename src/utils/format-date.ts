export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // can be 'short' or 'numeric'
    day: "2-digit",
  });
};
