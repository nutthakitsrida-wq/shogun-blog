import { Camera, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { addNotification } from "@/lib/adminStorage";

function ProfilePage() {
  const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [formData, setFormData] = useState({
    username: savedCurrentUser.username || "",
    email: savedCurrentUser.email || "",
    profileImage: savedCurrentUser.profileImage || "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile image must be smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({ ...current, profileImage: reader.result }));
      setError("");
      setMessage("");
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();
    if (!username || !email) {
      setError("Username and email are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedCurrentUser = { ...savedCurrentUser, ...formData, username, email };
    const userIndex = users.findIndex((user) => user.email === savedCurrentUser.email);
    const updatedUsers = [...users];
    if (userIndex >= 0) updatedUsers[userIndex] = { ...users[userIndex], ...updatedCurrentUser };
    else updatedUsers.push(updatedCurrentUser);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    addNotification("Your profile was updated.", "/admin/profile");
    setError("");
    setMessage("Profile updated successfully.");
  }

  return (
    <section className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">Account</p>
      <h1 className="mt-2 text-3xl font-black text-slate-900">Profile</h1>
      <p className="mt-2 text-slate-500">Update your personal information and profile photo.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile preview" className="h-28 w-28 rounded-full object-cover ring-4 ring-violet-100" />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-violet-600 text-4xl font-black text-white">
              {formData.username.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div>
            <label htmlFor="profileImage" className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold hover:border-violet-400 hover:text-violet-700">
              <Camera size={17} /> Upload profile photo
            </label>
            <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP, up to 2 MB.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 font-semibold">
            Username
            <input name="username" value={formData.username} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-violet-500" />
          </label>
          <label className="grid gap-2 font-semibold">
            Email
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-violet-500" />
          </label>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {message && (
          <p role="status" className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} /> {message}
          </p>
        )}
        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button type="submit" className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white hover:bg-violet-700">
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfilePage;
