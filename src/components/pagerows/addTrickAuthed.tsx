// LIBRARIES
import { trpc } from "utils/trpc";

// COMPONENTS
import { useChoresDataStore } from "components/stores/choresDataStore";
import SortableTable from "components/organisms/sortableTable";
import ChoreForm from "components/organisms/choreForm";

// TABLE COLUMNS
const columns = [
  { title: "Date", accessor: "date", type: "date" },
  { title: "Status", accessor: "status" },
  { title: "User", accessor: "user" },
  { title: "Chore", accessor: "name", gridSpan: 2 },
  { title: "Comment", accessor: "comment", gridSpan: 4 },
  {
    title: "Difficult",
    accessor: "isDifficult",
    type: "boolean",
    justify: "center",
  },
  { title: "Points", accessor: "points", justify: "center" },
  { title: "Delete", accessor: "", type: "delete", justify: "center" },
];

// FC
const ChoresAuthed = () => {
  // STORE
  const { allChores, setAllChores, deleteChore } = useChoresDataStore();

  //tRPC
  // const { isLoading: getAllChoresIsLoading } = trpc.useQuery(
  //   ["user.getAllChores"],
  //   {
  //     onSuccess: (data) => {
  //       setAllChores(
  //         data.map((chore) => {
  //           if (chore.user.name) {
  //             return {
  //               ...chore,
  //               user: chore.user.name,
  //             };
  //           } else
  //             return {
  //               ...chore,
  //               user: null,
  //             };
  //         })
  //       );
  //     },
  //   }
  // );
  // const deleteChoreMutation = trpc.useMutation(["user.deleteChore"], {
  //   onSuccess: (chore) => {
  //     if (chore?.id) deleteChore(chore.id);
  //   },
  // });

  // RETURN
  return (
    <>
      <div className="p-4" />
      <ChoreForm />
      <div className="flex items-center justify-center p-12">
        {/* {getAllChoresIsLoading ? (
          <SortableTable
            columns={columns}
            data={allChores}
            deleteMutation={deleteChoreMutation}
          />
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
};
export default ChoresAuthed;
