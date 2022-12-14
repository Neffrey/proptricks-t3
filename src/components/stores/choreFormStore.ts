// LIBRARIES
import create from "zustand";

export type FormMode = "completed" | "todo";

export interface ChoreFormStoreProps {
  formMode: FormMode;
  setFormMode: (formMode: FormMode) => void;
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

export const useChoreFormStore = create<ChoreFormStoreProps>((set) => ({
  formMode: "completed",
  setFormMode: (formMode) => set({ formMode }),
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
}));

// TIME SELECT VALUES
export const TIME_SELECT_OPTIONS = [
  "5 Minutes",
  "15 Minutes",
  "30 Minutes",
  "1 Hour",
  "Enter Custom",
];

// TIME SELECT SWITCH - return time in minutes
export const getMinutesFromTimeSelectChoice = (
  timeSelectOption: number,
  customTime: number
) => {
  switch (timeSelectOption) {
    case 0:
      return 5;
    case 1:
      return 15;
    case 2:
      return 30;
    case 3:
      return 60;
    case 4:
      return customTime;
    default:
      return 0;
  }
};
