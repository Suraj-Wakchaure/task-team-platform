import { LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white border-r border-slate-200 p-4 shrink-0 hidden md:flex flex-col justify-between">
      <nav>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium bg-amber-600 text-white">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </nav>
      <div className="text-xs text-slate-400 text-center">
        Task Platform
      </div>
    </aside>
  );
};

export default Sidebar;
