
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProjectCategory } from './types';
import { PROJECTS, DIRECTOR_INFO } from './data';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-black text-neutral-300">
        <Navbar />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home projects={PROJECTS} director={DIRECTOR_INFO} />} />
            <Route path="/directing" element={<ProjectList category={ProjectCategory.DIRECTING} projects={PROJECTS} />} />
            <Route path="/aifilm" element={<ProjectList category={ProjectCategory.AI_FILM} projects={PROJECTS} />} />
            <Route path="/producing" element={<ProjectList category={ProjectCategory.PRODUCING} projects={PROJECTS} />} />
            <Route path="/cinematography" element={<ProjectList category={ProjectCategory.CINEMATOGRAPHY} projects={PROJECTS} />} />
            <Route path="/commercial" element={<ProjectList category={ProjectCategory.COMMERCIAL} projects={PROJECTS} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;
