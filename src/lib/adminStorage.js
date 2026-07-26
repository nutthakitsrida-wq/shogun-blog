import blogPosts from "../data/blogPosts";

const ARTICLE_KEY = "adminArticles";
const CATEGORY_KEY = "adminCategories";

function seedArticles() {
  return blogPosts.map((post) => ({
    ...post,
    status: post.status || "published",
    content: post.content || post.description,
    createdAt: post.date,
    updatedAt: post.date,
  }));
}

export function getArticles() {
  const saved = localStorage.getItem(ARTICLE_KEY);
  if (saved) return JSON.parse(saved);

  const articles = seedArticles();
  localStorage.setItem(ARTICLE_KEY, JSON.stringify(articles));
  return articles;
}

export function saveArticles(articles) {
  localStorage.setItem(ARTICLE_KEY, JSON.stringify(articles));
}

export function getCategories() {
  const saved = localStorage.getItem(CATEGORY_KEY);
  if (saved) return JSON.parse(saved);

  const categories = [...new Set(seedArticles().map((article) => article.category))].map(
    (name, index) => ({ id: index + 1, name })
  );
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  return categories;
}

export function saveCategories(categories) {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
}

export function addNotification(message, target = "/admin") {
  const notifications = JSON.parse(localStorage.getItem("adminNotifications")) || [];
  localStorage.setItem(
    "adminNotifications",
    JSON.stringify([
      { id: Date.now(), message, target, createdAt: new Date().toISOString() },
      ...notifications,
    ])
  );
}
