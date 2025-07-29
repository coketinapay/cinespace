"use client";
import { type ReactNode } from "react";
import { QueryClientProviderContext } from "./query-client-provider-context";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProviderContext>{children}</QueryClientProviderContext>
    </>
  );
};
