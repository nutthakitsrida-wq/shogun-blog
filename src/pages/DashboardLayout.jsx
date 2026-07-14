import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className="min-h-screen bg-[#f7f6f3] px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:flex-row">
        <aside className="w-full rounded-3xl bg-white p-5 shadow-sm md:w-64">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Account</h2>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/account/profile"
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 hover:bg-violet-50"
                }`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="/account/reset-password"
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 hover:bg-violet-50"
                }`
              }
            >
              Reset password
            </NavLink>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default DashboardLayout;