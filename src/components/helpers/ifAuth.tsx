// LIBRARIES
import { useSession } from "next-auth/react";

// FC
const IfAuth = (
  authed: React.ReactNode,
  unauthed: React.ReactNode | null = null
) => {
  // SESSION
  const { data: session, status } = useSession();

  return status === "authenticated"
    ? authed
    : unauthed;
};

export default IfAuth;
