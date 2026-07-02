import ArticleSection from "./components/ArticleSection";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";


function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050816] via-[#101A3D] to-[#2A1458] py-8">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  );
}

export default App;