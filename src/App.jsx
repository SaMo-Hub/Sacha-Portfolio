import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import { AnimatePresence } from "framer-motion";
import { PageProjet } from "./ProjetPage/PageProjet";
import { About } from "./About/About";
import { LenisProvider, useLenis } from './components/LenisProvider'

// Le navigateur ne doit pas restaurer la position (retour / avant) : chaque page s'ouvre en haut
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function AnimatedRoutes() {
  const location = useLocation();
  const lenisRef = useLenis();

  // La page sortante a fini son animation : le rideau couvre l'écran, on remonte sans que ça se voie
  const scrollToTop = () => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} /> {/* Home */}
        <Route path="/about" element={<About />} /> {/* Home */}
        <Route path="/projets/:slug" element={<PageProjet />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className=" ">
      <LenisProvider>
        <AnimatedRoutes />
      </LenisProvider>
    </div>
  );
}

export default App;
