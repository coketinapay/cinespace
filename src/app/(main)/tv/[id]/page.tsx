import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      hero
      <main className="show-container">{id}</main>
    </div>
  );
};

export default page;
