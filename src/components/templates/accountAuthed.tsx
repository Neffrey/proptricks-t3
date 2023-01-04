// STATE STORES
import { useMyUserDataStore } from "stores/myUserDataStore";

// COMPONENTS
import AccountDetails from "components/organisms/AccountPage/accountDetails";
import AccountNameChangeModal from "components/organisms/AccountPage/accountNameChangeModal";

const AccountAuthed = () => {
  // STORE
  const { myUser } = useMyUserDataStore();

  // RETURN
  return (
    <>
      <AccountDetails />
      {myUser ? <AccountNameChangeModal user={myUser} /> : null}
    </>
  );
};
export default AccountAuthed;
