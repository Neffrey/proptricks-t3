// LIBRARIES
import create from "zustand";

export interface UserEditModalStoreProps {
  userId: string;
  setUserId: (input: string) => void;
  formError: string | null;
  setFormError: (input: string) => void;
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
  createdInput: string;
  setCreatedInput: (input: string) => void;
  createdError: string | null;
  setCreatedError: (input: string) => void;
  nameInput: string;
  setNameInput: (input: string) => void;
  nameError: string | null;
  setNameError: (input: string) => void;
  emailInput: string;
  setEmailInput: (input: string) => void;
  emailError: string | null;
  setEmailError: (input: string) => void;
  roleInput: string;
  setRoleInput: (input: string) => void;
  roleError: string | null;
  setRoleError: (input: string) => void;
  resetErrors: () => void;
  resetModal: () => void;
}

export const useUserEditModalStore = create<UserEditModalStoreProps>((set, get) => ({
  userId: "",
  setUserId: (input) => set({ userId: input }),
  formError: null,
  setFormError: (input) => set({ formError: input }),
  isModalOpen: false,
  toggleIsModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  createdInput: "",
  setCreatedInput: (input) => set({ createdInput: input }),
  createdError: null,
  setCreatedError: (input) => set({ createdError: input }),
  nameInput: "",
  setNameInput: (input) => set({ nameInput: input }),
  nameError: null,
  setNameError: (input) => set({ nameError: input }),
  emailInput: "",
  setEmailInput: (input) => set({ emailInput: input }),
  emailError: null,
  setEmailError: (input) => set({ emailError: input }),
  roleInput: "",
  setRoleInput: (input) => set({ roleInput: input }),
  roleError: null,
  setRoleError: (input) => set({ roleError: input }),
  resetErrors: () => {
    set({
      formError: null,
      createdError: null,
      nameError: null,
      emailError: null,
      roleError: null,
    });
  },
  resetModal: () => {
    set({
      userId: "",
      formError: null,
      createdInput: "",
      createdError: null,
      nameInput: "",
      nameError: null,
      emailInput: "",
      emailError: null,
      roleInput: "",
      roleError: null,
    });
  },
}));
