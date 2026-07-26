import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addNotification,
  getArticles,
  getCategories,
  saveArticles,
  saveCategories,
} from "@/lib/adminStorage";

function CategoryFormPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const categories = getCategories();
  const existing = categories.find((item) => String(item.id) === categoryId);
  const [name, setName] = useState(existing?.name || "");
  const [error, setError] = useState("");
  const isEditing = Boolean(categoryId);

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName) {
      setError("Category name is required.");
      return;
    }
    if (categories.some((item) => item.id !== existing?.id && item.name.toLowerCase() === normalizedName.toLowerCase())) {
      setError("This category already exists.");
      return;
    }

    const category = { id: existing?.id || Date.now(), name: normalizedName };
    const updated = existing
      ? categories.map((item) => item.id === existing.id ? category : item)
      : [...categories, category];
    saveCategories(updated);

    if (existing && existing.name !== normalizedName) {
      const articles = getArticles().map((article) =>
        article.category === existing.name ? { ...article, category: normalizedName } : article
      );
      saveArticles(articles);
    }
    addNotification(
      `Category ${normalizedName} was ${isEditing ? "updated" : "created"}.`,
      "/admin/categories"
    );
    navigate("/admin/categories", {
      state: { message: `Category ${isEditing ? "updated" : "created"} successfully.` },
    });
  }

  if (isEditing && !existing) {
    return <p className="rounded-2xl bg-red-50 p-6 text-red-700">Category not found.</p>;
  }

  return (
    <section className="max-w-2xl">
      <Link to="/admin/categories" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-700">
        <ArrowLeft size={17} /> Back to categories
      </Link>
      <h1 className="mt-5 text-3xl font-black">{isEditing ? "Edit category" : "Create category"}</h1>
      <p className="mt-2 text-slate-500">Use a short, recognizable topic name.</p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="grid gap-2 font-semibold">
          Category name
          <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Music" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-violet-500" />
        </label>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
          <Link to="/admin/categories" className="rounded-xl border border-slate-300 px-5 py-3 font-bold">Cancel</Link>
          <button type="submit" className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700">
            {isEditing ? "Save changes" : "Create category"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CategoryFormPage;
