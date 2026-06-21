function NavBar() {
  return (
    <nav className="mx-auto mt-6 flex w-[92%] max-w-5xl items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm sm:px-6">
      <h2 className="text-xl font-bold text-gray-900">PLAVElog</h2>

      <div className="flex shrink-0 gap-2">
        <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
  Log in
</button>

<button className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white">
  Sign up
</button>
      </div>
    </nav>
  );
}

export default NavBar;