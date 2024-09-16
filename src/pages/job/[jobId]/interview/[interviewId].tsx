import React from "react";
import Head from "next/head";
import { Archivo } from "next/font/google";
// import { GetServerSideProps } from "next";
import { data } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";

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

const InterviewId = () => {
  const router = useRouter();
  // console.log("router", router);

  const { interviewId, jobId } = router.query;
  console.log("interviewId", interviewId);
  console.log("jobId", jobId);

  const skillId = Array.isArray(interviewId) ? interviewId[0] : interviewId;

  const interview = data?.find(
    (interview: any) => interview?.position.id === interviewId
  );
  console.log("interview", interview);

  // Function to find the skill by its id
  const findSkillById = (data: any[], id: string) => {
    for (const interview of data) {
      for (const knowledgeArea of interview.position.knowledgeAreas) {
        const skill = knowledgeArea.skills.find(
          (skill: any) => skill.id === id
        );
        if (skill) return skill;
      }
    }
    return null; // Return null if no skill is found
  };

  const selectedSkill = skillId ? findSkillById(data, skillId) : null;
  console.log("selectedSkill", selectedSkill);

  // if (!interview) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>{`URECRUITED - ${interview?.position.company}: ${selectedSkill?.name}`}</title>
        <meta
          name="description"
          content="Master your next job interview with URECRUITED! Train skills, get tailored advice, and receive real-time feedback to ace every question and land your dream job!"
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${archivo.className} flex min-h-screen flex-col bg-gray-950 text-white`}
      >
        <div className="cv-checker rounded-lg shadow-lg w-full max-w-5xl mx-auto">
          <div className="mb-4 flex justify-between items-center sticky top-0 z-10 bg-black bg-opacity-50 backdrop-blur p-4">
            <Link href="/" className="text-5xl font-bold">
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
            </Link>
            <div>
              <Link
                href={`/job/${jobId}`}
                className="px-4 py-2 bg-secondaryBg rounded-full text-white mainBg"
              >
                Back
              </Link>
            </div>
          </div>
          <div className="curriculum-analysis p-8 rounded-lg shadow-lg bg-gray-900 text-white w-full max-w-5xl mx-auto mt-6">
            <span className="text-lg font-thin mb-4 mainColor">
              Interview Preparation
            </span>
            <h1 className="text-4xl font-thin mb-4 text-white">
              {selectedSkill?.name}:{" "}
              {/* <b>{interview?.position.knowledgeAreas.skills.name}</b> */}
            </h1>
            <h2 className="text-lg">
              <span className="font-thin mb-4 secondaryColor">
                Interviewer:
              </span>
              <span className="font-bold mb-4 secondaryColor">
                {/* {interview?.position.interviewers.name} |{" "}
                {interview?.position.interviewers.role} */}
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
        </div>
      </main>
    </>
  );
};

export default InterviewId;
