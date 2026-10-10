"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";
import { GlobalLoading } from "@/components/overlay/global-loading";
import { OverlayRenderer } from "@/components/overlay/overlay-renderer";
import { makeQueryClient } from "@/lib/query/query-client";

export function Providers({ children }: { children: ReactNode }) {

  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <GlobalLoading />
      <OverlayRenderer />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
