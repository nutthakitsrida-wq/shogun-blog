import heroImage from "../assets/hero.png";
function HeroSection() {
  return (
    <section className="mx-auto flex w-[90%] max-w-5xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between">
      <div className="text-center md:w-1/3 md:text-right">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
          Meet PLAVE,
          <br />
          My Favorite
          <br />
          K-Pop World
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          A personal blog about PLAVE, music, virtual idols, and the moments
          that make their songs feel special.
        </p>
      </div>

     <img
  src={heroImage}
  alt="PLAVE hero"
  className="w-full max-w-[340px] rounded-3xl object-cover shadow-md md:max-w-[360px]"
/>
      

      <div className="text-center md:w-1/3 md:text-left">
        <p className="text-xs font-medium text-gray-400">-Blog by</p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">Shogun</h2>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          I write about the songs, performances, stories, and feelings that made
          me become interested in PLAVE.
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          This blog is a small space to collect my thoughts and share what I
          love about them.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;