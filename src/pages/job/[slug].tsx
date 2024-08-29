import React from "react";
import Head from "next/head";
import { Archivo } from "next/font/google";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const archivo = Archivo({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
  const jobs = await res.json();
  const job = jobs.find((job: any) => job._id === slug) || null;

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job,
    },
  };
};

const Slug = ({ job }: any) => {
  const router = useRouter();

  if (!job) {
    return null;
  }

  return (
    <>
      <Head>
        <title>URECRUITED - Ace your interviews</title>
        <meta
          name="description"
          content="Master your next job interview with URECRUITED! Train skills, get tailored advice, and receive real-time feedback to ace every question and land your dream job!"
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={archivo.className}>
        <section className="flex flex-col p-5 md:p-10">
          <div className="flex justify-between">
            <div className="mb-4">
              <h1 className="text-2xl font-normal">{job.position}</h1>
              <h2 className="text-lg font-light">{job.company}</h2>
            </div>
            <button
              className="bg-white text-black h-10 w-20 rounded-full"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Slug;
