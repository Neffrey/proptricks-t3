// LIBRARIES
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

// STATE STORES
import { useMyUserDataStore } from "components/stores/myUserDataStore";

// COMPONENTS
import NeffreyLogo from "components/svgs/neffreyLogo";
import IfUser from "components/helpers/ifUser";
import IfAdmin from "components/helpers/ifAdmin";

// FC
const Header = () => {
  // STORE
  const { myUser } = useMyUserDataStore();

  return (
    <div
      // Row Container
      className="flex w-full items-center justify-between border-b-4 border-solid border-neutral bg-gradient-to-r from-secondary-focus via-primary to-success px-5 py-2 shadow-xl"
    >
      <Link href="/" passHref>
        <div
          // Logo Container
          className="h-12 w-12 cursor-pointer fill-white"
        >
          <NeffreyLogo />
        </div>
      </Link>

      <div
        // MENU
        className="flex items-center justify-end gap-5"
      >
        <Link href={"/add-trick"} passHref>
          <div className="cursor-pointer text-lg font-semibold uppercase tracking-wider text-primary-content">
            Upload A Trick
          </div>
        </Link>
        <Link href={"/tricks"} passHref>
          <div className="cursor-pointer text-lg font-semibold uppercase tracking-wider text-primary-content">
            Tricks
          </div>
        </Link>
        {
          // IF ADMIN - SHOW USERS
          IfAdmin(
            <Link href={"/users"} passHref>
              <div className="cursor-pointer text-lg font-semibold uppercase tracking-wider text-primary-content">
                Users
              </div>
            </Link>
          )
        }
        {
          // ACCOUNT / LOGIN BUTTON
          IfUser(
            <Link href="/account" passHref>
              <div className="cursor-pointer font-semibold uppercase tracking-wider text-primary-content">
                {myUser?.name ? myUser.name : "My Account"}
              </div>
            </Link>,
            <button
              className="btn-accent btn text-lg font-semibold uppercase tracking-wider text-accent-content "
              onClick={() => signIn("google")}
            >
              Login
            </button>
          )
        }
      </div>
    </div>
  );
};
export default Header;
