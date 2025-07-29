import { DotPattern } from "@/components/magicui/dot-pattern";
import Navbar from "@/components/navigation/navbar";
import { type ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <DotPattern className="fixed -z-10 min-h-screen w-screen" />
    </div>
  );
};

export default MainLayout;
