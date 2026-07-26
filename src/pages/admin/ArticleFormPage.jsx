import { ArrowLeft, ImagePlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addNotification, getArticles, getCategories, saveArticles } from "@/lib/adminStorage";

const emptyForm = {
  title: "",
  description: "",
  content: "",
  category: "",
  image: "",
};

function ArticleFormPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const articles = getArticles();
  const existingArticle = articles.find((article) => String(article.id) === articleId);
  const [form, setForm] = useState(existingArticle || emptyForm);
  const [error, setError] = useState("");
  const categories = getCategories();
  const isEditing = Boolean(articleId);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  }

  function save(status) {
    if (!form.title.trim() || !form.category || !form.content.trim()) {
      setError("Title, category and content are required.");
      return;
    }

    const now = new Date().toISOString();
    const article = {
      ...form,
      id: existingArticle?.id || Date.now(),
      title: form.title.trim(),
      status,
      author: form.author || "Admin",
      createdAt: existingArticle?.createdAt || now,
      updatedAt: now,
    };
    const updated = existingArticle
      ? articles.map((item) => item.id === existingArticle.id ? article : item)
      : [article, ...articles];

    saveArticles(updated);
    addNotification(
      `${article.title} was ${isEditing ? "updated" : status === "published" ? "published" : "saved as draft"}.`,
      `/admin/articles/${article.id}/edit`
    );
    navigate("/admin/articles", {
      state: { message: `Article ${isEditing ? "updated" : "created"} successfully.` },
    });
  }

  if (isEditing && !existingArticle) {
    return <p className="rounded-2xl bg-red-50 p-6 text-red-700">Article not found.</p>;
  }

  return (
    <section>
      <Link to="/admin/articles" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-700">
        <ArrowLeft size={17} /> Back to articles
      </Link>
      <h1 className="mt-5 text-3xl font-black">{isEditing ? "Edit article" : "Create article"}</h1>
      <p className="mt-2 text-slate-500">Write the story, then save it as a draft or publish it.</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-8 grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <label className="grid gap-2 font-semibold">
          Title
          <input name="title" value={form.title} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-violet-500" />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 font-semibold">
            Category
            <select name="category" value={form.category} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 font-normal">
              <option value="">Select category</option>
              {categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 font-semibold">
            Thumbnail
            <span className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 font-normal text-slate-500 hover:border-violet-400">
              <ImagePlus size={18} /> Choose image
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </span>
          </label>
        </div>
        {form.image && <img src={form.image} alt="Thumbnail preview" className="h-52 w-full rounded-xl object-cover" />}
        <label className="grid gap-2 font-semibold">
          Short description
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-violet-500" />
        </label>
        <label className="grid gap-2 font-semibold">
          Content
          <textarea name="content" value={form.content} onChange={handleChange} rows="12" className="rounded-xl border border-slate-200 px-4 py-3 font-normal leading-7 outline-none focus:border-violet-500" />
        </label>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => save("draft")} className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">
            Save as draft
          </button>
          <button type="button" onClick={() => save("published")} className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700">
            Save and publish
          </button>
        </div>
      </form>
    </section>
  );
}

export default ArticleFormPage;
