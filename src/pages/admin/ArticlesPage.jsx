import { Edit3, FilePlus2, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
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
import { addNotification, getArticles, saveArticles } from "@/lib/adminStorage";

function ArticlesPage() {
  const [articles, setArticles] = useState(getArticles);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(() => {
    const requestedStatus = searchParams.get("status");
    return ["draft", "published"].includes(requestedStatus)
      ? requestedStatus
      : "all";
  });
  const [category, setCategory] = useState("all");
  const [articleToDelete, setArticleToDelete] = useState(null);
  const location = useLocation();

  const categories = [...new Set(articles.map((article) => article.category))];
  const filteredArticles = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesQuery =
        !keyword ||
        article.title.toLowerCase().includes(keyword) ||
        article.description?.toLowerCase().includes(keyword);
      const matchesStatus = status === "all" || article.status === status;
      const matchesCategory = category === "all" || article.category === category;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [articles, category, query, status]);

  function confirmDelete() {
    const updated = articles.filter((article) => article.id !== articleToDelete.id);
    setArticles(updated);
    saveArticles(updated);
    addNotification(`${articleToDelete.title} was deleted.`, "/admin/articles");
    setArticleToDelete(null);
  }

  function handleStatusChange(event) {
    const nextStatus = event.target.value;
    setStatus(nextStatus);
    setSearchParams((current) => {
      const updated = new URLSearchParams(current);
      if (nextStatus === "all") updated.delete("status");
      else updated.set("status", nextStatus);
      return updated;
    });
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-black">Article management</h1>
          <p className="mt-2 text-slate-500">Search, filter and manage every article.</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700"
        >
          <FilePlus2 size={18} />
          Create article
        </Link>
      </div>

      <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_180px_180px]">
        <label className="relative">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <input
            aria-label="Search articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-violet-500"
          />
        </label>
        <select
          aria-label="Filter by status"
          value={status}
          onChange={handleStatusChange}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      {location.state?.message && (
        <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {location.state.message}
        </p>
      )}

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Article</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-5 py-4">
                    <p className="max-w-sm font-bold">{article.title}</p>
                    <p className="mt-1 max-w-sm truncate text-sm text-slate-500">
                      {article.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm">{article.category}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      article.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {article.updatedAt || article.date}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        aria-label={`Edit ${article.title}`}
                        to={`/admin/articles/${article.id}/edit`}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-violet-300 hover:text-violet-700"
                      >
                        <Edit3 size={17} />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${article.title}`}
                        onClick={() => setArticleToDelete(article)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-red-300 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredArticles.length === 0 && (
          <p className="p-10 text-center text-slate-500">No articles match your filters.</p>
        )}
      </div>

      <AlertDialog open={Boolean(articleToDelete)} onOpenChange={(open) => !open && setArticleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              “{articleToDelete?.title}” will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default ArticlesPage;
