import {
  Bell,
  FileText,
  Folder,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/articles", label: "Articles", icon: FileText },
  { to: "/admin/categories", label: "Categories", icon: Folder },
  { to: "/admin/profile", label: "Profile", icon: UserRound },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/reset-password", label: "Reset password", icon: KeyRound },
];

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <NavLink to="/admin" className="text-xl font-black text-violet-700">
          PLAVElog
        </NavLink>
        <button
          type="button"
          aria-label="Toggle admin menu"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6 text-white transition-transform lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavLink to="/admin" className="mb-8 px-3 text-2xl font-black">
          PLAVE<span className="text-violet-400">log</span>
          <span className="ml-2 text-xs font-medium text-slate-400">ADMIN</span>
        </NavLink>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Admin navigation">
          {menuItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          <Home size={18} />
          Back to website
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-10 bg-slate-950/50 lg:hidden"
        />
      )}

      <main className="min-h-screen p-4 sm:p-6 lg:ml-72 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AdminPlaceholder({ title, description }) {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
        Admin
      </p>
      <h1 className="mt-2 text-3xl font-black">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
        This section is ready for its feature module.
      </div>
    </section>
  );
}

export default DashboardLayout;
