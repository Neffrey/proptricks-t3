// LIBRARIES
import { trpc } from "utils/trpc";

// COMPONENTS
import Input from "components/molecules/input";
import { useChoresDataStore } from "components/stores/choresDataStore";
import {
  useChoreFormStore,
  TIME_SELECT_OPTIONS,
  getMinutesFromTimeSelectChoice,
} from "components/stores/choreFormStore";
import { useUserDataStore } from "components/stores/userDataStore";
import addClassName from "components/helpers/addClassName";

// FC
const ChoreForm = () => {
  // STORE
  const { user, setUser, allUsers, setAllUsers } = useUserDataStore();
  const { allChores, setAllChores } = useChoresDataStore();
  const {
    formMode,
    setFormMode,
    name,
    setName,
    comment,
    setComment,
    isDifficult,
    toggleIsDifficult,
    timeSelectOption,
    setTimeSelectOption,
    customTime,
    setCustomTime,
    resetForm,
  } = useChoreFormStore();

  //tRPC
  const addChore = trpc.useMutation(["user.addCompletedChore"], {
    onSuccess(data) {
      setAllChores([
        ...allChores,
        {
          ...data,
          user: data.user?.name ? data.user.name : null,
        },
      ]);
      resetForm();
    },
  });
  const getCurrentUser = trpc.useQuery(["public.getUser"], {
    onSuccess(data) {
      setUser(data);
    },
  });
  const getAllUsers = trpc.useQuery(["user.getAllUsers"], {
    onSuccess(data) {
      if (data) {
        setAllUsers(data);
      }
    },
  });

  // HANDLERS
  const handleSubmit = () => {
    addChore.mutate({
      name: name,
      comment: comment,
      isDifficult: isDifficult,
      time: Math.ceil(
        getMinutesFromTimeSelectChoice(timeSelectOption, customTime) / 5
      ), // time in 5 minute chunks rounded up
    });
  };

  return (
    <div
      // Form Container
      className={
        "flex w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-lg  border border-solid border-neutral-content" +
        (formMode === "completed"
          ? addClassName("bg-primary/30")
          : addClassName("bg-secondary/30")) +
        ""
      }
    >
      <div className="grid w-full grid-cols-2">
        <Input
          // FormMode Radio Button - "completed"
          inputName="formMode"
          type="radio"
          label="Complete A Chore"
          labelPosition="left"
          labelClassName={
            "justify-between p-4 gap-2 font-bold uppercase tracking-widest text-md" +
            addClassName(formMode === "completed" ? "" : "bg-primary/50")
          }
          inputClassName={
            "radio border-2 border-solid" +
            addClassName(
              formMode === "completed"
                ? "border-primary checked:bg-primary"
                : "border-white/60"
            )
          }
          value={formMode === "completed" ? "true" : "false"}
          setValue={() => setFormMode("completed")}
        />
        <Input
          // FormMode Radio Button - "todo"
          inputName="formMode"
          type="radio"
          label="Create A Todo"
          labelPosition="left"
          labelClassName={
            "justify-between p-4 gap-2 font-bold uppercase tracking-widest text-md" +
            addClassName(formMode === "todo" ? "" : "bg-secondary/50")
          }
          inputClassName={
            "radio border-2 border-solid" +
            addClassName(
              formMode === "todo"
                ? "border-secondary checked:bg-secondary"
                : "border-white/60"
            )
          }
          value={formMode === "todo" ? "true" : "false"}
          setValue={() => setFormMode("todo")}
        />
      </div>
      <div
        // Form Inputs
        className="flex w-full max-w-lg flex-col items-center justify-center gap-5 p-4"
      >
        <Input
          // Chore Name Input
          label={formMode === "completed" ? "Completed chore" : "Todo chore"}
          labelClassName="gap-2 uppercase tracking-widest text-md"
          inputClassName={
            "border-2 rounded-md bg-neutral-content text-neutral" +
            addClassName(
              formMode === "completed" ? "border-primary" : "border-secondary"
            )
          }
          value={name}
          setValue={setName}
        />
        <Input
          // Comment Input
          label="Optional comment"
          type="textarea"
          labelClassName="gap-2 uppercase tracking-widest text-md"
          inputClassName={
            "border-2 rounded-md bg-neutral-content text-neutral" +
            addClassName(
              formMode === "completed" ? "border-primary" : "border-secondary"
            )
          }
          value={comment}
          setValue={setComment}
        />
        {formMode === "completed" ? (
          <div
            // Additional Options for Completed Chores
            className="grid min-w-full grid-cols-2 gap-6"
          >
            <Input
              // Is Difficult Checkbox
              label="Difficult Chore"
              labelPosition="right"
              type="checkbox"
              value={isDifficult ? "true" : "false"}
              setValue={toggleIsDifficult}
              labelClassName="justify-around items-center gap-2 uppercase tracking-widest text-md"
              inputClassName="checkbox checkbox-lg rounded-md border-2 checkbox-primary border-primary"
            />
            <select
              name="addCompletedChorePoints"
              value={timeSelectOption}
              className="w-full min-w-full rounded-md border-2 border-primary bg-neutral-content p-2 text-neutral"
              onChange={(e) =>
                setTimeSelectOption(parseInt(e.target.value, 10))
              }
            >
              {TIME_SELECT_OPTIONS.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </select>
            {
              // Custom Time if "Custom" is selected
              timeSelectOption === 4 && (
                <label className="col-span-2 grid min-w-full cursor-pointer grid-cols-2 items-center justify-center gap-5 text-center">
                  Enter time in minutes
                  <input
                    type="number"
                    value={customTime}
                    placeholder="Enter time in minutes"
                    className="w-full min-w-full rounded-md border-2 border-primary bg-neutral-content p-2 text-neutral"
                    onChange={(e) =>
                      setCustomTime(parseInt(e.target.value, 10))
                    }
                  />
                </label>
              )
            }
          </div>
        ) : (
          <label
            // Additional Options for Completed Chores
            className="flex cursor-pointer flex-col items-start justify-center p-2 uppercase tracking-widest"
          >
            Assign chore to
            <select
              name="addCompletedChorePoints"
              value={timeSelectOption}
              className="w-full min-w-full rounded-md border-2 border-secondary bg-neutral-content p-2 text-neutral"
              onChange={(e) =>
                setTimeSelectOption(parseInt(e.target.value, 10))
              }
            >
              <>
                {user?.id && user?.name && (
                  <option value={user.id}>Myself</option>
                )}
                {allUsers.map((u) => {
                  if (user?.id !== u.id) {
                    return (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    );
                  }
                })}
              </>
            </select>
          </label>
        )}
        <button
          className="btn-primary btn"
          onClick={() => console.log("all users", allUsers)}
        >
          log users
        </button>
        <button
          className={
            "btn-lg btn mt-2 w-full" +
            addClassName(
              formMode === "completed"
                ? "bg-primary/70 hover:bg-primary/80"
                : "bg-secondary/70 hover:bg-secondary/80"
            )
          }
          onClick={handleSubmit}
        >
          Add Completed Chore
        </button>
      </div>
    </div>
  );
};

export default ChoreForm;
