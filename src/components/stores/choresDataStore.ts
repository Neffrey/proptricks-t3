// LIBRARIES
import create from "zustand";

// TYPES
import { Chore } from "@prisma/client";

type ChoreWithUserName = Chore & {
  user?: string | null | undefined;
  status?: string | null | undefined;
};

export interface ChoresDataStoreTypes {
  allChores: ChoreWithUserName[];
  setAllChores: (chores: ChoreWithUserName[]) => void;
  status: string;
  setStatus: (status: string) => void;
  deleteChore: (choreId: string) => void;
}

export const useChoresDataStore = create<ChoresDataStoreTypes>((set, get) => ({
  allChores: [],
  setAllChores: (chores) => set({ allChores: chores }),
  status: "completed",
  setStatus: (status) => set({ status: status }),
  deleteChore: (id) => {
    set({ allChores: get().allChores.filter((chore) => chore.id !== id) });
  },
}));
