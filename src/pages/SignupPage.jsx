import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
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

    const emailAlreadyExists = savedUsers.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailAlreadyExists) {
      setErrors({
        email: "This email is already in use",
      });
      return;
    }

    const newUser = {
      email: normalizedEmail,
      username: formData.username.trim(),
      password: formData.password,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...savedUsers, newUser])
    );

    setErrors({});
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-4 py-10">
        <section className="w-full max-w-md rounded-3xl bg-[#efede9] p-8 text-center shadow-sm">
          <p className="mb-2 text-sm font-medium text-violet-600">
            PLAVElog
          </p>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Sign up successful
          </h1>

          <p className="mb-8 text-gray-600">
            Your account has been created successfully.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Continue
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-[#efede9] p-8 shadow-sm">
        <p className="mb-2 text-center text-sm font-medium text-violet-600">
          PLAVElog
        </p>

        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Sign up
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
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-700 hover:underline"
          >
            Log in
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

export default SignUpPage;