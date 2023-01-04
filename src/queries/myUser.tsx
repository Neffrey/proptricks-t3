// LIBRARIES
import { api } from "utils/api";

// STATE STORES
import { useMyUserDataStore } from "components/stores/myUserDataStore";

const MyUser = () => {
  // STORE
  const { myUser, setMyUser } = useMyUserDataStore();

  // tRPC
  const getMyUser = api.user.getMyUser.useQuery();
  if (getMyUser.data && myUser !== getMyUser.data) setMyUser(getMyUser.data);

  // RETURN
  return null;
};
export default MyUser;
