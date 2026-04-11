export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-20">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-[#121827] sm:text-6xl lg:text-7xl">
              Green Summer Youth Union
            </h1>
            <p className="max-w-2xl text-xl leading-8 text-slate-600 sm:text-2xl">
              Connect talented volunteers with meaningful missions that transform communities and create lasting social impact.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-xl bg-[#564AF7] px-8 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-16px_rgba(86,74,247,0.5)] transition hover:bg-[#4b40dd]">
              Get Started
            </button>
            <button className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50">
              Learn More
            </button>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-[#564AF7]">500+</div>
            <h3 className="text-lg font-semibold text-[#121827]">Active Volunteers</h3>
            <p className="text-sm text-slate-600">Join our growing community of dedicated social contributors making a real difference.</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-[#0FB328]">50+</div>
            <h3 className="text-lg font-semibold text-[#121827]">Ongoing Missions</h3>
            <p className="text-sm text-slate-600">Various opportunities in education, healthcare, engineering, and environmental conservation.</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-[#FFA900]">20+</div>
            <h3 className="text-lg font-semibold text-[#121827]">Communities Served</h3>
            <p className="text-sm text-slate-600">Impacting diverse regions with sustainable programs and long-term partnerships.</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-[#F8F9FF] p-8 sm:p-12">
          <h2 className="mb-6 text-3xl font-bold text-[#121827]">Our Mission</h2>
          <p className="mb-4 text-base leading-7 text-slate-700">
            The Green Summer Youth Union is a volunteer platform dedicated to mobilizing talented individuals toward meaningful social contributions. We believe in connecting passion with purpose, enabling volunteers to leverage their skills—whether in teaching, healthcare, engineering, or environmental conservation—to create positive change in underserved communities.
          </p>
          <p className="text-base leading-7 text-slate-700">
            Through carefully curated missions and structured volunteer matching, we ensure that every contribution makes a measurable difference while fostering personal growth and professional development of our volunteers.
          </p>
        </div>
      </div>
    </div>
  );
}
