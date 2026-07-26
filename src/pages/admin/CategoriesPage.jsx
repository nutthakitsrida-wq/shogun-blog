import { Edit3, FolderPlus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { getArticles, getCategories, saveCategories } from "@/lib/adminStorage";

function CategoriesPage() {
  const [categories, setCategories] = useState(getCategories);
  const [query, setQuery] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const location = useLocation();
  const articles = getArticles();

  const filteredCategories = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return categories.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [categories, query]);

  function confirmDelete() {
    const updated = categories.filter((item) => item.id !== categoryToDelete.id);
    saveCategories(updated);
    setCategories(updated);
    setCategoryToDelete(null);
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">Taxonomy</p>
          <h1 className="mt-2 text-3xl font-black">Category management</h1>
          <p className="mt-2 text-slate-500">Organize articles into easy-to-find topics.</p>
        </div>
        <Link to="/admin/categories/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700">
          <FolderPlus size={18} /> Create category
        </Link>
      </div>

      {location.state?.message && (
        <p role="status" className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {location.state.message}
        </p>
      )}

      <label className="relative mt-8 block max-w-lg">
        <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
        <input
          aria-label="Search categories"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search categories..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-violet-500"
        />
      </label>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Articles</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCategories.map((item) => {
              const articleCount = articles.filter((article) => article.category === item.name).length;
              return (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-bold">{item.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{articleCount}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/categories/${item.id}/edit`} aria-label={`Edit ${item.name}`} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-violet-700">
                        <Edit3 size={17} />
                      </Link>
                      <button type="button" onClick={() => setCategoryToDelete(item)} aria-label={`Delete ${item.name}`} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-red-600">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredCategories.length === 0 && <p className="p-10 text-center text-slate-500">No categories found.</p>}
      </div>

      <AlertDialog open={Boolean(categoryToDelete)} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              “{categoryToDelete?.name}” will be removed. Existing articles will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default CategoriesPage;
