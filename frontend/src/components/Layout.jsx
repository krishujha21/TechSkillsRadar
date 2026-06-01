import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-surface-900 text-white font-sans selection:bg-brand-500/30">
      <Sidebar />
      
      {/* Main content area shifts right to accommodate the 64 (16rem) sidebar on desktop */}
      <div className="flex w-full flex-col md:pl-64">
        
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-surface-700/50 bg-surface-900/80 px-6 backdrop-blur-xl md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Briefcase size={16} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Radar<span className="text-brand-400">.</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 animate-fade-in-up">
          <div className="mx-auto max-w-6xl">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
