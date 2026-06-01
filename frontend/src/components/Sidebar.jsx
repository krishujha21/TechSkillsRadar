import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, Briefcase } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const routes = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Search Jobs", path: "/search", icon: Search },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-surface-700/50 bg-surface-900/50 backdrop-blur-xl md:flex">
      <div className="flex h-16 items-center gap-3 px-6 mt-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
          <Briefcase size={18} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Radar<span className="text-brand-400">.</span>
        </span>
      </div>

      <div className="px-6 mb-4">
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">OVERVIEW</p>
      </div>

      <nav className="flex-1 space-y-1.5 px-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === "/"}
            className={({ isActive }) =>
              clsx(
                "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-400/10 text-brand-400 border border-brand-400/20"
                  : "text-slate-400 hover:bg-surface-800/50 hover:text-white border border-transparent"
              )
            }
          >
            {({ isActive }) => (
              <>
                <route.icon 
                  size={18} 
                  className={isActive ? "text-brand-400" : "text-slate-500 group-hover:text-slate-300 transition-colors"} 
                />
                {route.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mb-4">
        <div className="rounded-xl border border-surface-700/50 bg-surface-800/30 p-4 text-xs backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Briefcase size={40} />
          </div>
          <p className="font-semibold text-white">Data Engine <span className="text-emerald-400 ml-1">● Active</span></p>
          <p className="mt-1.5 text-slate-400">10,000+ jobs indexed.</p>
          <p className="mt-1 text-slate-500">Updated today.</p>
        </div>
      </div>
    </aside>
  );
}
