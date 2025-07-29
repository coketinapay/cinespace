import React from "react";

import { Loader2 } from "lucide-react";
const LoadingPage = ({
  loading_description,
}: {
  loading_description: string;
}) => {
  return (
    <div className="absolute top-0 z-[99999999] h-screen w-screen">
      <div className="flex h-screen flex-col items-center justify-center gap-y-5">
        <Loader2 color="blue" size={100} className="animate-spin" />
        <h1 className="text-gradient font-bold">{loading_description}</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
