import heroImage from "../assets/hero.png";

function HeroSection() {
  return (
    <section className="relative mx-auto mt-10 flex w-[90%] max-w-6xl flex-col items-center gap-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#060B1F] via-[#1B2450] to-[#29154A] px-8 py-20 shadow-2xl md:flex-row md:justify-between">
      <div className="absolute -top-32 left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-violet-500/15 blur-[150px]" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/25 via-violet-500/30 to-blue-500/20 blur-[120px]" />
       <div className="relative z-10 text-center md:w-1/3 md:text-right">
        <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
          Meet PLAVE,
          <br />
          My Favorite
          <br />
          K-Pop World
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-200">
          A personal blog about PLAVE, music, virtual idols, and the moments
          that make their songs feel special.
        </p>
      </div>

      <div className="relative z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/25 via-violet-500/30 to-blue-500/20 blur-[120px]" />

        <img
          src={heroImage}
          alt="PLAVE hero"
          className="relative w-full max-w-[370px] rounded-3xl border border-violet-300/20 object-cover shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(168,85,247,.45)] md:max-w-[410px]"
        />
      </div>

      <div className="relative z-10 text-center md:w-1/3 md:text-left">
        <p className="text-xs font-medium text-violet-200/70">-Blog by</p>

        <h2 className="mt-2 text-2xl font-bold text-violet-300">Shogun</h2>

        <p className="mt-4 text-sm leading-6 text-slate-200">
          I write about the songs, performances, stories, and feelings that made
          me become interested in PLAVE.
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-200">
          This blog is a small space to collect my thoughts and share what I
          love about them.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;