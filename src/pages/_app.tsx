// LIBRARIES
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// COMPONENTS
import { trpc } from "utils/trpc";
import Header from "components/templates/header";
import Footer from "components/templates/footer";

// GLOBAL STYLES
import "../styles/globals.css";

// APP COMPONENT
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
