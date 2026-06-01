// filepath: TechSkillsRadar/frontend/src/components/TopSkillsChart.jsx
/**
 * TopSkillsChart — horizontal bar chart showing top 10 most in-demand skills.
 * Uses Recharts BarChart with custom tooltip and gradient fills.
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#38bdf8", "#818cf8", "#a78bfa", "#c084fc", "#f472b6",
  "#fb923c", "#34d399", "#fbbf24", "#f87171", "#60a5fa",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { skill, count } = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-brand-400">{skill}</p>
      <p className="mt-1 text-xs text-slate-300">
        Appears in <span className="font-bold text-white">{count.toLocaleString()}</span> jobs
      </p>
    </div>
  );
}

export default function TopSkillsChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="animate-fade-in-up rounded-2xl border border-surface-700/50 bg-surface-800/70 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-lg font-semibold text-white">
        🔥 Top 10 In-Demand Skills
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#475569" }}
          />
          <YAxis
            dataKey="skill"
            type="category"
            width={100}
            tick={{ fill: "#e2e8f0", fontSize: 13, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(56, 189, 248, 0.05)" }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
