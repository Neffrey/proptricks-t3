// LIBRARIES
import React from "react";
import create from "zustand";
import { FaExclamation } from "react-icons/fa";

// TYPES
type TabId = "assigned-tasks" | "completed-tasks";
type TabName = string;
interface Tab {
  icon: string;
  id: TabId;
  name: TabName;
}
interface AccountTabsStoreProps {
  currentTab: TabId;
  setCurrentTab: (tab: TabId) => void;
  allTabs: Tab[];
}

export const useAccountTabsStore = create<AccountTabsStoreProps>((set) => ({
  currentTab: "assigned-tasks",
  setCurrentTab: (tab) => set({ currentTab: tab }),
  allTabs: [
    { id: "assigned-tasks", name: "Assigned Tasks", icon: "exclamation" },
    { id: "completed-tasks", name: "Completed Tasks", icon: "checkmark" },
  ],
}));
