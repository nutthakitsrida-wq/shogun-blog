import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const normalizedEmail = formData.email.trim().toLowerCase();

    const foundUser = savedUsers.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === formData.password
    );

    if (!foundUser) {
      setErrors({
        general: "Invalid email or password",
      });
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: foundUser.email,
        username: foundUser.username,
      })
    );

    setErrors({});
    navigate("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-[#efede9] p-8 shadow-sm">
        <p className="mb-2 text-center text-sm font-medium text-violet-600">
          PLAVElog
        </p>

        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Log in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.general}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-violet-700 hover:underline"
          >
            Sign up
          </Link>
        </p>

        <Link
          to="/"
          className="mt-4 block text-center text-sm text-gray-500 hover:text-violet-700"
        >
          ← Back to home
        </Link>
      </section>
    </main>
  );
}

export default LoginPage;