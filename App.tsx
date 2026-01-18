
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Project, Staff, ProjectCategory, DirectorInfo } from './types';
import { INITIAL_PROJECTS, INITIAL_STAFF } from './data';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import StaffPage from './pages/StaffPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const DEFAULT_DIRECTOR: DirectorInfo = {
  name: "DIRECTOR.NAME",
  title: "Film Director & Visual Artist",
  bio: "With over a decade of experience in traditional filmmaking and a recent pioneer in AI-assisted cinematography, I strive to bridge the gap between human emotion and technological advancement.",
  quote: "Stories are the only things that truly belong to us. My mission is to tell them with uncompromising visual integrity.",
  profileImageUrl: "https://picsum.photos/seed/director-profile/600/600"
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [director, setDirector] = useState<DirectorInfo>(DEFAULT_DIRECTOR);

  useEffect(() => {
    const savedProjects = localStorage.getItem('director_projects');
    const savedStaff = localStorage.getItem('director_staff');
    const savedDirector = localStorage.getItem('director_info');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('director_projects', JSON.stringify(INITIAL_PROJECTS));
    }

    if (savedStaff) setStaff(JSON.parse(savedStaff));
    else {
      setStaff(INITIAL_STAFF);
      localStorage.setItem('director_staff', JSON.stringify(INITIAL_STAFF));
    }

    if (savedDirector) setDirector(JSON.parse(savedDirector));
  }, []);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('director_projects', JSON.stringify(newProjects));
  };

  const updateStaff = (newStaff: Staff[]) => {
    setStaff(newStaff);
    localStorage.setItem('director_staff', JSON.stringify(newStaff));
  };

  const updateDirector = (info: DirectorInfo) => {
    setDirector(info);
    localStorage.setItem('director_info', JSON.stringify(info));
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-black text-neutral-300">
        <Navbar />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home projects={projects} director={director} />} />
            <Route path="/film" element={<ProjectList category={ProjectCategory.FILM} projects={projects} />} />
            <Route path="/ai-film" element={<ProjectList category={ProjectCategory.AI_FILM} projects={projects} />} />
            <Route path="/cinematography" element={<ProjectList category={ProjectCategory.CINEMATOGRAPHY} projects={projects} />} />
            <Route path="/commercial" element={<ProjectList category={ProjectCategory.COMMERCIAL} projects={projects} />} />
            <Route path="/staff" element={<StaffPage staff={staff} />} />
            <Route 
              path="/admin" 
              element={
                <AdminDashboard 
                  projects={projects} 
                  staff={staff} 
                  director={director}
                  onUpdateProjects={updateProjects} 
                  onUpdateStaff={updateStaff} 
                  onUpdateDirector={updateDirector}
                />
              } 
            />
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
