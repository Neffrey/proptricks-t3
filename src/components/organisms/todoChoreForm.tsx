// LIBRARIES
import { trpc } from "utils/trpc";

// COMPONENTS
import { useChoreFormStore } from "components/stores/completedChoreFormStore";
import { useChoresDataStore } from "components/stores/choresDataStore";
import { useUserDataStore } from "components/stores/userDataStore";

// FC
const TodoChoreForm = () => {
  // STORE
  const { user, setUser, allUsers, setAllUsers } = useUserDataStore();
  const { allChores, setAllChores } = useChoresDataStore();
  const {
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

  // TIME SELECT SWITCH - return time in minutes
  const getMinutesFromTimeSelect = () => {
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

  // HANDLERS
  const handleSubmit = () => {
    addChore.mutate({
      name: name,
      comment: comment,
      isDifficult: isDifficult,
      time: Math.ceil(getMinutesFromTimeSelect() / 5), // time in 5 minute chunks rounded up
    });
  };

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-lg  border border-solid border-neutral-content bg-secondary/40 p-5">
      <label className="col-span-2 flex min-w-full flex-col items-start justify-center uppercase tracking-widest">
        Todo chore
        <div className="p-1" />
        <input
          name="addCompletedChoreName"
          type="text"
          value={name}
          className="w-full min-w-full rounded-md border-2 border-primary bg-neutral-content p-2 text-neutral"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="p-4" />
      <label className="col-span-2 flex min-w-full flex-col items-start justify-center uppercase tracking-widest">
        Optional Comment
        <div className="p-1" />
        <textarea
          name="addCompletedChoreComment"
          value={comment}
          className="col-span-2 w-full min-w-full rounded-md border-2 border-primary bg-neutral-content p-2 text-neutral"
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <div className="grid min-w-full grid-cols-2 pt-5">
        <label className="flex cursor-pointer flex-col items-start justify-center p-2 uppercase tracking-widest">
          Assign chore to
          <div className="p-1" />
          <select
            name="addCompletedChorePoints"
            value={timeSelectOption}
            className="active:border-primary-hover w-full min-w-full rounded-md border-2 border-primary bg-neutral-content p-2 text-neutral"
            onChange={(e) => setTimeSelectOption(parseInt(e.target.value, 10))}
          >
            {user?.id && user?.name ? (
              <option value={user.id}>Myself</option>
            ) : (
              <></>
            )}
            {/* {TIME_SELECT_OPTIONS.map((value, index) => (
              <option key={index} value={index}>
                {value}
              </option>
            ))} */}
          </select>
          <div className="p-2" />
        </label>
      </div>
      <div className="p-2" />

      <button
        className="btn-lg btn col-span-2 w-full bg-primary/60 hover:bg-primary hover:text-neutral"
        onClick={handleSubmit}
      >
        Add Todo Chore
      </button>
    </div>
  );
};

export default TodoChoreForm;
