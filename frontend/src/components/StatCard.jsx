// filepath: TechSkillsRadar/frontend/src/components/StatCard.jsx
/**
 * StatCard — displays a single key metric with icon, title, and value.
 * Uses glassmorphism styling with subtle glow animation.
 */

export default function StatCard({ title, value, icon }) {
  return (
    <div className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-800/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-400/40 hover:shadow-lg hover:shadow-brand-400/10">
      {/* Gradient accent bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-hover:opacity-100" />

      <div className="flex items-center gap-4">
        {/* Icon circle */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-400/10 text-2xl transition-colors group-hover:bg-brand-400/20">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-1 truncate text-2xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
