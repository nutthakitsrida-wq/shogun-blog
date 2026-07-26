import { Bell, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const mockNotifications = [
  {
    id: "welcome",
    message: "Welcome to the PLAVElog admin dashboard.",
    target: "/admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "review",
    message: "Three published articles are ready for review.",
    target: "/admin/articles?status=published",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "profile",
    message: "Complete your profile to personalize the admin experience.",
    target: "/admin/profile",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

function NotificationsPage() {
  const saved = JSON.parse(localStorage.getItem("adminNotifications")) || [];
  const notifications = saved.length ? saved : mockNotifications;

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">Activity</p>
      <h1 className="mt-2 text-3xl font-black">Notifications</h1>
      <p className="mt-2 text-slate-500">Review recent changes and jump to the related page.</p>

      <div className="mt-8 space-y-3">
        {notifications.map((notification) => (
          <article key={notification.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <Bell size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-slate-900">{notification.message}</h2>
              <time className="mt-1 block text-sm text-slate-500" dateTime={notification.createdAt}>
                {new Date(notification.createdAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
            </div>
            <Link
              to={notification.target}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-violet-400 hover:text-violet-700"
            >
              View <ExternalLink size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NotificationsPage;
