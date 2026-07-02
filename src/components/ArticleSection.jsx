import { useState } from "react";
import BlogCard from "./BlogCard";
import blogPosts from "../data/blogPosts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = ["Highlight", "Members", "Music", "Performance", "Diary"];

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");

  const filteredPosts =
  selectedCategory === "Highlight"
    ? blogPosts.filter((post) => post.highlight)
    : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="mx-auto mt-20 w-[90%] max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
      <h2 className="mb-2 text-4xl font-bold tracking-tight text-slate-900">
        PLAVE Blog
      </h2>

      <p className="mb-8 text-gray-500">
        Stories, music, members, and everything I love about PLAVE.
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hidden flex-wrap gap-3 md:flex">
          {categories.map((category) => (
            <button
              key={category}
              disabled={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 transition ${
                selectedCategory === category
                  ? "bg-violet-600 text-white"
                  : "border border-violet-200 text-violet-700 hover:bg-violet-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input placeholder="Search PLAVE..." />
        </div>

        <div className="md:hidden">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
}

export default ArticleSection;