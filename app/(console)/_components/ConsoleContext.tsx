"use client";

import React from "react";

type ConsoleState = {
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  range: "Last 6 months" | "Last 30 days";
  setRange: (r: "Last 6 months" | "Last 30 days") => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  availability: "All" | "Available" | "Unavailable";
  setAvailability: (v: "All" | "Available" | "Unavailable") => void;
};

const ConsoleContext = React.createContext<ConsoleState | null>(null);

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [range, setRange] = React.useState<"Last 6 months" | "Last 30 days">("Last 6 months");
  const [showFilters, setShowFilters] = React.useState(false);
  const [availability, setAvailability] = React.useState<"All" | "Available" | "Unavailable">("All");

  return (
    <ConsoleContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        range,
        setRange,
        showFilters,
        setShowFilters,
        availability,
        setAvailability,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
}

export function useConsole() {
  const ctx = React.useContext(ConsoleContext);
  if (!ctx) throw new Error("useConsole must be used within ConsoleProvider");
  return ctx;
}
