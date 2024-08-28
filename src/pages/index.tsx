import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main className={`${inter.className}`}>
        {/* Banner */}
        <section
          className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
          style={{
            backgroundImage: "url(/background.png)",
            backgroundColor: "rgb(10, 14, 18)",
            filter: "brightness(0.8)",
            transition: "filter 0.3s ease 0s",
          }}
        >
          <Image
            src="/brand.png"
            alt="Brand"
            width={500}
            height={500}
            className="w-[80%] bg-cover z-50"
          />
        </section>
      </main>
    </>
  );
}
