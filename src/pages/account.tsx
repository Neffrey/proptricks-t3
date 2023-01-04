// LIBRARIES
import type { NextPage } from "next";
import Head from "next/head";

// COMPONENTS
import IfUser from "components/helpers/ifUser";
import AccountAuthed from "components/templates/accountAuthed";
import PageUnauthed from "components/templates/pageUnauthed";

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="View & Edit Account Details" />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-full">
        {IfUser(<AccountAuthed />, <PageUnauthed />)}
      </main>
    </>
  );
};

export default Account;
