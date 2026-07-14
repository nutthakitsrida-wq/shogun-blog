function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f3] px-4 py-10">
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Admin panel</h1>

        <p className="mt-2 text-gray-500">
          Manage posts, users, and website content.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-violet-50 p-6">
            <p className="text-sm font-medium text-violet-700">Total posts</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">6</p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <p className="text-sm font-medium text-blue-700">Total users</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {JSON.parse(localStorage.getItem("users") || "[]").length}
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6">
            <p className="text-sm font-medium text-green-700">Status</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">Active</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminPage;