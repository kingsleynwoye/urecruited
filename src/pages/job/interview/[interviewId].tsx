import React from "react";
import Head from "next/head";
import { Archivo } from "next/font/google";
import { GetServerSideProps } from "next";

const archivo = Archivo({ subsets: ["latin"] });

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { interviewId } = params as { interviewId: string };
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/interviews`);
//   const interviews = await res.json();
//   const interview =
//     interviews.find((interview: any) => interview._id === interviewId) || null;

//   if (!interview) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       interview,
//     },
//   };
// };

const interviewId = ({ interview }: any) => {
  // if (!interview) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>{`URECRUITED - ${interview.position}`}</title>
        <meta
          name="description"
          content="Master your next job interview with URECRUITED! Train skills, get tailored advice, and receive real-time feedback to ace every question and land your dream job!"
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main
        className={`${archivo.className} flex min-h-screen flex-col bg-gray-950 text-white`}
      >
        <div className="cv-checker rounded-lg shadow-lg w-full max-w-5xl mx-auto">
          <div className="mb-4 flex justify-between items-center sticky top-0 z-10 bg-black bg-opacity-50 backdrop-blur p-4">
            <a href="/" className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#81CAFF] to-[#6cadff] text-transparent bg-clip-text">
                U
              </span>
              <span className="bg-gradient-to-r from-[#EC0AE3] to-[#B181FF] text-transparent bg-clip-text">
                HIRED
              </span>
            </a>
            <div>
              <a
                href="/job/d39b8130-ae04-451b-a3ae-7633462a9158"
                className="mr-4 px-4 py-2 bg-secondaryBg rounded-lg text-white mainBg"
              >
                Dashboard
              </a>
            </div>
          </div>
          <div className="curriculum-analysis p-8 rounded-lg shadow-lg bg-gray-900 text-white w-full max-w-5xl mx-auto mt-6">
            <span className="text-lg font-thin mb-4 mainColor">
              Interview Preparation
            </span>
            <h1 className="text-4xl font-thin mb-4 text-white">
              Fashion Retail and Design:{" "}
              <b>
                Experience in fashion retail, editorial or agency environment
              </b>
            </h1>
            <h2 className="text-lg">
              <span className="font-thin mb-4 secondaryColor">
                Interviewer:
              </span>
              <span className="font-bold mb-4 secondaryColor">
                Alice Johnson | Senior Vice President of Marketing
              </span>
            </h2>
            <div className="chat p-4">
              <div className="start-interview p-8 rounded-lg shadow-lg bg-gray-800 text-white w-full max-w-5xl mx-auto mt-6">
                <h3 className="text-2xl font-thin mb-4 text-white">
                  Ready to Start Your Interview?
                </h3>
                <p className="text-lg mb-4 font-thin">
                  Click the button below to begin the interview.
                </p>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full p-4 transition-transform duration-500 ease-out transform hover:scale-110">
                  Start Interview
                </button>
              </div>
            </div>
          </div>
          <footer className="m-8 text-center text-gray-500">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-[#81CAFF] to-[#6cadff] text-transparent bg-clip-text">
                U
              </span>
              <span className="bg-gradient-to-r from-[#EC0AE3] to-[#B181FF] text-transparent bg-clip-text">
                HIRED
              </span>
            </div>
          </footer>
        </div>
      </main> */}
      <h1>Hello World</h1>
    </>
  );
};

export default interviewId;
