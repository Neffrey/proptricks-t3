// LIBRARIES
import create from "zustand";
import { User } from "next-auth";

// TYPES
type UserWithID = User & { id: string };

export interface UserDataStoreTypes {
  user: User | null | undefined;
  setUser: (userData: User | null | undefined) => void;
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
}

export const useUserDataStore = create<UserDataStoreTypes>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  allUsers: [],
  setAllUsers: (users) => set({ allUsers: users }),
}));
