import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useReveal } from "./lib/useReveal";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Cloud from "./pages/Cloud";
import Platforms from "./pages/Platforms";
import PlatformDetail from "./pages/PlatformDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Insights from "./pages/Insights";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function ScrollManager() {
  const location = useLocation();

  /* Keyed on the location object, not its parts: re-clicking the anchor you are
     already on pushes a fresh entry and has to scroll again. */
  useEffect(() => {
    const { hash } = location;
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const target = () => document.getElementById(hash.slice(1));
    let attempts = 0;
    let timer;
    /* Content above the anchor can still arrive from the API, so keep re-asserting the position. */
    function scrollToTarget() {
      const el = target();
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      if (attempts++ < 8) timer = setTimeout(scrollToTarget, 150);
    }
    scrollToTarget();
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

export default function App() {
  useReveal();

  return (
    <>
      <ScrollManager />
      <div className="lights-out" aria-hidden="true" />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/platforms/:slug" element={<PlatformDetail />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
