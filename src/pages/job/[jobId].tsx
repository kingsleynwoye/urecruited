import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Archivo } from "next/font/google";
// import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import User from "@/components/icon/user";
import Interview from "@/components/modal/invterview";
import { data } from "@/utils";
import Link from "next/link";

const archivo = Archivo({ subsets: ["latin"] });

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { jobId } = params as { jobId: string };
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
//   const jobs = await res.json();
//   const job = jobs.find((job: any) => job._id === jobId) || null;

//   if (!job) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       job,
//     },
//   };
// };

// const JobId = ({ job }: any) => {

const JobId = () => {
  const router = useRouter();
  const { jobId } = router.query;

  console.log("router", router);

  const job = data?.find((job: any) => job?.id === jobId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobid, setJobId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [jobName, setJobName] = useState("");
  const [skillName, setSkillName] = useState("");

  // if (!job) {
  //   return null;
  // }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = ({
    jobId,
    skillId,
    jobName,
    skillName,
  }: {
    jobId: string;
    skillId: string;
    jobName: string;
    skillName: string;
  }) => {
    setJobId(jobId);
    setSkillId(skillId);
    setJobName(jobName);
    setSkillName(skillName);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>{`URECRUITED - ${job?.position.company}: ${job?.position.name}`}</title>
        <meta
          name="description"
          content="Master your next job interview with URECRUITED! Train skills, get tailored advice, and receive real-time feedback to ace every question and land your dream job!"
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={archivo.className}>
        <section className="flex flex-col p-5 md:p-10 bg-black">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-thin text-[#e1e1e1]">
                {job?.position.name}
              </h1>
              <h2 className="text-2xl text-[#e1e1e1]">
                {job?.position.company}
              </h2>
            </div>
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-10 w-20 rounded-full flex items-center justify-center"
            >
              Back
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-4 md:p-8 rounded-lg shadow-lg bg-gray-900 text-white w-full max-w-5xl mx-auto mt-6">
              <h2 className="text-2xl md:text-4xl font-thin mb-4 bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
                Interview Preparation
              </h2>
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="text-base md:text-xl font-thin text-white">
                      Completed
                    </h4>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
                      0%
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base md:text-xl font-thin text-white">
                      Success Rate
                    </h4>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
                      0%
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base md:text-xl font-thin text-white">
                      Training Sessions
                    </h4>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
                      0
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {job?.position.knowledgeAreas.map((knowledge: any) => (
                    <div
                      key={knowledge.id}
                      className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800"
                    >
                      <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
                        {knowledge.name}
                        <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
                          0% <br />
                          Done
                        </span>
                      </h5>
                      <ul className="list-none space-y-2">
                        {knowledge.skills.map((skill: any) => (
                          <li
                            key={skill.id}
                            className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="pl-3 pr-3">{skill.name}</span>
                            </div>
                            <div className="relative flex items-center justify-center cursor-pointer">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
                              <button
                                onClick={() =>
                                  openModal({
                                    jobId: job.id,
                                    skillId: skill.id,
                                    jobName: knowledge.name,
                                    skillName: skill.name,
                                  })
                                }
                                className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer"
                              >
                                <User />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <footer className="mt-8 text-center text-gray-500">
            <div className="text-2xl font-bold">
              <button>
                <svg
                  width="220"
                  height="22"
                  viewBox="0 0 220 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.04 21.3C4.02 21.3 0.78 17.91 0.78 12.57V0.899999H6.42V12.12C6.42 14.97 7.23 15.84 11.04 15.84C14.85 15.84 15.66 14.97 15.66 12.12V0.899999H21.3V12.57C21.3 17.91 18.06 21.3 11.04 21.3ZM30.9489 21H25.3089V0.899999H37.0389C42.3489 0.899999 45.1389 3.12 45.1389 7.05C45.1389 10.23 43.5489 12.12 39.7089 12.6V12.9C41.7789 13.44 42.4389 14.43 43.1889 15.96L45.6789 21H39.1689L36.7689 16.08C36.0489 14.58 35.4489 14.16 33.2589 14.16H30.9489V21ZM30.9489 5.97V9.96H36.9789C38.6289 9.96 39.2289 9.66 39.2289 7.95C39.2289 6.36 38.6289 5.97 36.9789 5.97H30.9489ZM66.7475 21H48.8975V0.899999H66.7475V5.97H54.5375V8.37H66.2975V13.41H54.5375V15.93H66.7475V21ZM81.4696 21.3C74.4796 21.3 70.3696 17.22 70.3696 10.95C70.3696 4.68 74.4796 0.6 81.4696 0.6C88.2196 0.6 92.2696 3.81 92.2696 9.18V9.69H85.9696V9.18C85.9696 6.9 84.8896 6 81.5596 6C77.4796 6 76.3696 6.96 76.3696 10.95C76.3696 14.94 77.4796 15.9 81.5596 15.9C84.8896 15.9 85.9696 15 85.9696 12.72V12.21H92.2696V12.72C92.2696 18.09 88.2196 21.3 81.4696 21.3ZM101.715 21H96.0746V0.899999H107.805C113.115 0.899999 115.905 3.12 115.905 7.05C115.905 10.23 114.315 12.12 110.475 12.6V12.9C112.545 13.44 113.205 14.43 113.955 15.96L116.445 21H109.935L107.535 16.08C106.815 14.58 106.215 14.16 104.025 14.16H101.715V21ZM101.715 5.97V9.96H107.745C109.395 9.96 109.995 9.66 109.995 7.95C109.995 6.36 109.395 5.97 107.745 5.97H101.715ZM129.803 21.3C122.783 21.3 119.543 17.91 119.543 12.57V0.899999H125.183V12.12C125.183 14.97 125.993 15.84 129.803 15.84C133.613 15.84 134.423 14.97 134.423 12.12V0.899999H140.063V12.57C140.063 17.91 136.823 21.3 129.803 21.3ZM149.712 21H144.072V0.899999H149.712V21ZM166.132 21H160.492V5.97H153.382V0.899999H173.212V5.97H166.132V21ZM194.744 21H176.894V0.899999H194.744V5.97H182.534V8.37H194.294V13.41H182.534V15.93H194.744V21ZM209.166 21H198.996V0.899999H209.166C215.796 0.899999 219.996 4.59 219.996 10.95C219.996 17.31 215.796 21 209.166 21ZM209.166 5.97H204.636V15.93H209.166C212.736 15.93 213.966 15.48 213.966 10.95C213.966 6.42 212.736 5.97 209.166 5.97Z"
                    fill="url(#paint0_linear_1_19)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_19"
                      x1="0"
                      y1="11.5"
                      x2="221"
                      y2="11.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#4353FF" />
                      <stop offset="0.25" stopColor="#36C5F0" />
                      <stop offset="0.5" stopColor="#FF19D3" />
                      <stop offset="0.75" stopColor="#FFB713" />
                      <stop offset="1" stopColor="#8142FC" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </footer>
        </section>
        <Interview
          isOpen={isModalOpen}
          jobId={jobid}
          interviewId={skillId}
          jobName={jobName}
          skillName={skillName}
          onClose={closeModal}
        />
      </main>
    </>
  );
};

export default JobId;
