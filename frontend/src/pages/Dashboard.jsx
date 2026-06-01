// filepath: TechSkillsRadar/frontend/src/pages/Dashboard.jsx
/**
 * Dashboard page — fetches all analytics on mount and renders:
 * - 4 stat cards at the top
 * - 2×2 chart grid below (skills, roles, salary, locations)
 * Shows a loading spinner while data is being fetched.
 */

import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import TopSkillsChart from "../components/TopSkillsChart";
import RoleDistributionChart from "../components/RoleDistributionChart";
import SalaryChart from "../components/SalaryChart";
import LocationChart from "../components/LocationChart";
import {
  fetchStats,
  fetchSkills,
  fetchRoles,
  fetchLocations,
  fetchSalary,
} from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [salary, setSalary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        setError(null);

        const [statsData, skillsData, rolesData, locationsData, salaryData] =
          await Promise.all([
            fetchStats(),
            fetchSkills(),
            fetchRoles(),
            fetchLocations(),
            fetchSalary(),
          ]);

        setStats(statsData);
        setSkills(skillsData);
        setRoles(rolesData);
        setLocations(locationsData);
        setSalary(salaryData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Failed to load data. Is the backend running on port 8000?");
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-700 border-t-brand-400" />
          <p className="text-sm text-slate-400">Loading analytics…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <p className="text-4xl">⚠️</p>
          <p className="mt-4 text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Real-time insights from {stats?.total_jobs?.toLocaleString()} tech job listings
        </p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stagger-1">
          <StatCard
            title="Total Jobs"
            value={stats?.total_jobs?.toLocaleString() ?? "—"}
            icon="📊"
          />
        </div>
        <div className="stagger-2">
          <StatCard
            title="Skills Tracked"
            value={stats?.skills_tracked ?? "—"}
            icon="🛠️"
          />
        </div>
        <div className="stagger-3">
          <StatCard
            title="Most Demanded Skill"
            value={stats?.most_demanded_skill ?? "—"}
            icon="🔥"
          />
        </div>
        <div className="stagger-4">
          <StatCard
            title="Avg Salary"
            value={stats?.avg_salary ? `₹${stats.avg_salary} LPA` : "—"}
            icon="💰"
          />
        </div>
      </div>

      {/* Charts 2×2 grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopSkillsChart data={skills} />
        <RoleDistributionChart data={roles} />
        <SalaryChart data={salary} />
        <LocationChart data={locations} />
      </div>
    </div>
  );
}