import { create } from "zustand";

interface AppState {
  headerTitle: string;
  changeHeaderTitle: (by: string) => void;
}

export const useApp = create<AppState>()((set) => ({
  headerTitle: "",
  changeHeaderTitle: (newHeaderTitle: string) =>
    set({
      headerTitle: newHeaderTitle,
    }),
}));
