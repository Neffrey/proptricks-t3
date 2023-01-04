// LIBRARIES
import create from "zustand";

export interface AddTrickFormStoreProps {
  nameInput: string;
  setNameInput: (input: string) => void;
  nameError: string | null;
  setNameError: (error: string) => void;
  currentNames: string[];
  setCurrentNames: (names: string[]) => void;
  propInput: string;
  setPropInput: (input: string) => void;
  propError: string | null;
  setPropError: (error: string) => void;
  tagsInput: string;
  setTagsInput: (input: string) => void;
  tagsError: string | null;
  setTagsError: (error: string) => void;
  currentTags: string[];
  setCurrentTags: (tags: string[]) => void;
  videoUrlInput: string;
  setVideoUrlInput: (input: string) => void;
  videoUrlError: string;
  setVideoUrlError: (error: string) => void;
  prereqInput: string;
  setPrereqInput: (input: string) => void;
  prereqError: string;
  setPrereqError: (error: string) => void;
  tryNextInput: string;
  setTryNextInput: (input: string) => void;
  tryNextError: string;
  setTryNextError: (error: string) => void;
  formError: string | null;
  setFormError: (error: string) => void;
}

export const useNameChangeFormStore = create<AddTrickFormStoreProps>((set) => ({
  nameInput: "",
  setNameInput: (input) => set({ nameInput: input }),
  nameError: null,
  setNameError: (error) => set({ nameError: error }),
  currentNames: [],
  setCurrentNames: (names) => set({ currentNames: names }),
  propInput: "",
  setPropInput: (input) => set({ propInput: input }),
  propError: null,
  setPropError: (error) => set({ propError: error }),
  tagsInput: "",
  setTagsInput: (input) => set({ tagsInput: input }),
  tagsError: null,
  setTagsError: (error) => set({ tagsError: error }),
  currentTags: [],
  setCurrentTags: (tags) => set({ currentTags: tags }),
  videoUrlInput: "",
  setVideoUrlInput: (input) => set({ videoUrlInput: input }),
  videoUrlError: "",
  setVideoUrlError: (error) => set({ videoUrlError: error }),
  prereqInput: "",
  setPrereqInput: (input) => set({ prereqInput: input }),
  prereqError: "",
  setPrereqError: (error) => set({ prereqError: error }),
  tryNextInput: "",
  setTryNextInput: (input) => set({ tryNextInput: input }),
  tryNextError: "",
  setTryNextError: (error) => set({ tryNextError: error }),
  formError: null,
  setFormError: (error) => set({ formError: error }),
}));
