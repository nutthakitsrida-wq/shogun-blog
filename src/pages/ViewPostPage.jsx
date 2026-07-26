import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import plavePostDetails from "../data/plavePostDetails";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  }

  function openLoginDialog() {
    setLoginDialogOpen(true);
  }

  useEffect(() => {
    let isCancelled = false;

    axios
      .get(`https://blog-post-project-api.vercel.app/posts/${postId}`)
      .then((response) => {
        if (isCancelled) return;
        const apiPost = response.data;
        setNotFound(false);
        setPost({
          ...apiPost,
          ...plavePostDetails[apiPost.id],
        });
      })
      .catch((error) => {
        if (isCancelled) return;
        if (error.response?.status === 404) {
          setNotFound(true);
          setPost(null);
          return;
        }
        console.error(error);
      });

    return () => {
      isCancelled = true;
    };
  }, [postId]);

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050816] via-[#101A3D] to-[#2A1458] px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-2xl">
          <h1 className="mb-4 text-4xl font-bold text-violet-700">
            Post Not Found
          </h1>

          <p className="mb-6 text-gray-500">This post does not exist.</p>

          <Link
            to="/"
            className="rounded-full bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050816] via-[#101A3D] to-[#2A1458] px-4 py-8">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          ← Back to home
        </Link>

        <img
          src={post.image}
          alt={post.title}
          className="mb-8 h-[260px] w-full rounded-2xl object-cover md:h-[420px]"
        />

        <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          {post.category}
        </span>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {post.title}
        </h1>

        <p className="mb-6 text-lg text-gray-600">{post.description}</p>

        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{post.likes} likes</span>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={openLoginDialog}
            className="rounded-full bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-700"
          >
            ♥ Like
          </button>

          <button
            onClick={handleCopyLink}
            className="rounded-full border border-violet-600 px-5 py-2 font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            🔗 Copy Link
          </button>
        </div>

        <div className="mb-10 whitespace-pre-line text-base leading-8 text-gray-700">
          {post.content}
        </div>

        <div className="rounded-2xl bg-gray-100 p-4">
          <h2 className="mb-3 text-xl font-bold text-gray-900">Comment</h2>

          <textarea
            placeholder="What are your thoughts?"
            className="h-28 w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-violet-400"
          />

          <button
            onClick={openLoginDialog}
            className="mt-4 rounded-full bg-gray-900 px-6 py-2 font-semibold text-white"
          >
            Send
          </button>
        </div>
      </article>

      <AlertDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please log in first</AlertDialogTitle>
            <AlertDialogDescription>
              You need to log in before you can like or comment on this post.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <button
              onClick={() => setLoginDialogOpen(false)}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
            >
              OK
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default ViewPostPage;
