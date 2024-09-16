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
  console.log("jobId", jobId);

  const job = data?.find((job: any) => job?.id === jobId);
  console.log("job", job);

  console.log("data", data);

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
                                    jobId: knowledge.id,
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
