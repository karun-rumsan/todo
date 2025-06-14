import { create } from "zustand";

export type FilterType = "all" | "done" | "upcoming";

interface TodoStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
