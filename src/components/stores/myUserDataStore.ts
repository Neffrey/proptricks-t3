// LIBRARIES
import create from "zustand";
import { type User } from "next-auth";

export interface MyUserDataStoreTypes {
  myUser: User | null | undefined;
  setMyUser: (myUser: User | null | undefined) => void;
}

export const useMyUserDataStore = create<MyUserDataStoreTypes>((set) => ({
  myUser: null,
  setMyUser: (myUser) => set({ myUser }),
}));
