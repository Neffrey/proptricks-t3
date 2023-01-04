// LIBRARIES
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// tRPC
import { api } from "../utils/api";

// STYLES
import "../styles/globals.css";

// COMPONENTS
import Header from "components/templates/header";
import Footer from "components/templates/footer";
import InitialQueries from "components/queries/initialQueries";

const PropTricksApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <InitialQueries />
    </SessionProvider>
  );
};

export default api.withTRPC(PropTricksApp);
