// import React from "react";
// import Head from "next/head";
// import { Archivo } from "next/font/google";
// import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";

// const archivo = Archivo({ subsets: ["latin"] });

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
//   const jobs = await res.json();
//   const job = jobs.find((job: any) => job._id === slug) || null;

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

// const Slug = ({ job }: any) => {
//   const router = useRouter();

//   if (!job) {
//     return null;
//   }

//   const languages = [
//     "C",
//     "C++",
//     "C#",
//     "Java",
//     "JavaScript",
//     "Python",
//     "TypeScript",
//   ];

//   const developments = [
//     "Full-stack development",
//     "Frontend development",
//     "Service/application development",
//     "Design and debugging",
//     "Performance/reliability optimization",
//     "Code quality assurance",
//     "Modular design",
//     "Component reuse",
//   ];

//   const computings = [
//     "Developing enterprise-grade large scale cloud applications",
//   ];

//   const managements = ["SQL", "NoSQL", "System design"];

//   const engineerings = [
//     "Building and maintaining data pipelines",
//     "Ingesting, processing, storing, and serving data",
//     "Structured and unstructured data handling",
//     "Data analysis and reporting",
//   ];

//   const operations = [
//     "Monitoring system/product feature/service for issues",
//     "Responding within SLA timeframe",
//     "Alerting stakeholders",
//     "Incident escalation",
//   ];

//   return (
//     <>
//       <Head>
//         <title>URECRUITED - Ace your interviews</title>
//         <meta
//           name="description"
//           content="Master your next job interview with URECRUITED! Train skills, get tailored advice, and receive real-time feedback to ace every question and land your dream job!"
//         />
//         <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={archivo.className}>
//         <section className="flex flex-col p-5 md:p-10">
//           <div className="flex justify-between">
//             <div>
//               <h1 className="text-2xl md:text-4xl font-thin">{job.position}</h1>
//               <h2 className="text-2xl">{job.company}</h2>
//             </div>
//             <button
//               className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-10 w-20 rounded-full"
//               onClick={() => router.back()}
//             >
//               Go Back
//             </button>
//           </div>
//           <div className="flex flex-col gap-2">
//             <div className="p-4 md:p-8 rounded-lg shadow-lg bg-gray-900 text-white w-full max-w-5xl mx-auto mt-6">
//               <h2 className="text-2xl md:text-4xl font-thin mb-4 bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
//                 Interview Preparation
//               </h2>
//               <div className="mb-6">
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <h4 className="text-base md:text-xl font-thin text-white">
//                       Completed
//                     </h4>
//                     <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
//                       0%
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-base md:text-xl font-thin text-white">
//                       Success Rate
//                     </h4>
//                     <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
//                       0%
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-base md:text-xl font-thin text-white">
//                       Training Sessions
//                     </h4>
//                     <p className="text-2xl font-bold bg-gradient-to-r from-[#B181FF] to-[#EC0AE3] text-transparent bg-clip-text">
//                       0
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 mb-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Programming Languages
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {languages.map((language, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{language}</span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Software Development
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {developments.map((development, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{development}</span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Cloud Computing
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {computings.map((computing, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{computing}</span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Database Management
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {managements.map((management, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{management}</span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Data Engineering
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {engineerings.map((engineering, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{engineering}</span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="p-3 md:p-6 rounded-2xl shadow-md bg-gray-800">
//                     <h5 className="text-lg font-medium mb-3 text-white flex justify-between items-center">
//                       Software Operations
//                       <span className="text-xs font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center px-4 py-1 rounded-full">
//                         0% <br />
//                         Done
//                       </span>
//                     </h5>
//                     <ul className="list-none space-y-2">
//                       {operations.map((operation, index) => (
//                         <li
//                           key={index}
//                           className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-3 flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <span className="pl-3 pr-3">{operation} </span>
//                           </div>
//                           <div className="relative flex items-center justify-center cursor-pointer">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping cursor-pointer"></span>
//                             <button className="bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 text-white rounded-full p-2 transition-transform duration-500 ease-out transform hover:scale-125 cursor-pointer">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                               </svg>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Slug;
