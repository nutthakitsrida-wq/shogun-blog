import { CircleUserRound, Send, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="mx-auto mt-20 flex w-[90%] max-w-5xl items-center justify-between border-t border-gray-200 py-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Get in touch</span>

        <CircleUserRound size={18} />
        <Send size={18} />
        <Globe size={18} />
      </div>

      <a href="#" className="text-sm font-medium text-gray-700 underline">
        Home page
      </a>
    </footer>
  );
}

export default Footer;