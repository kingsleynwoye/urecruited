import React from "react";
import Head from "next/head";
import { Archivo } from "next/font/google";
import { GetServerSideProps } from "next";

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
        <section className="flex flex-col items-center p-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-4">{job.position}</h1>
            <h2 className="text-xl font-semibold mb-2">{job.company}</h2>
            <h3 className="text-lg text-gray-700 mb-2">
              Candidate: {job.name}
            </h3>
            <p className="text-gray-600">{job.jobDescription}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Slug;
