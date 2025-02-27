import { FormEvent, useState, useRef, useEffect } from "react";
import { Archivo } from "next/font/google";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Loader } from "@/components/loader";
import { Error } from "@/components/error";
import { data } from "@/utils";

const archivo = Archivo({ subsets: ["latin"] });

type Message = {
  text: string;
  sender: "user" | "bot";
};

// type Job = {
//   _id: number;
//   name: string;
//   company: string;
//   position: string;
//   jobDescription: string;
// };

export default function Home() {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const interviewsRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      try {
        // const response = await fetch("/api/jobs");
        // if (!response.ok) {
        //   console.error(`Error: ${response.status}`);
        // }
        // const data: Job[] = await response.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Form state management
  const [formData, setFormData] = useState({
    name: "John Doe",
    company: "OpenAI",
    position: "Software Engineer",
    jobDescription: `Responsibilities

Work collaboratively with the team, to craft a thoughtful, long-term technical strategy that anticipates future needs while being pragmatic about what’s needed today.

Constantly delivering applications and solutions.

Participating in software requirement review, preliminary and critical design, integration readiness review, and software acceptance review.

Design, build and maintain scalable backend systems.

Identify performance issues and bugs, and provide solutions to these problems.

Work with other team members to ensure we are building the right products.

Software validation, testing and approval.

Delegating tasks/projects to the team members.

Collaboration with the team to identify and fix technical problems.

Analyzing users’ needs and then finding applications to serve them.

Conduct security audits to identify areas of improvement.

Guiding the team through technical issues and challenges.

Delegating tasks and achieving daily, weekly, and monthly goals.

Keeping up-toDate with industry trends and development.

Updating work schedules and performing troubleshooting as required.

Qualifications

University degree in Informational Technology, Computer Science, Software Engineering, or a related subject.

At least 4 years of commercial experience in a similar role.

Create software technical documentation.

Proficient experience working on a variety of software development projects.

Ability to work to a strict deadline.

Comfortable with a variety of languages such as Java, Node.js/Express, GO, Ruby, React, as well as MongoDB, SQL, Postgres databases, etc.

Deep knowledge of the cloud infrastructure (Heroku, AWS, Digital Ocean, etc.), microservices, and development of APIs.

Demonstratable track record of success in developing and implementing a comprehensive technology strategy that is aligned with and supports the current and future business goals of the company.

Strong Engineering background with previous hands-on development and deployment of production-level code.

Possess a broad understanding of how software fits into the overall system.

Well-versed in Software Architecture and Design - You should be able to spot flaws in the existing architecture and design. You would help us refactor and re-architecture the code for easier and faster development.

Participate in code reviews.

Collaborate and work with other team members to ensure we are building the right product.`,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataMessage = `
        Name: ${formData.name}
        Company: ${formData.company}
        Position: ${formData.position}
        Job Description: ${formData.jobDescription}
      `;

    if (formDataMessage.trim()) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/jobs", {
          // Update the endpoint here
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            position: formData.position,
            jobDescription: formData.jobDescription,
          }),
        });

        if (!response.ok) {
          console.error("Failed to create job");
        }

        const data = await response.json();

        router.push(`/job/${data._id}`);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false); // Reset loading state

        // Reset form data to empty strings
        setFormData({
          name: "",
          company: "",
          position: "",
          jobDescription: "",
        });
      }
    }
  };

  // if (loading) return <Loader />;
  // if (error) return <Error />;

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
      <nav
        className={`${archivo.className} bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 right-0 w-full shadow-sm px-5 z-50`}
      >
        <div className="h-20 flex items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
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
          {/* Right side: Auth Links */}
          <div className="flex items-center space-x-4">
            {/* Nav Links */}
            <ul className="hidden md:flex items-center space-x-6">
              <li>
                <button
                  onClick={() => {
                    scrollToSection(heroRef);
                    setMenuOpen(false);
                  }}
                  className="text-[#e1e1e1] font-medium text-lg"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    scrollToSection(featuresRef);
                    setMenuOpen(false);
                  }}
                  className="text-[#e1e1e1] font-medium text-lg"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    scrollToSection(interviewsRef);
                    setMenuOpen(false);
                  }}
                  className="text-[#e1e1e1] font-medium text-lg"
                >
                  Interviews
                </button>
              </li>
              <button
                onClick={() => {
                  scrollToSection(getStartedRef);
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-[#e1e1e1] px-5 py-2 rounded-full font-medium transition duration-200 text-lg"
              >
                Get Started
              </button>
            </ul>
            <button
              className="text-[#e1e1e1] md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                width="30"
                height="16"
                viewBox="0 0 30 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.49984 0.5H27.4998C28.0524 0.5 28.5823 0.658035 28.973 0.93934C29.3637 1.22064 29.5832 1.60218 29.5832 2C29.5832 2.39782 29.3637 2.77936 28.973 3.06066C28.5823 3.34196 28.0524 3.5 27.4998 3.5H2.49984C1.9473 3.5 1.4174 3.34196 1.0267 3.06066C0.635997 2.77936 0.416504 2.39782 0.416504 2C0.416504 1.60218 0.635997 1.22064 1.0267 0.93934C1.4174 0.658035 1.9473 0.5 2.49984 0.5ZM2.49984 12.5H27.4998C28.0524 12.5 28.5823 12.658 28.973 12.9393C29.3637 13.2206 29.5832 13.6022 29.5832 14C29.5832 14.3978 29.3637 14.7794 28.973 15.0607C28.5823 15.342 28.0524 15.5 27.4998 15.5H2.49984C1.9473 15.5 1.4174 15.342 1.0267 15.0607C0.635997 14.7794 0.416504 14.3978 0.416504 14C0.416504 13.6022 0.635997 13.2206 1.0267 12.9393C1.4174 12.658 1.9473 12.5 2.49984 12.5ZM2.49984 6.5H27.4998C28.0524 6.5 28.5823 6.65804 28.973 6.93934C29.3637 7.22064 29.5832 7.60218 29.5832 8C29.5832 8.39782 29.3637 8.77935 28.973 9.06066C28.5823 9.34196 28.0524 9.5 27.4998 9.5H2.49984C1.9473 9.5 1.4174 9.34196 1.0267 9.06066C0.635997 8.77935 0.416504 8.39782 0.416504 8C0.416504 7.60218 0.635997 7.22064 1.0267 6.93934C1.4174 6.65804 1.9473 6.5 2.49984 6.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-start space-y-4 pb-4 shadow-sm">
            <li>
              <button
                onClick={() => {
                  scrollToSection(heroRef);
                  setMenuOpen(false);
                }}
                className="text-lg font-medium text-[#e1e1e1]"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(featuresRef);
                  setMenuOpen(false);
                }}
                className="text-lg font-medium text-[#e1e1e1]"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(interviewsRef);
                  setMenuOpen(false);
                }}
                className="text-lg font-medium text-[#e1e1e1]"
              >
                Interviews
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(getStartedRef);
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-[#e1e1e1] px-5 py-2 rounded-full text-lg font-medium transition duration-200"
              >
                Get Started
              </button>
            </li>
          </ul>
        )}
      </nav>
      <main className={`${archivo.className}`}>
        <section className="relative bg-gray-50" ref={heroRef}>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url(/images/background.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="">
                    <h1 className="text-g font-bold text-4xl md:text-7xl">
                      URECRUITED
                    </h1>
                    <p className="mt-4 text-lg text-gray-200">
                      Ace Every Interview Question with Confidence Inside Your
                      Job Description
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>
          <section className="pb-10 bg-black -mt-60 md:-mt-40">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-[#e1e1e1] p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" y1="19" x2="12" y2="23"></line>
                          <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                      </div>
                      <h6 className="text-xl font-semibold text-black">
                        Talk Freely
                      </h6>
                      <p className="mt-2 mb-4 text-black">
                        Talk freely with the AI and get feedback on your answers
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-[#e1e1e1] p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      </div>
                      <h6 className="text-xl font-semibold text-black">
                        Keep a History
                      </h6>
                      <p className="mt-2 mb-4 text-black">
                        Review your interviews to improve your results
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-[#e1e1e1] p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="20" x2="12" y2="10"></line>
                          <line x1="18" y1="20" x2="18" y2="4"></line>
                          <line x1="6" y1="20" x2="6" y2="16"></line>
                        </svg>
                      </div>
                      <h6 className="text-xl font-semibold text-black">
                        Progress Tracking
                      </h6>
                      <p className="mt-2 mb-4 text-black">
                        Follow the metrics to see your progression
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="pt-6 w-full md:w-3/12 px-4 text-center"> */}
                <div className="lg:pt-12 pt-0 w-full md:w-3/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-[#e1e1e1] p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </div>
                      <h6 className="text-xl font-semibold text-black">
                        Made with love
                      </h6>
                      <p className="mt-2 mb-4 text-black">
                        Crafted with care to help you achieve your dreams
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* <section
          ref={featuresRef}
          className="bg-black text-gray-white container mx-auto py-16 px-4 md:px-20"
        >
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
              <div className="md:w-5/12">
                <h2 className="text-2xl font-bold mb-4">Master Every Topic</h2>
                <p className="text-gray-400 mb-6 text-center md:text-left">
                  Sharpen your answer to every question through our AI-powered
                  interview
                </p>
              </div>
              <div className="md:w-6/12 max-w-lg">
                <Image
                  height={500}
                  width={500}
                  className="rounded-md border-none"
                  src="/feature1.png"
                  alt="Feature"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start md:justify-between">
              <div className="md:w-5/12">
                <h2 className="text-2xl font-bold mb-4">
                  Tailored Recommendation
                </h2>
                <p className="text-gray-400 mb-6 text-center md:text-left">
                  Get expert advice on how to show your expertise in each
                  question effectively
                </p>
              </div>
              <div className="md:w-6/12 max-w-lg">
                <Image
                  height={500}
                  width={500}
                  className="rounded-md border-none"
                  src="/feature2.png"
                  alt="Feature"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
              <div className="md:w-5/12">
                <h2 className="text-2xl font-bold mb-4">Real-Time Feedback</h2>
                <p className="text-gray-400 mb-6 text-center md:text-left">
                  Improve your answers through real-time feedback
                </p>
              </div>
              <div className="md:w-6/12 max-w-lg">
                <Image
                  height={500}
                  width={500}
                  className="rounded-md border-none"
                  src="/feature3.png"
                  alt="Feature"
                />
              </div>
            </div>
          </div>
        </section> */}
        {/* <section
          ref={featuresRef}
          className="sm:px-20 px-6 flex w-full gap-24 pt-24 items-center bg-[url('/images/how-to-bg.png')]"
        > */}
        <section ref={featuresRef} className="bg-[#000000]">
          <div className="sm:px-20 px-6 flex w-full gap-24 pt-24 items-center">
            <div className="lg:w-1/2 w-full">
              <h2 className="font-bold text-neutral-2 text-3xl text-center md:text-left leading-relaxed text-[#e1e1e1]">
                Features
              </h2>
              <div className="flex flex-col gap-10 sm:gap-0 w-full text-neutral-3 my-14">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col items-center">
                    {/* <svg
                    width="57"
                    height="57"
                    viewBox="0 0 57 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="28.5"
                      cy="28.5"
                      r="28.5"
                      fill="#8936ea"
                      fillOpacity="0.5"
                    ></circle>
                    <path
                      d="M38.08 22.6598H18.88C18.6254 22.6598 18.3812 22.5634 18.2012 22.3918C18.0211 22.2203 17.92 21.9875 17.92 21.7449C17.92 21.5022 18.0211 21.2695 18.2012 21.0979C18.3812 20.9263 18.6254 20.8299 18.88 20.8299H35.2C35.4546 20.8299 35.6988 20.7335 35.8788 20.5619C36.0589 20.3903 36.16 20.1576 36.16 19.915C36.16 19.6723 36.0589 19.4396 35.8788 19.268C35.6988 19.0964 35.4546 19 35.2 19H18.88C18.1162 19 17.3836 19.2892 16.8435 19.804C16.3034 20.3187 16 21.0169 16 21.7449V36.3842C16 37.1121 16.3034 37.8103 16.8435 38.3251C17.3836 38.8398 18.1162 39.129 18.88 39.129H38.08C38.5892 39.129 39.0776 38.9362 39.4376 38.5931C39.7977 38.2499 40 37.7844 40 37.2991V24.4897C40 24.0044 39.7977 23.539 39.4376 23.1958C39.0776 22.8526 38.5892 22.6598 38.08 22.6598ZM33.76 31.8094C33.4752 31.8094 33.1968 31.7289 32.96 31.5781C32.7232 31.4273 32.5386 31.2129 32.4296 30.9622C32.3206 30.7114 32.2921 30.4354 32.3477 30.1692C32.4032 29.903 32.5404 29.6584 32.7418 29.4665C32.9432 29.2746 33.1997 29.1438 33.4791 29.0909C33.7584 29.0379 34.0479 29.0651 34.3111 29.169C34.5742 29.2729 34.7991 29.4488 34.9573 29.6745C35.1155 29.9002 35.2 30.1655 35.2 30.437C35.2 30.8009 35.0483 31.15 34.7782 31.4074C34.5082 31.6648 34.1419 31.8094 33.76 31.8094Z"
                      fill="white"
                    ></path>
                  </svg> */}
                    <svg
                      width="58"
                      height="57"
                      viewBox="0 0 58 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="29"
                        cy="28.5"
                        r="28.5"
                        fill="#8936ea"
                        fillOpacity="0.5"
                      ></circle>
                      <path
                        d="M21.5 16C20.1739 16 18.9021 16.5268 17.9645 17.4645C17.0268 18.4021 16.5 19.6739 16.5 21V31C16.5 31.6566 16.6293 32.3068 16.8806 32.9134C17.1319 33.52 17.5002 34.0712 17.9645 34.5355C18.9021 35.4732 20.1739 36 21.5 36H31.5C32.1566 36 32.8068 35.8707 33.4134 35.6194C34.02 35.3681 34.5712 34.9998 35.0355 34.5355C35.4998 34.0712 35.8681 33.52 36.1194 32.9134C36.3707 32.3068 36.5 31.6566 36.5 31V21C36.5 20.3434 36.3707 19.6932 36.1194 19.0866C35.8681 18.48 35.4998 17.9288 35.0355 17.4645C34.5712 17.0002 34.02 16.6319 33.4134 16.3806C32.8068 16.1293 32.1566 16 31.5 16H21.5ZM32.208 23.708L26.208 29.708C26.1151 29.8011 26.0048 29.875 25.8833 29.9254C25.7618 29.9758 25.6315 30.0018 25.5 30.0018C25.3685 30.0018 25.2382 29.9758 25.1167 29.9254C24.9952 29.875 24.8849 29.8011 24.792 29.708L21.792 26.708C21.699 26.615 21.6253 26.5046 21.575 26.3832C21.5246 26.2617 21.4987 26.1315 21.4987 26C21.4987 25.8685 21.5246 25.7383 21.575 25.6168C21.6253 25.4954 21.699 25.385 21.792 25.292C21.885 25.199 21.9954 25.1253 22.1168 25.075C22.2383 25.0246 22.3685 24.9987 22.5 24.9987C22.6315 24.9987 22.7617 25.0246 22.8832 25.075C23.0046 25.1253 23.115 25.199 23.208 25.292L25.5 27.586L30.792 22.292C30.9798 22.1042 31.2344 21.9987 31.5 21.9987C31.7656 21.9987 32.0202 22.1042 32.208 22.292C32.3958 22.4798 32.5013 22.7344 32.5013 23C32.5013 23.2656 32.3958 23.5202 32.208 23.708ZM22.5 38C23.412 39.214 24.864 40 26.5 40H31.5C33.8869 40 36.1761 39.0518 37.864 37.364C39.5518 35.6761 40.5 33.3869 40.5 31V24C40.5 22.364 39.714 20.912 38.5 20V31C38.5 32.8565 37.7625 34.637 36.4497 35.9497C35.137 37.2625 33.3565 38 31.5 38H22.5Z"
                        fill="white"
                      ></path>
                    </svg>
                    <div className="hidden sm:block">
                      <svg
                        width="2"
                        height="129"
                        viewBox="0 0 2 129"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="1"
                          y1="2.18557e-08"
                          x2="0.999994"
                          y2="129"
                          stroke="#6B6B6B"
                          strokeDasharray="12 12"
                        ></line>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="font-bold text-lg sm:text-xl leading-loose mb-2 sm:mb-6 text-[#e1e1e1]">
                      Master Every Topic
                    </h2>
                    <p className="text-sm sm:text-base text-[#e1e1e1]">
                      Sharpen your answer to every question through our
                      AI-powered interview
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col items-center">
                    <svg
                      width="58"
                      height="57"
                      viewBox="0 0 58 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="29"
                        cy="28.5"
                        r="28.5"
                        fill="#8936ea"
                        fillOpacity="0.5"
                      ></circle>
                      <path
                        d="M21.5 16C20.1739 16 18.9021 16.5268 17.9645 17.4645C17.0268 18.4021 16.5 19.6739 16.5 21V31C16.5 31.6566 16.6293 32.3068 16.8806 32.9134C17.1319 33.52 17.5002 34.0712 17.9645 34.5355C18.9021 35.4732 20.1739 36 21.5 36H31.5C32.1566 36 32.8068 35.8707 33.4134 35.6194C34.02 35.3681 34.5712 34.9998 35.0355 34.5355C35.4998 34.0712 35.8681 33.52 36.1194 32.9134C36.3707 32.3068 36.5 31.6566 36.5 31V21C36.5 20.3434 36.3707 19.6932 36.1194 19.0866C35.8681 18.48 35.4998 17.9288 35.0355 17.4645C34.5712 17.0002 34.02 16.6319 33.4134 16.3806C32.8068 16.1293 32.1566 16 31.5 16H21.5ZM32.208 23.708L26.208 29.708C26.1151 29.8011 26.0048 29.875 25.8833 29.9254C25.7618 29.9758 25.6315 30.0018 25.5 30.0018C25.3685 30.0018 25.2382 29.9758 25.1167 29.9254C24.9952 29.875 24.8849 29.8011 24.792 29.708L21.792 26.708C21.699 26.615 21.6253 26.5046 21.575 26.3832C21.5246 26.2617 21.4987 26.1315 21.4987 26C21.4987 25.8685 21.5246 25.7383 21.575 25.6168C21.6253 25.4954 21.699 25.385 21.792 25.292C21.885 25.199 21.9954 25.1253 22.1168 25.075C22.2383 25.0246 22.3685 24.9987 22.5 24.9987C22.6315 24.9987 22.7617 25.0246 22.8832 25.075C23.0046 25.1253 23.115 25.199 23.208 25.292L25.5 27.586L30.792 22.292C30.9798 22.1042 31.2344 21.9987 31.5 21.9987C31.7656 21.9987 32.0202 22.1042 32.208 22.292C32.3958 22.4798 32.5013 22.7344 32.5013 23C32.5013 23.2656 32.3958 23.5202 32.208 23.708ZM22.5 38C23.412 39.214 24.864 40 26.5 40H31.5C33.8869 40 36.1761 39.0518 37.864 37.364C39.5518 35.6761 40.5 33.3869 40.5 31V24C40.5 22.364 39.714 20.912 38.5 20V31C38.5 32.8565 37.7625 34.637 36.4497 35.9497C35.137 37.2625 33.3565 38 31.5 38H22.5Z"
                        fill="white"
                      ></path>
                    </svg>
                    <div className="hidden sm:block">
                      <svg
                        width="2"
                        height="129"
                        viewBox="0 0 2 129"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="1"
                          y1="2.18557e-08"
                          x2="0.999994"
                          y2="129"
                          stroke="#6B6B6B"
                          strokeDasharray="12 12"
                        ></line>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="font-bold text-lg sm:text-xl leading-loose mb-2 sm:mb-6 text-[#e1e1e1]">
                      Tailored Recommendation
                    </h2>
                    <p className="text-sm sm:text-base text-[#e1e1e1]">
                      Get expert advice on how to show your expertise in each
                      question effectively
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col items-center">
                    {/* <svg
                    width="58"
                    height="57"
                    viewBox="0 0 58 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="29"
                      cy="28.5"
                      r="28.5"
                      fill="#8936ea"
                      fillOpacity="0.5"
                    ></circle>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.2032 19.7032C16.5 20.4064 16.5 21.5368 16.5 23.8V31C16.5 33.2632 16.5 34.3936 17.2032 35.0968C17.9064 35.8 19.0368 35.8 21.3 35.8H35.7C37.9632 35.8 39.0936 35.8 39.7968 35.0968C40.5 34.3936 40.5 33.2632 40.5 31V23.8C40.5 21.5368 40.5 20.4064 39.7968 19.7032C39.0936 19 37.9632 19 35.7 19H21.3C19.0368 19 17.9064 19 17.2032 19.7032ZM20.1 21.4C19.7817 21.4 19.4765 21.5264 19.2515 21.7515C19.0264 21.9765 18.9 22.2817 18.9 22.6C18.9 22.9183 19.0264 23.2235 19.2515 23.4485C19.4765 23.6736 19.7817 23.8 20.1 23.8H22.5C22.8183 23.8 23.1235 23.6736 23.3485 23.4485C23.5736 23.2235 23.7 22.9183 23.7 22.6C23.7 22.2817 23.5736 21.9765 23.3485 21.7515C23.1235 21.5264 22.8183 21.4 22.5 21.4H20.1ZM33.3 32.2C33.3 31.8817 33.4264 31.5765 33.6515 31.3515C33.8765 31.1264 34.1817 31 34.5 31H36.9C37.2183 31 37.5235 31.1264 37.7485 31.3515C37.9736 31.5765 38.1 31.8817 38.1 32.2C38.1 32.5183 37.9736 32.8235 37.7485 33.0485C37.5235 33.2736 37.2183 33.4 36.9 33.4H34.5C34.1817 33.4 33.8765 33.2736 33.6515 33.0485C33.4264 32.8235 33.3 32.5183 33.3 32.2ZM29.7 27.4C29.7 27.7183 29.5736 28.0235 29.3485 28.2485C29.1235 28.4736 28.8183 28.6 28.5 28.6C28.1817 28.6 27.8765 28.4736 27.6515 28.2485C27.4264 28.0235 27.3 27.7183 27.3 27.4C27.3 27.0817 27.4264 26.7765 27.6515 26.5515C27.8765 26.3264 28.1817 26.2 28.5 26.2C28.8183 26.2 29.1235 26.3264 29.3485 26.5515C29.5736 26.7765 29.7 27.0817 29.7 27.4ZM32.1 27.4C32.1 28.3548 31.7207 29.2705 31.0456 29.9456C30.3705 30.6207 29.4548 31 28.5 31C27.5452 31 26.6295 30.6207 25.9544 29.9456C25.2793 29.2705 24.9 28.3548 24.9 27.4C24.9 26.4452 25.2793 25.5295 25.9544 24.8544C26.6295 24.1793 27.5452 23.8 28.5 23.8C29.4548 23.8 30.3705 24.1793 31.0456 24.8544C31.7207 25.5295 32.1 26.4452 32.1 27.4Z"
                      fill="white"
                    ></path>
                  </svg> */}
                    <svg
                      width="58"
                      height="57"
                      viewBox="0 0 58 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="29"
                        cy="28.5"
                        r="28.5"
                        fill="#8936ea"
                        fillOpacity="0.5"
                      ></circle>
                      <path
                        d="M21.5 16C20.1739 16 18.9021 16.5268 17.9645 17.4645C17.0268 18.4021 16.5 19.6739 16.5 21V31C16.5 31.6566 16.6293 32.3068 16.8806 32.9134C17.1319 33.52 17.5002 34.0712 17.9645 34.5355C18.9021 35.4732 20.1739 36 21.5 36H31.5C32.1566 36 32.8068 35.8707 33.4134 35.6194C34.02 35.3681 34.5712 34.9998 35.0355 34.5355C35.4998 34.0712 35.8681 33.52 36.1194 32.9134C36.3707 32.3068 36.5 31.6566 36.5 31V21C36.5 20.3434 36.3707 19.6932 36.1194 19.0866C35.8681 18.48 35.4998 17.9288 35.0355 17.4645C34.5712 17.0002 34.02 16.6319 33.4134 16.3806C32.8068 16.1293 32.1566 16 31.5 16H21.5ZM32.208 23.708L26.208 29.708C26.1151 29.8011 26.0048 29.875 25.8833 29.9254C25.7618 29.9758 25.6315 30.0018 25.5 30.0018C25.3685 30.0018 25.2382 29.9758 25.1167 29.9254C24.9952 29.875 24.8849 29.8011 24.792 29.708L21.792 26.708C21.699 26.615 21.6253 26.5046 21.575 26.3832C21.5246 26.2617 21.4987 26.1315 21.4987 26C21.4987 25.8685 21.5246 25.7383 21.575 25.6168C21.6253 25.4954 21.699 25.385 21.792 25.292C21.885 25.199 21.9954 25.1253 22.1168 25.075C22.2383 25.0246 22.3685 24.9987 22.5 24.9987C22.6315 24.9987 22.7617 25.0246 22.8832 25.075C23.0046 25.1253 23.115 25.199 23.208 25.292L25.5 27.586L30.792 22.292C30.9798 22.1042 31.2344 21.9987 31.5 21.9987C31.7656 21.9987 32.0202 22.1042 32.208 22.292C32.3958 22.4798 32.5013 22.7344 32.5013 23C32.5013 23.2656 32.3958 23.5202 32.208 23.708ZM22.5 38C23.412 39.214 24.864 40 26.5 40H31.5C33.8869 40 36.1761 39.0518 37.864 37.364C39.5518 35.6761 40.5 33.3869 40.5 31V24C40.5 22.364 39.714 20.912 38.5 20V31C38.5 32.8565 37.7625 34.637 36.4497 35.9497C35.137 37.2625 33.3565 38 31.5 38H22.5Z"
                        fill="white"
                      ></path>
                    </svg>
                    <div className="hidden sm:block">
                      <svg
                        width="2"
                        height="129"
                        viewBox="0 0 2 129"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="1"
                          y1="2.18557e-08"
                          x2="0.999994"
                          y2="129"
                          stroke="#6B6B6B"
                          strokeDasharray="12 12"
                        ></line>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="font-bold text-lg sm:text-xl leading-loose mb-2 sm:mb-6 text-[#e1e1e1]">
                      Real-Time Feedback
                    </h2>
                    <p className="text-sm sm:text-base text-[#e1e1e1]">
                      Improve your answers through real-time feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 hidden lg:block">
              <Image
                src="/images/feature1.png"
                alt="Howto Image"
                loading="lazy"
                width={500}
                height={500}
                decoding="async"
                data-nimg="1"
                className=""
                style={{ color: "transparent" }}
              />
              <Image
                src="/images/feature2.png"
                alt="Howto Image"
                loading="lazy"
                width={500}
                height={500}
                decoding="async"
                data-nimg="1"
                className=""
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </section>
        <section
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 p-16 bg-black"
          ref={interviewsRef}
        >
          <article>
            <h2 className="text-3xl font-extrabold text-[#e1e1e1] text-center md:text-left">
              Interviews
            </h2>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 text-[#e1e1e1]">
              {jobs?.map((job: any) => (
                <article
                  key={job.candidate.user.id}
                  // className="bg-[#212121] bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
                  className="bg-white bg-opacity-15 rounded-lg shadow-lg relative overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <div className="text-center">
                      <h3 className="font-bold">{job.position.name}</h3>
                      <h4 className="pb-4 text-base">{job.position.company}</h4>
                      <h5 className="text-base">
                        Candidate: {job.candidate.user.name}
                      </h5>
                    </div>
                    <div>
                      <Link href={`/job/${job.id}`}>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-[#e1e1e1] h-14 md:h-12 w-full rounded-full">
                          Review
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>
        <section ref={getStartedRef} className="bg-[#000000]">
          <div className="px-6 py-20">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-center text-[#e1e1e1]">
                Get Started
              </h2>
            </div>
            <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-[#e1e1e1] outline-none bg-[#2f2f2f]"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-lg font-medium">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-[#e1e1e1] outline-none bg-[#2f2f2f]"
                  placeholder="OpenAI"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="block text-lg font-medium">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-[#e1e1e1] outline-none bg-[#2f2f2f]"
                  placeholder="Software Engineer"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="jobDescription"
                  className="block text-lg font-medium"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-[#e1e1e1] outline-none bg-[#2f2f2f] whitespace-pre-wrap"
                  placeholder={`Responsibilities

Work collaboratively with the team, to craft a thoughtful, long-term technical strategy that anticipates future needs while being pragmatic about what’s needed today.

Constantly delivering applications and solutions.

Participating in software requirement review, preliminary and critical design, integration readiness review, and software acceptance review.

Design, build and maintain scalable backend systems.

Identify performance issues and bugs, and provide solutions to these problems.

Work with other team members to ensure we are building the right products.

Software validation, testing and approval.

Delegating tasks/projects to the team members.

Collaboration with the team to identify and fix technical problems.

Analyzing users’ needs and then finding applications to serve them.

Conduct security audits to identify areas of improvement.

Guiding the team through technical issues and challenges.

Delegating tasks and achieving daily, weekly, and monthly goals.

Keeping up-toDate with industry trends and development.

Updating work schedules and performing troubleshooting as required.

Qualifications

University degree in Informational Technology, Computer Science, Software Engineering, or a related subject.

At least 4 years of commercial experience in a similar role.

Create software technical documentation.

Proficient experience working on a variety of software development projects.

Ability to work to a strict deadline.

Comfortable with a variety of languages such as Java, Node.js/Express, GO, Ruby, React, as well as MongoDB, SQL, Postgres databases, etc.

Deep knowledge of the cloud infrastructure (Heroku, AWS, Digital Ocean, etc.), microservices, and development of APIs.

Demonstratable track record of success in developing and implementing a comprehensive technology strategy that is aligned with and supports the current and future business goals of the company.

Strong Engineering background with previous hands-on development and deployment of production-level code.

Possess a broad understanding of how software fits into the overall system.

Well-versed in Software Architecture and Design - You should be able to spot flaws in the existing architecture and design. You would help us refactor and re-architecture the code for easier and faster development.

Participate in code reviews.

Collaborate and work with other team members to ensure we are building the right product.`}
                  rows={10}
                />
              </div>
              <button
                type="submit"
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-[#e1e1e1] px-4 py-3 rounded w-full ${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                {isLoading ? "Please wait..." : "Continue"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className={`bg-[#000000] ${archivo.className}`}>
        <div className="flex items-center justify-between p-5 h-16">
          <p className="text-[#e1e1e1] py-2 text-base">
            &copy; 2025 URECRUITED
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#e1e1e1] py-2 text-base">Got To Top</p>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-[#e1e1e1] rounded-full"
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
              <rect width="48" height="48" rx="24" fill="" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.0002 30C23.5031 30 23.1002 29.5971 23.1002 29.1L23.1002 21.1345L20.7489 23.7238C20.4044 24.0821 19.8347 24.0933 19.4764 23.7487C19.1181 23.4042 19.1069 22.8345 19.4514 22.4762L23.3514 18.2762C23.5211 18.0997 23.7554 18 24.0002 18C24.245 18 24.4793 18.0997 24.6489 18.2762L28.5489 22.4762C28.8935 22.8345 28.8823 23.4042 28.524 23.7487C28.1657 24.0933 27.596 24.0821 27.2514 23.7238L24.9002 21.1345V29.1C24.9002 29.5971 24.4973 30 24.0002 30Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </footer>
    </>
  );
}
