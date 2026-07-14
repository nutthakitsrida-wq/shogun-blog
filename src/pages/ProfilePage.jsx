import { useState } from "react";

function ProfilePage() {
  const savedCurrentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const [formData, setFormData] = useState({
    username: savedCurrentUser.username || "",
    email: savedCurrentUser.email || "",
    profileImage: savedCurrentUser.profileImage || "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previousFormData) => ({
        ...previousFormData,
        profileImage: reader.result,
      }));

      setMessage("");
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === savedCurrentUser.email) {
        return {
          ...user,
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          profileImage: formData.profileImage,
        };
      }

      return user;
    });

    const updatedCurrentUser = {
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      profileImage: formData.profileImage,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    setMessage("Profile updated successfully");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

      <p className="mt-2 text-gray-500">
        Manage your personal information.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white">
              {formData.username?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <label
              htmlFor="profileImage"
              className="inline-block cursor-pointer rounded-full border border-violet-600 px-5 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Upload image
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG or other image files.
            </p>
          </div>
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
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {message && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;