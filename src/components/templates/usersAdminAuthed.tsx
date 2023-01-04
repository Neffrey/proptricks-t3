// COMPONENTS
import AllUsersTable from "components/molecules/allUsersTable";

// FC
const UsersAdminAuthed = () => {
  // RETURN
  return (
    <div className="flex min-h-screen w-full flex-col p-8 text-center text-xl">
      <AllUsersTable />
    </div>
  );
};
export default UsersAdminAuthed;
