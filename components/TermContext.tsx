"use client";
import { createContext, useContext } from "react";
import type { Term } from "@/content/types";

export const TermsContext = createContext<Record<string, Term> | null>(null);

export function TermsProvider({ terms, children }: { terms: Term[]; children: React.ReactNode }) {
  const map: Record<string, Term> = {};
  for (const t of terms) map[t.id] = t;
  return <TermsContext.Provider value={map}>{children}</TermsContext.Provider>;
}

export function useTerms() {
  return useContext(TermsContext);
}
