// LIBRARIES
import Image from "next/future/image";
import { signOut } from "next-auth/react";
import { FaImage } from "react-icons/fa";

// COMPONENTS
import { useUserDataStore } from "components/stores/userDataStore";

// FC
const AccountDetails = () => {
  // STATE
  const { user } = useUserDataStore();
  return (
    <div className="grid grid-cols-4 items-center p-20 ">
      <h1 className="col-span-3 text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
        Hello {user?.name ? user.name : "friend"}!
      </h1>
      <div className="flex flex-col items-center justify-center gap-6">
        {user?.image ? (
          <Image
            alt={`${user?.name}'s Profile Pic`}
            src={user.image}
            width={150}
            height={150}
            className="col-span-2 rounded-md"
          />
        ) : (
          <FaImage className="text-5xl" />
        )}
        <button
          className="btn-xl btn btn-primary w-full font-bold"
          onClick={() => signOut()}
        >
          Logout
        </button>
        <label
          htmlFor="account-name-change-modal"
          className="modal-button btn w-full font-bold"
        >
          Change Name
        </label>
      </div>
    </div>
  );
};

export default AccountDetails;
