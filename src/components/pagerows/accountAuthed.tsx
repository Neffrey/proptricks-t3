// LIBRARIES
import { trpc } from "utils/trpc";

// COMPONENTS
import { useUserDataStore } from "components/stores/userDataStore";
import AccountDetails from "components/organisms/AccountPage/accountDetails";
import AccountNameChangeModal from "components/organisms/AccountPage/accountNameChangeModal";
import AccountTabs from "components/organisms/AccountPage/accountTabs";

const AccountAuthed = () => {
  // STORE
  const { user, setUser } = useUserDataStore();

  // tRPC
  const {
    data: userData,
    isLoading,
    error,
  } = trpc.useQuery(["public.getUser"], {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  // RETURN
  if (error) return <div>error</div>;
  if (isLoading) return <div>loading</div>;
  if (userData)
    return (
      <>
        <AccountDetails />
        <AccountTabs />
        {user && <AccountNameChangeModal user={user} />}
      </>
    );
  return <></>;
};
export default AccountAuthed;
