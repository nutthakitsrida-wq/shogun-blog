import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./components/ui/AdminPage";

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
      <Route path="/account" element={<DashboardLayout />}>
        <Route path="profile" element={<ProfilePage />} />
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