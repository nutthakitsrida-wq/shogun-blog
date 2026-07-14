import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Welcome to PLAVElog!",
      isRead: false,
    },
    {
      id: 2,
      message: "Your profile is ready to update.",
      isRead: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  function handleMobileLogin() {
    navigate("/login");
  }

  function handleMobileSignUp() {
    navigate("/signup");
  }

  function handleNotificationClick(notificationId) {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  }

  return (
    <nav className="mx-auto flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6">
      <Link to="/" className="text-xl font-bold text-gray-900">
        PLAVElog
      </Link>

      {/* Desktop */}
      <div className="hidden items-center gap-3 md:flex">
        {currentUser ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-full border border-gray-300 p-2 text-gray-700 transition hover:bg-purple-50"
                  aria-label="Open notifications"
                >
                  <Bell size={20} />

                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80">
                <div className="border-b border-gray-100 px-3 py-2">
                  <p className="font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-500">
                    {unreadCount} unread
                  </p>
                </div>

                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`cursor-pointer whitespace-normal px-3 py-3 ${
                      notification.isRead
                        ? "text-gray-500"
                        : "bg-violet-50 font-medium text-gray-900"
                    }`}
                    onClick={() =>
                      handleNotificationClick(notification.id)
                    }
                  >
                    {notification.message}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-purple-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-violet-600 font-semibold text-white">
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={currentUser.username}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      currentUser.username?.charAt(0).toUpperCase()
                    )}
                  </span>

                  {currentUser.username}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account/profile")}
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account/reset-password")}
                >
                  Reset password
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/admin")}
                >
                  Admin panel
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-purple-300 hover:bg-purple-50"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-purple-300 hover:bg-purple-50"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 md:hidden">
        {currentUser ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-full border border-gray-300 p-2 text-gray-700 transition hover:bg-purple-50"
                  aria-label="Open notifications"
                >
                  <Bell size={20} />

                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-72">
                <div className="border-b border-gray-100 px-3 py-2">
                  <p className="font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-500">
                    {unreadCount} unread
                  </p>
                </div>

                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`cursor-pointer whitespace-normal px-3 py-3 ${
                      notification.isRead
                        ? "text-gray-500"
                        : "bg-violet-50 font-medium text-gray-900"
                    }`}
                    onClick={() =>
                      handleNotificationClick(notification.id)
                    }
                  >
                    {notification.message}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-violet-600 font-semibold text-white transition hover:bg-purple-50"
                  aria-label="Open profile menu"
                >
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt={currentUser.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    currentUser.username?.charAt(0).toUpperCase()
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="border-b border-gray-100 px-3 py-2">
                  <p className="font-semibold text-gray-900">
                    {currentUser.username}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {currentUser.email}
                  </p>
                </div>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account/profile")}
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account/reset-password")}
                >
                  Reset password
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/admin")}
                >
                  Admin panel
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-full p-2 text-gray-800 hover:bg-purple-50"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleMobileLogin}
              >
                Log in
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleMobileSignUp}
              >
                Sign up
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default NavBar;