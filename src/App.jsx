import DashboardLayout, { AdminPlaceholder } from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlesPage from "./pages/admin/ArticlesPage";
import ArticleFormPage from "./pages/admin/ArticleFormPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import CategoryFormPage from "./pages/admin/CategoryFormPage";
import NotificationsPage from "./pages/admin/NotificationsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/posts/:postId"
        element={<ViewPostPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignUpPage />}
      />
      <Route path="/account" element={<Navigate to="/admin/profile" replace />} />
      <Route path="/account/profile" element={<Navigate to="/admin/profile" replace />} />
      <Route
        path="/account/reset-password"
        element={<Navigate to="/admin/reset-password" replace />}
      />
      <Route path="/admin" element={<DashboardLayout />}>
        <Route
          index
          element={
            <AdminPlaceholder
              title="Dashboard"
              description="Manage your publication from one place."
            />
          }
        />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/new" element={<ArticleFormPage />} />
        <Route path="articles/:articleId/edit" element={<ArticleFormPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/new" element={<CategoryFormPage />} />
        <Route path="categories/:categoryId/edit" element={<CategoryFormPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
      
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
