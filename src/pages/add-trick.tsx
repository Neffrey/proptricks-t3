// LIBRARIES
import { type NextPage } from "next";
import Head from "next/head";

// COMPONENTS
import IfUser from "components/helpers/ifUser";
import AddTrickAuthed from "components/templates/addTrickAuthed";
import PageUnauthed from "components/templates/pageUnauthed";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add a Trick</title>
        <meta name="description" content="Upload a trick of your own" />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-screen flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Add a Trick
        </h1>
        {IfUser(<AddTrickAuthed />, <PageUnauthed />)}
      </main>
    </>
  );
};

export default Home;
