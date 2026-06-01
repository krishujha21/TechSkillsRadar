// filepath: TechSkillsRadar/frontend/src/components/JobCard.jsx
/**
 * JobCard — displays a single job listing with title, company,
 * location, salary, experience, and skills as tags.
 */

export default function JobCard({ job }) {
  return (
    <div className="group rounded-2xl border border-surface-700/50 bg-surface-800/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-400/30 hover:shadow-lg hover:shadow-brand-400/5">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white group-hover:text-brand-400 transition-colors">
            {job.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-slate-400">{job.company}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-brand-400/10 px-3 py-1 text-xs font-semibold text-brand-400">
          ₹{job.salary_lpa} LPA
        </span>
      </div>

      {/* Meta info */}
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          📍 {job.location}
        </span>
        <span className="flex items-center gap-1">
          💼 {job.experience_years} yr{job.experience_years !== 1 ? "s" : ""} exp
        </span>
        <span className="flex items-center gap-1">
          📅 {job.posted_date}
        </span>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-surface-700/80 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-brand-400/20 hover:text-brand-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
