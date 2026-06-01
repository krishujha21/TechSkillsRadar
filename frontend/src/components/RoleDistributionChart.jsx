// filepath: TechSkillsRadar/frontend/src/components/RoleDistributionChart.jsx
/**
 * RoleDistributionChart — pie chart showing job count distribution across roles.
 * Uses Recharts PieChart with custom labels and a branded color palette.
 */

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#38bdf8", "#818cf8", "#a78bfa", "#c084fc",
  "#f472b6", "#fb923c", "#34d399",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { role, count } = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-700 bg-surface-800 px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-brand-400">{role}</p>
      <p className="mt-1 text-xs text-slate-300">
        <span className="font-bold text-white">{count.toLocaleString()}</span> jobs
      </p>
    </div>
  );
}

const RADIAN = Math.PI / 180;

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.06) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function RoleDistributionChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="animate-fade-in-up rounded-2xl border border-surface-700/50 bg-surface-800/70 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-lg font-semibold text-white">
        👥 Role Distribution
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={130}
            paddingAngle={3}
            dataKey="count"
            nameKey="role"
            labelLine={false}
            label={renderCustomLabel}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span className="text-xs text-slate-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}