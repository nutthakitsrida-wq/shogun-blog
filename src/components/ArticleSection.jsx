import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
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
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  async function fetchPosts() {
    try {
      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts"
      );

      const plavePosts = response.data.posts.map((post, index) => ({
        ...post,
        image: `/images/plave-${index + 1}.jpg`,
        category: ["Members", "Music", "Members", "Performance", "Diary", "Diary"][
          index
        ],
        title: [
          "Getting to Know Yejun",
          "The Music That Connected Me to PLAVE",
          "Why Noah’s Voice Feels So Comforting",
          "The Stage Moments That Made Me Love PLAVE",
          "Being a PLLI in My Own Way",
          "How PLAVE Became Part of My Daily Life",
        ][index],
        description: [
          "Meet Yejun, the warm leader of PLAVE whose voice and energy make every performance feel special.",
          "Looking back on how PLAVE's music became part of my daily life and why their songs continue to inspire me.",
          "Noah’s vocal tone has a gentle charm that can make a song feel emotional, soft, and unforgettable.",
          "From live stages to small details in their performances, PLAVE always knows how to make fans smile.",
          "Being a fan is not about doing everything perfectly. It is about finding joy, comfort, and inspiration.",
          "A short diary about how PLAVE’s music, stories, and moments became something I return to every day.",
        ][index],
        author: "Shogun",
        date: new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }));

      setPosts(plavePosts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      selectedCategory === "Highlight" || post.category === selectedCategory;

    const matchKeyword =
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.description.toLowerCase().includes(keyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

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
          <Input
            placeholder="Search PLAVE..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
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