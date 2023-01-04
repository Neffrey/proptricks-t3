// LIBRARIES
import { useSession } from "next-auth/react";

// FC
const IfUser = (
  authed: React.ReactNode,
  unauthed: React.ReactNode | null = null
) => {
  // SESSION
  const { data: session, status } = useSession();
  console.log("IFUSER - session", session);

  return status === "authenticated" &&
    (session?.user?.role === "user" || session?.user?.role === "admin")
    ? authed
    : unauthed;
};

export default IfUser;
