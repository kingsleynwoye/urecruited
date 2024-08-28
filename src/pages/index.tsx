import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>URECRUITED - Ace your interviews</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        {/* Banner */}
        <section
          className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
          style={{ backgroundImage: "url(/background.png)" }}
        >
          <Image
            src="/brand.png"
            alt="Brand"
            width={500}
            height={500}
            className="w-[80%] bg-cover"
          />
        </section>
      </main>
    </>
  );
}
