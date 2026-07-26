import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { addNotification } from "@/lib/adminStorage";

function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword =
        "New password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) || {};

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === currentUser.email
    );

    if (!foundUser) {
      setErrors({
        general: "User account was not found",
      });
      setMessage("");
      return;
    }

    if (foundUser.password !== formData.currentPassword) {
      setErrors({
        currentPassword: "Current password is incorrect",
      });
      setMessage("");
      return;
    }

    setErrors({});
    setMessage("");
    setIsDialogOpen(true);
  }

  function handleConfirmReset() {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) || {};

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          password: formData.newPassword,
        };
      }

      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    addNotification("Your password was changed.", "/admin/reset-password");

    setMessage("Password updated successfully");
    setIsDialogOpen(false);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <>
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
          Security
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Reset password
        </h1>

        <p className="mt-2 text-gray-500">
          Change your account password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Current password
            </label>

            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New password
            </label>

            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
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

          {errors.general && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.general}
            </p>
          )}

          {message && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Reset password
          </button>
        </form>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset password</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to reset your password?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmReset}
              className="bg-violet-600 hover:bg-violet-700"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ResetPasswordPage;
