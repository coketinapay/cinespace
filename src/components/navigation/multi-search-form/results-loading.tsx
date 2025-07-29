import { Loader2 } from "lucide-react";

//Check if will be reused

export const ResultsLoading = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center space-y-3 p-10">
      <Loader2 className="animate-spin" color="blue" size={30} />
      <h1>Looking it up on the database...</h1>
    </div>
  );
};
