// filepath: TechSkillsRadar/frontend/src/components/SalaryChart.jsx
/**
 * SalaryChart — vertical bar chart showing average salary (LPA) per role.
 * Uses Recharts BarChart with gradient fills and custom tooltip.
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
  "#38bdf8", "#818cf8", "#a78bfa", "#c084fc",
  "#f472b6", "#fb923c", "#34d399",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { role, avg_salary } = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-brand-400">{role}</p>
      <p className="mt-1 text-xs text-slate-300">
        Avg Salary:{" "}
        <span className="font-bold text-white">₹{avg_salary.toFixed(1)} LPA</span>
      </p>
    </div>
  );
}

export default function SalaryChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="animate-fade-in-up rounded-2xl border border-surface-700/50 bg-surface-800/70 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-lg font-semibold text-white">
        💰 Average Salary by Role (LPA)
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="role"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#475569" }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(56, 189, 248, 0.05)" }} />
          <Bar dataKey="avg_salary" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}