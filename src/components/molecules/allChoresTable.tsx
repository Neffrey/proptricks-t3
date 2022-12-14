// LIBRARIES
import React from "react";
import { trpc } from "utils/trpc";
import { FaWindowClose } from "react-icons/fa";

// COMPONENTS
import { useChoresDataStore } from "components/stores/choresDataStore";
import monthNumberToName from "components/helpers/monthNumberToName";
import dateToHoursMinutesAMPM from "components/helpers/dateToHoursMinutesAMPM";

// FC
const AllChoresTable = () => {
  // STORE
  const { allChores, setAllChores, deleteChore } = useChoresDataStore();

  //tRPC
  const { isLoading: getAllChoresIsLoading } = trpc.useQuery(
    ["user.getAllChores"],
    {
      onSuccess: (data) => {
        setAllChores(
          data.map((chore) => {
            if (chore.user.name) {
              return {
                ...chore,
                user: chore.user.name,
              };
            } else
              return {
                ...chore,
                user: null,
              };
          })
        );
      },
    }
  );
  const deleteChoreMutation = trpc.useMutation(["user.deleteChore"], {
    onSuccess: (chore) => {
      if (chore?.id) deleteChore(chore.id);
    },
  });

  return getAllChoresIsLoading || allChores?.length === 0 ? (
    <div className="text-lg text-base-content">No Chores Found. Add one :D</div>
  ) : (
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Date
      </div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Status
      </div>
      <div className="col-span-1 text-lg font-semibold uppercase">User</div>
      <div className="col-span-2 text-lg font-semibold uppercase">Chore</div>
      <div className="col-span-4 text-lg font-semibold uppercase">Comment</div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Difficult
      </div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Points
      </div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Delete
      </div>
      {allChores &&
        allChores?.map((chore) => (
          <React.Fragment key={chore.id}>
            <div
              // DATE
              className="col-span-1 flex justify-center"
            >
              {`${monthNumberToName(
                chore.date.getMonth()
              )} ${chore.date.getDate()}`}
              <br />
              {dateToHoursMinutesAMPM(chore.date)}
            </div>
            <div
              // STATUS
              className="col-span-1 flex justify-center"
            >
              {chore.status}
            </div>
            <div
              //USER
              className="col-span-1 text-lg"
            >
              {chore?.user ? chore.user : ""}
            </div>
            <div
              // CHORE
              className="col-span-2 text-lg"
            >
              {chore.name}
            </div>
            <div
              // COMMENT
              className="col-span-4 text-lg"
            >
              {chore.comment}
            </div>
            <div
              // DIFFICULT
              className="col-span-1 flex justify-center text-lg"
            >
              {chore.isDifficult ? "Yes" : "No"}
            </div>
            <div
              // POINTS
              className="col-span-1 flex justify-center"
            >
              {chore.points}
            </div>
            <div
              // DELETE
              className="col-span-1 flex cursor-pointer justify-center text-xl text-error/70 hover:text-error"
              onClick={() =>
                deleteChoreMutation.mutate({
                  id: chore.id,
                })
              }
            >
              <FaWindowClose />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default AllChoresTable;
