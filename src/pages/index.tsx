import { FormEvent, useState, useRef, useEffect } from "react";
import { Archivo } from "next/font/google";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Loader } from "@/components/loader";
import { Error } from "@/components/error";

const archivo = Archivo({ subsets: ["latin"] });

type Message = {
  text: string;
  sender: "user" | "bot";
};

type Job = {
  _id: number;
  name: string;
  company: string;
  position: string;
  jobDescription: string;
};

export default function Home() {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const interviewsRef = useRef<HTMLDivElement>(null);
  const startNowRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          console.error(`Error: ${response.status}`);
        }
        const data: Job[] = await response.json();
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

Keeping up-to-date with industry trends and development.

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

  if (loading) return <Loader />;
  if (error) return <Error />;

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
        className={`${archivo.className} bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg fixed top-0 right-0 w-full shadow-sm px-5 z-50`}
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
                width="187"
                height="18"
                viewBox="0 0 187 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.2 17.25C3.35 17.25 0.65 14.425 0.65 9.975V0.25H5.35V9.6C5.35 11.975 6.025 12.7 9.2 12.7C12.375 12.7 13.05 11.975 13.05 9.6V0.25H17.75V9.975C17.75 14.425 15.05 17.25 9.2 17.25ZM26.1772 17H21.4772V0.25H31.2522C35.6772 0.25 38.0022 2.1 38.0022 5.375C38.0022 8.025 36.6772 9.6 33.4772 10V10.25C35.2022 10.7 35.7522 11.525 36.3772 12.8L38.4522 17H33.0272L31.0272 12.9C30.4272 11.65 29.9272 11.3 28.1022 11.3H26.1772V17ZM26.1772 4.475V7.8H31.2022C32.5772 7.8 33.0772 7.55 33.0772 6.125C33.0772 4.8 32.5772 4.475 31.2022 4.475H26.1772ZM56.3959 17H41.5209V0.25H56.3959V4.475H46.2209V6.475H56.0209V10.675H46.2209V12.775H56.3959V17ZM69.0509 17.25C63.2259 17.25 59.8009 13.85 59.8009 8.625C59.8009 3.4 63.2259 -1.78814e-07 69.0509 -1.78814e-07C74.6759 -1.78814e-07 78.0509 2.675 78.0509 7.15V7.575H72.8009V7.15C72.8009 5.25 71.9009 4.5 69.1259 4.5C65.7259 4.5 64.8009 5.3 64.8009 8.625C64.8009 11.95 65.7259 12.75 69.1259 12.75C71.9009 12.75 72.8009 12 72.8009 10.1V9.675H78.0509V10.1C78.0509 14.575 74.6759 17.25 69.0509 17.25ZM86.3082 17H81.6082V0.25H91.3832C95.8082 0.25 98.1332 2.1 98.1332 5.375C98.1332 8.025 96.8082 9.6 93.6082 10V10.25C95.3332 10.7 95.8832 11.525 96.5082 12.8L98.5832 17H93.1582L91.1582 12.9C90.5582 11.65 90.0582 11.3 88.2332 11.3H86.3082V17ZM86.3082 4.475V7.8H91.3332C92.7082 7.8 93.2082 7.55 93.2082 6.125C93.2082 4.8 92.7082 4.475 91.3332 4.475H86.3082ZM110.102 17.25C104.252 17.25 101.552 14.425 101.552 9.975V0.25H106.252V9.6C106.252 11.975 106.927 12.7 110.102 12.7C113.277 12.7 113.952 11.975 113.952 9.6V0.25H118.652V9.975C118.652 14.425 115.952 17.25 110.102 17.25ZM127.079 17H122.379V0.25H127.079V17ZM141.149 17H136.449V4.475H130.524V0.25H147.049V4.475H141.149V17ZM165.378 17H150.503V0.25H165.378V4.475H155.203V6.475H165.003V10.675H155.203V12.775H165.378V17ZM177.783 17H169.308V0.25H177.783C183.308 0.25 186.808 3.325 186.808 8.625C186.808 13.925 183.308 17 177.783 17ZM177.783 4.475H174.008V12.775H177.783C180.758 12.775 181.783 12.4 181.783 8.625C181.783 4.85 180.758 4.475 177.783 4.475Z"
                  fill="white"
                />
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
                  className="text-white font-medium text-lg"
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
                  className="text-white font-medium text-lg"
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
                  className="text-white font-medium text-lg"
                >
                  Interviews
                </button>
              </li>
              <button
                onClick={() => {
                  scrollToSection(startNowRef);
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full font-medium transition duration-200 text-lg"
              >
                Start Now
              </button>
            </ul>
            <button
              className="text-white md:hidden"
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
                className="text-lg font-medium text-white"
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
                className="text-lg font-medium text-white"
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
                className="text-lg font-medium text-white"
              >
                Interviews
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(startNowRef);
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full text-lg font-medium transition duration-200"
              >
                Start Now
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
                backgroundImage: "url(/background.png)",
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
                    <h1 className="text-white font-semibold text-4xl md:text-7xl">
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
          <section className="pb-10 bg-black -mt-24 md:-mt-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-500">
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
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
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
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-500">
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
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-500">
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
        <section
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
        </section>
        <section
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 p-16 bg-black"
          ref={interviewsRef}
        >
          <article>
            <h2 className="text-3xl font-extrabold text-white">Interviews</h2>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  className="bg-[#212121] bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
                >
                  <div className="p-4 space-y-3">
                    <div className="text-center">
                      <h3 className="font-bold">{job.position}</h3>
                      <h4 className="pb-4 text-base">{job.company}</h4>
                      <h5 className="text-base">Candidate: {job.name}</h5>
                    </div>
                    <div>
                      <Link href={`/job/${job._id}`}>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-14 md:h-12 w-full rounded-full">
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
        <section ref={startNowRef} className="bg-[#000000]">
          <div className="px-6 py-20">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-center text-white">
                Start Now
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
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
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
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
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
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
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
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f] whitespace-pre-wrap"
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

Keeping up-to-date with industry trends and development.

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
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-3 rounded w-full ${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className={`bg-[#000000] ${archivo.className}`}>
        <div className="flex items-center justify-between p-5 h-16">
          <p className="text-white py-2 text-base">&copy; 2024 URECRUITED</p>
          <div className="flex items-center gap-2">
            <p className="text-white py-2 text-base">Got To Top</p>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full"
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
