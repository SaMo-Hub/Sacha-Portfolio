import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ReactLenis from 'lenis/react'
import { Desktop } from './components/Desktop/Desktop';
import { FileExplorer } from './components/FileExplorer/FileExplorer';



function App() {

 return (
    <section className="items-center text-white bg-black ">
      <Router>
        {/* Navbar pour naviguer */}

        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<FileExplorer />} /> {/* Home */}
        </Routes>
      </Router>
    </section>
  );
}

export default App
