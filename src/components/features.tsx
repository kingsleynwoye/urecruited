import React from "react";

function Features() {
  return (
    // <!-- Features Section -->
    <section className="bg-white text-gray-900 container mx-auto py-16 px-4 md:px-16">
      {/* <!-- Heading --> */}
      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bible Chat Features</h1>
        <p className="text-lg text-gray-600">
          Download the Bible Chat to explore features that will make your
          experience memorable.
        </p>
      </div> */}

      {/* <!-- Feature Blocks --> */}
      <div className="space-y-12">
        {/* <!-- Verse Finder Feature (1st Row) --> */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          {/* <!-- Text Block --> */}
          <div className="md:w-5/12">
            {/* <!-- Adjusted width to 5/12 --> */}
            <h2 className="text-2xl font-bold mb-4">Verse Finder</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Easily search for verses from the Old and New Testaments by
              entering any topic, concept, or keyword. The Verse Finder helps
              you quickly locate relevant scriptures and provides insightful
              context to deepen your understanding of the Bible's teachings.
            </p>
          </div>

          {/* <!-- Image Block --> */}
          <div className="md:w-5/12 max-w-sm">
            <img
              className="rounded-md border-none"
              src="https://i.imgur.com/Q9RPPO0.png"
              alt="Verse Finder Image"
            />
          </div>
        </div>

        {/* <!-- Bible Trivia Feature (2nd Row) --> */}
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start md:justify-between">
          {/* <!-- Text Block --> */}
          <div className="md:w-5/12">
            {/* <!-- Adjusted width to 5/12 --> */}
            <h2 className="text-2xl font-bold mb-4">Bible Trivia</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Challenge yourself with Bible Trivia and sharpen your biblical
              knowledge through engaging games. Test your memory on biblical
              events, characters, locations, and teachings. Choose your
              difficulty level and enjoy a fun, personalized learning journey at
              your own pace.
            </p>
          </div>

          {/* <!-- Image Block --> */}
          <div className="md:w-5/12 max-w-sm">
            <img
              className="rounded-md border-none"
              src="https://i.imgur.com/h7TsTPl.png"
              alt="Bible Trivia Image"
            />
          </div>
        </div>
      </div>

      {/* <!-- Visible Note Banner --> */}
      {/* <div className="bg-gray-100 text-gray-700 text-center py-4 mt-12 rounded-md">
        <p className="text-sm">
          This section is inspired by{" "}
          <a
            href="https://thebiblechat.com"
            className="text-blue-500 hover:underline"
          >
            thebiblechat.com
          </a>{" "}
          official website.
        </p>
      </div> */}
    </section>
  );
}

export default Features;
