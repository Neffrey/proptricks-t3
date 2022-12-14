// LIBRARIES
import React from "react";
import { trpc } from "utils/trpc";
import { FaPenSquare, FaWindowClose } from "react-icons/fa";

// COMPONENTS
import {
  useAllUsersDataStore,
  User,
} from "components/stores/allUsersDataStore";
import { useUserEditModalStore } from "components/stores/userEditModalStore";
import UserEditModal from "components/molecules/userEditModal";
import monthNumberToName from "components/helpers/monthNumberToName";
import dateToHoursMinutesAMPM from "components/helpers/dateToHoursMinutesAMPM";

// FC
const AllUsersTable = () => {
  // STORE
  const { allUsers, setAllUsers } = useAllUsersDataStore();
  const {
    toggleIsModalOpen,
    setUserId,
    setNameInput,
    setEmailInput,
    setRoleInput,
  } = useUserEditModalStore();

  // tRPC
  const {
    // data: userData,
    isLoading: getAllUsersLoading,
    error: getAllUsersError,
  } = trpc.useQuery(["admin.getAllUsers"], {
    onSuccess: (users) => {
      setAllUsers(users);
    },
  });
  const { mutate: deleteUser } = trpc.useMutation(["admin.deleteUser"], {
    onSuccess: (user) => {
      if (user?.id && allUsers) {
        setAllUsers(allUsers.filter((u) => u.id !== user.id));
      }
    },
  });

  // HANDLERS
  const handleEditUser = (user: User) => {
    setUserId(user?.id ? user.id : "");
    setNameInput(user?.name ? user.name : "");
    setEmailInput(user?.email ? user.email : "");
    setRoleInput(user?.role ? user.role : "");
    toggleIsModalOpen();
  };

  const handleDeleteUser = (user: User) => {
    if (user?.id) deleteUser({ id: user.id });
  };

  // RETURN
  return getAllUsersLoading && allUsers?.length === 0 ? (
    <div className="text-lg text-base-content">{`No Users Found :'(`}</div>
  ) : (
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-2 flex justify-center text-lg font-semibold uppercase">
        Created
      </div>
      <div className="col-span-2 flex justify-center text-lg font-semibold uppercase">
        Name
      </div>
      <div className="col-span-4 flex justify-center text-lg font-semibold uppercase">
        Email
      </div>
      <div className="col-span-2 flex justify-center text-lg font-semibold uppercase">
        Role
      </div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Edit
      </div>
      <div className="col-span-1 flex justify-center text-lg font-semibold uppercase">
        Delete
      </div>
      {
        // TABLE DATA
        allUsers &&
          allUsers?.map((user) => (
            <React.Fragment key={user.id}>
              <div
                // Created
                className="col-span-2 flex justify-center"
              >
                {user?.createdAt
                  ? `${monthNumberToName(
                      user.createdAt.getMonth()
                    )} ${user.createdAt.getDate()}`
                  : "N/A"}
                <br />
                {dateToHoursMinutesAMPM(user.createdAt)}
              </div>
              <div
                // Name
                className="col-span-2 flex justify-center"
              >
                {user.name}
              </div>
              <div
                // Email
                className="col-span-4 text-lg"
              >
                {user.email}
              </div>
              <div
                // Role
                className="col-span-2 text-lg"
              >
                {user.role}
              </div>
              <div
                // Edit
                className="col-span-1 flex cursor-pointer justify-center text-xl text-warning/70 hover:text-warning"
                onClick={() => handleEditUser(user)}
              >
                <FaPenSquare />
              </div>
              <div
                // Delete
                className="col-span-1 flex cursor-pointer justify-center text-xl text-error/70 hover:text-error"
                onClick={() => handleDeleteUser(user)}
              >
                <FaWindowClose />
              </div>
            </React.Fragment>
          ))
      }
      <UserEditModal />
    </div>
  );
};

export default AllUsersTable;
