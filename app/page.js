import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-2">
        <div className=" flex items-center justify-center flex-col ml-[10vw] text-black gap-4 mt-80  text-center">
          <div className="text-yellow-300">
            {/* Main Heading */}
            <h1 className="text-5xl font-black mb-4">
              A link in bio built for you.
            </h1>

            {/* Subheading / Description */}
            <p className="text-lg font-bold leading-relaxed max-w-2xl">
              Join <span className="font-extrabold">70M+ people</span> using Linktree for their link in bio.
              One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>
          </div>

        </div>
        <div className="flex items-center justify-center pt-15">
          <img src="/home.png" alt="home"></img>
        </div>

        <div className="input flex gap-2 px-25 py-10 items-center justify-center ">
          <input
            type="text"
            placeholder="bittr.ee/your-url"
            className="px-2 py-2 focus:outline-green-800 rounded-md bg-amber-50"
          />
          <button className="bg-pink-300 rounded-full px-4 py-4 font-bold">
            Claim your Bittree
          </button>
        </div>

      </section>
      <section className="bg-red-500 min-h-[100vw]">
        <div className="bg-purple-300 flex items-center justify-center flex-col mr-[10vw]">
        </div>
      </section>
    </main>
  );
}
