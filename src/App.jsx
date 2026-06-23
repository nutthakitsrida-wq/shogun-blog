import ArticleSection from "./components/ArticleSection";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      <NavBar />
<HeroSection />
<ArticleSection />
<Footer />
    </main>
  );
}

export default App;