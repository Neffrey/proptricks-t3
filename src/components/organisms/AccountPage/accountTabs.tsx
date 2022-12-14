// LIBRARIES
import { FaCheck, FaExclamation } from "react-icons/fa";

// COMPONENTS
import { useAccountTabsStore } from "components/stores/accountTabsStore";
import CompletedTasks from "components/organisms/AccountPage/completedTasks";
import AssignedTasks from "components/organisms/AccountPage/assignedTasks";
import addClassName from "components/helpers/addClassName";

// CONSTANTS
const ACTIVE_CSS = "bg-secondary text-primary-content";
const INACTIVE_CSS =
  "bg-secondary-focus bg-opacity-50 text-secondary-content shadow-[inset_0px_-4px_7px_4px_rgba(0,0,0,0.15)]";

// FC
const AccountTabs = () => {
  // STATE
  const { allTabs, currentTab, setCurrentTab } = useAccountTabsStore();

  // HANDLERS
  const dynamicTabCss = (tabId: string) => {
    if (currentTab === tabId) return ACTIVE_CSS;
    return INACTIVE_CSS;
  };

  return (
    <div className={"flex w-full flex-col items-center bg-secondary"}>
      <div className="grid w-full grid-cols-2 place-content-center">
        {allTabs.map((tab) => (
          <div
            key={tab.id}
            className={
              "flex cursor-pointer p-4" + addClassName(dynamicTabCss(tab.id))
            }
            onClick={() => setCurrentTab(tab.id)}
          >
            <h3 className="w-full text-center text-xl font-bold">
              {tab.icon === "exclamation" && (
                <FaExclamation className="inline-block" />
              )}
              {tab.icon === "checkmark" && <FaCheck className="inline-block" />}
              <div className="inline-block p-2" />
              {tab.name}
            </h3>
          </div>
        ))}
      </div>
      <div className="">
        {currentTab === "assigned-tasks" && <AssignedTasks />}
        {currentTab === "completed-tasks" && <CompletedTasks />}
      </div>
    </div>
  );
};

export default AccountTabs;
