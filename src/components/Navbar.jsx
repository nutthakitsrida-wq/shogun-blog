import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

function NavBar() {
  function handleLogin() {
    alert("Log in clicked");
  }

  function handleSignUp() {
    alert("Sign up clicked");
  }

  return (
    <nav className="mx-auto flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6">
      <h2 className="text-xl font-bold text-gray-900">PLAVElog</h2>

      {/* Desktop buttons */}
      <div className="hidden shrink-0 gap-2 md:flex">
        <button
          onClick={handleLogin}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:border-purple-300 hover:bg-purple-50"
        >
          Log in
        </button>

        <button
          onClick={handleSignUp}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:border-purple-300 hover:bg-purple-50"
        >
          Sign up
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-2 text-gray-800 hover:bg-purple-50">
              <Menu size={24} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleLogin}>
              Log in
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleSignUp}>
              Sign up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default NavBar;