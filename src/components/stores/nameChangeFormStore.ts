// LIBRARIES
import create from "zustand";

export interface NameChangeFormStoreProps {
  nameInput: string;
  setNameInput: (input: string) => void;
  nameError: string | null;
  setNameError: (input: string) => void;
  formError: string | null;
  setFormError: (input: string) => void;
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
}

export const useNameChangeFormStore = create<NameChangeFormStoreProps>(
  (set, get) => ({
    nameInput: "",
    setNameInput: (input: string) => set({ nameInput: input }),
    nameError: null,
    setNameError: (input: string) => set({ nameError: input }),
    formError: null,
    setFormError: (input: string) => set({ formError: input }),
    isModalOpen: false,
    toggleIsModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  })
);
