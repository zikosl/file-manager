import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useFolderConfigStore {
  router: "client" | "trash" | "star" | "spaces";
  setRouter: (value: "client" | "trash" | "star" | "spaces") => void;
}

export const useFolderConfig = create(
  persist<useFolderConfigStore>(
    (set, get) => ({
      router: get()?.router ?? "client",
      setRouter: (value) => {
        set({ router: value });
      }
    }),
    {
      name: 'folderConfig',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
