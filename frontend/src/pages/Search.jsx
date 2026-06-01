// filepath: TechSkillsRadar/frontend/src/pages/Search.jsx
/**
 * Search page — three filter inputs (role, location, skill),
 * a search button, paginated results as a JobCard grid,
 * and Previous/Next pagination controls.
 */

import { useState } from "react";
import JobCard from "../components/JobCard";
import { searchJobs } from "../services/api";

export default function Search() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 20;

  async function handleSearch(targetPage = 1) {
    try {
      setLoading(true);
      setError(null);
      setPage(targetPage);

      const params = { page: targetPage, limit };
      if (role.trim()) params.role = role.trim();
      if (location.trim()) params.location = location.trim();
      if (skill.trim()) params.skill = skill.trim();

      const data = await searchJobs(params);
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Is the backend running?");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch(1);
  }

  const inputClasses =
    "w-full rounded-xl border border-surface-700/50 bg-surface-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20";

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Search Jobs
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Filter by role, location, or skill to find your ideal position
        </p>
      </div>

      {/* Search filters */}
      <div className="rounded-2xl border border-surface-700/50 bg-surface-800/70 p-6 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search-role" className="mb-1.5 block text-xs font-medium text-slate-400">
              Role
            </label>
            <input
              id="search-role"
              type="text"
              placeholder="e.g. Data Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={handleKeyDown}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="search-location" className="mb-1.5 block text-xs font-medium text-slate-400">
              Location
            </label>
            <input
              id="search-location"
              type="text"
              placeholder="e.g. Bangalore"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="search-skill" className="mb-1.5 block text-xs font-medium text-slate-400">
              Skill
            </label>
            <input
              id="search-skill"
              type="text"
              placeholder="e.g. Python"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => handleSearch(1)}
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:from-brand-400 hover:to-indigo-400 hover:shadow-xl hover:shadow-brand-400/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Searching…
              </span>
            ) : (
              "🔍 Search Jobs"
            )}
          </button>

          <button
            onClick={() => {
              setRole("");
              setLocation("");
              setSkill("");
              setResults(null);
              setError(null);
            }}
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-surface-700 hover:bg-surface-600 border border-surface-600 px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Clear Fields
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Results header */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {results.jobs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {results.total.toLocaleString()}
              </span>{" "}
              results
              {results.total_pages > 1 && (
                <span>
                  {" "}
                  · Page {results.page} of {results.total_pages}
                </span>
              )}
            </p>
          </div>

          {/* Job cards grid */}
          {results.jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-surface-700/50 bg-surface-800/70 p-12 text-center backdrop-blur-sm">
              <p className="text-4xl">🔍</p>
              <p className="mt-4 text-lg font-semibold text-white">
                No results found
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try adjusting your search filters
              </p>
            </div>
          )}

          {/* Pagination */}
          {results.total_pages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => handleSearch(page - 1)}
                disabled={page <= 1 || loading}
                className="rounded-xl border border-surface-700/50 bg-surface-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-brand-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="rounded-lg bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-400">
                {results.page} / {results.total_pages}
              </span>
              <button
                onClick={() => handleSearch(page + 1)}
                disabled={page >= results.total_pages || loading}
                className="rounded-xl border border-surface-700/50 bg-surface-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-brand-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
