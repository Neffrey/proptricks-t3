// LIBRARIES
import { api } from "utils/api";

// COMPONENTS
import { useUserDataStore } from "stores/myUserDataStore";

// FC
const StatsAuthed = () => {
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
      <div className="flex min-h-screen w-full flex-col p-8 text-center text-xl">
        Stats page Under Contstruction
      </div>
    );
  return <></>;
};
export default StatsAuthed;
