import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050816] via-[#101A3D] to-[#2A1458] px-4">
      <div className="rounded-3xl bg-white p-10 text-center shadow-2xl">
        <h1 className="mb-4 text-6xl font-bold text-violet-700">404</h1>

        <h2 className="mb-3 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mb-8 text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;