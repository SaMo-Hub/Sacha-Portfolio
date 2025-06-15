import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import { AnimatePresence } from "framer-motion";
import { PageProjet } from "./ProjetPage/PageProjet";
import { Navbar } from "./components/Navbar";
import { About } from "./About/About";
import ScrollToTop from "./components/ScrollTop";

function App() {
  const location = useLocation();

  return (
    <div className=" ">
      <>
        {/* <ScrollToTop/> */}

        <AnimatePresence mode="wait">
          {/* <ScrollToHashElement/> */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} /> {/* Home */}
            <Route path="/about" element={<About />} /> {/* Home */}
            <Route path="/projets/:id" element={<PageProjet />} /> Home
          </Routes>
        </AnimatePresence>
      </>
    </div>
  );
}

export default App;
