import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>PropTricks</title>
        <meta
          name="description"
          content="The uLtImAtE chore tracker for the rainbow sunshine house"
        />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-screen flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          PropTricks
        </h1>
      </main>
    </>
  );
};

export default Home;
