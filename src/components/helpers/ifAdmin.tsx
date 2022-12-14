// LIBRARIES
import { useSession } from "next-auth/react";

// FC
const IfAdmin = (
  authed: React.ReactNode,
  unauthed: React.ReactNode | null = null
) => {
  // SESSION
  const { data: session, status } = useSession();

  return status === "authenticated" && session?.user?.role === "admin"
    ? authed
    : unauthed;
};

export default IfAdmin;
