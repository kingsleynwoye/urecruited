import React from "react";
import { Archivo } from "next/font/google";
import Link from "next/link";

const archivo = Archivo({ subsets: ["latin"] });

interface InterviewProps {
  isOpen: boolean;
  jobId: string;
  interviewId: string;
  jobName: string;
  skillName: string;
  onClose: () => void;
}

const Interview: React.FC<InterviewProps> = ({
  isOpen,
  jobId,
  interviewId,
  jobName,
  skillName,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${archivo.className}`}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 z-10 w-4/5 h-[85%] overflow-y-hidden">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
          >
            <path
              opacity="0.5"
              d="M0 0L25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25L0 0Z"
              fill="#03053D"
            />
            <g clipPath="url(#clip0_336_19624)">
              <path
                d="M24.9999 22.8781L32.4249 15.4531L34.5459 17.5741L27.1209 24.9991L34.5459 32.4241L32.4249 34.5451L24.9999 27.1201L17.5749 34.5451L15.4539 32.4241L22.8789 24.9991L15.4539 17.5741L17.5749 15.4531L24.9999 22.8781Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_336_19624">
                <rect
                  width="36"
                  height="36"
                  fill="white"
                  transform="translate(7 7)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
        <h3 className="text-lg md:text-2xl font-medium mb-4 mainColor">
          {jobName}:
          <span className="text-xl md:text-3xl font-bold pl-2 secondaryColor">
            {skillName}
          </span>
        </h3>
        <div className="interview-history mt-6 max-h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-00">
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gray-950 rounded-lg shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 mb-4"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <h2 className="text-base md:text-2xl font-bold text-white mb-2">
              No interviews attempted yet
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-4">
              It looks like you haven&apos;t tried any interviews for this skill
              yet. <br />
              Start a new chat to begin your interview preparation!
            </p>
            <Link
              href={`/job/${jobId}/interview/${interviewId}`}
              className="mainBg text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              Start Your First Interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
