// LIBRARIES
import create from "zustand";

export interface ChoreFormStoreProps {
  name: string;
  setName: (input: string) => void;
  date: Date | null;
  setDate: (input: Date) => void;
  userName: string;
  setUserName: (input: string) => void;
  comment: string;
  setComment: (input: string) => void;
  isDifficult: boolean;
  toggleIsDifficult: () => void;
  timeSelectOption: number;
  setTimeSelectOption: (input: number) => void;
  customTime: number;
  setCustomTime: (input: number) => void;
  resetForm: () => void;
}

// DEFAULT VALUES
const defaultValues = {
  name: "",
  date: null,
  userName: "",
  comment: "",
  isDifficult: false,
  timeSelectOption: 0,
  customTime: 0,
};

export const useChoreFormStore = create<ChoreFormStoreProps>(
  (set) => ({
    name: defaultValues.name,
    setName: (input: string) => set({ name: input }),
    date: defaultValues.date,
    setDate: (input: Date) => set({ date: input }),
    userName: defaultValues.userName,
    setUserName: (input: string) => set({ userName: input }),
    comment: defaultValues.comment,
    setComment: (input: string) => set({ comment: input }),
    isDifficult: defaultValues.isDifficult,
    toggleIsDifficult: () =>
      set((state) => ({ isDifficult: !state.isDifficult })),
    timeSelectOption: defaultValues.timeSelectOption,
    setTimeSelectOption: (input: number) => set({ timeSelectOption: input }),
    customTime: defaultValues.customTime,
    setCustomTime: (input: number) => set({ customTime: input }),
    resetForm: () => {
      set({ ...defaultValues });
    },
  })
);
