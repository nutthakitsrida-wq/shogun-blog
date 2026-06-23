import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function ArticleSection() {
  return (
    <section className="mx-auto mt-20 w-[90%] max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Latest articles
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hidden flex-wrap gap-3 md:flex">
          <button className="rounded-full bg-gray-900 px-4 py-2 text-white">
            Highlight
          </button>
          <button className="rounded-full border px-4 py-2">Cat</button>
          <button className="rounded-full border px-4 py-2">Inspiration</button>
          <button className="rounded-full border px-4 py-2">General</button>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input placeholder="Search" />
        </div>

        <div className="md:hidden">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="highlight">Highlight</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;