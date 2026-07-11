import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();

  function handleMobileLogin() {
    navigate("/login");
  }

  function handleMobileSignUp() {
    navigate("/signup");
  }

  return (
    <nav className="mx-auto flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6">
      <Link to="/" className="text-xl font-bold text-gray-900">
        PLAVElog
      </Link>

      {/* Desktop */}
      <div className="hidden shrink-0 gap-2 md:flex">
        <Link
          to="/login"
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:border-purple-300 hover:bg-purple-50"
        >
          Log in
        </Link>

        <Link
          to="/signup"
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:border-purple-300 hover:bg-purple-50"
        >
          Sign up
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
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
      </div>
    </nav>
  );
}

export default NavBar;