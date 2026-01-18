
import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { formatImageUrl } from '../utils/imageHelper';

interface ProjectListProps {
  category: ProjectCategory;
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ category, projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => p.category === category);

  return (
    <div className="pt-24 min-h-screen">
      <header className="py-12 px-6 max-w-7xl mx-auto text-center">
        <p className="text-yellow-500 uppercase tracking-widest text-[10px] mb-2 font-bold">Category Portfolio</p>
        <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter">{category}</h1>
        <div className="w-16 h-0.5 bg-yellow-500 mx-auto mt-4"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-neutral-600 italic">No projects found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative cursor-pointer overflow-hidden bg-neutral-900 aspect-[3/4]"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={formatImageUrl(project.posterUrl)} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-yellow-500 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block">{project.year}</span>
                  <div className="space-y-0.5">
                    <h3 className="text-xl md:text-3xl font-serif text-white group-hover:text-yellow-400 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    {project.titleEn && (
                      <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-light">
                        {project.titleEn}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-yellow-500/50"></span>
                    <p className="text-neutral-500 text-[9px] md:text-[10px] uppercase tracking-wider">{project.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-10">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white hover:text-yellow-500 text-3xl transition-colors z-50 p-4"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <div className="w-full max-w-6xl h-full overflow-y-auto custom-scrollbar pt-10 px-2 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pb-20">
              <div className="lg:col-span-1 space-y-6">
                <img src={formatImageUrl(selectedProject.posterUrl)} alt={selectedProject.title} className="w-full shadow-2xl border border-white/10 rounded-sm" />
                
                <div className="bg-neutral-900/80 p-6 rounded-sm space-y-4 border border-white/5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-widest">Year</span>
                    <span className="text-sm font-serif text-white">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-widest">Genre</span>
                    <span className="text-sm font-serif text-white">{selectedProject.genre || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-widest">Duration</span>
                    <span className="text-sm font-serif text-white">{selectedProject.runningTime || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-widest">Role</span>
                    <span className="text-sm font-serif text-white">{selectedProject.role}</span>
                  </div>
                </div>

                {selectedProject.awards && (
                  <div className="p-5 border-l-2 border-yellow-500 bg-yellow-500/5 rounded-r-sm">
                    <h4 className="text-[10px] uppercase tracking-widest text-yellow-500 font-bold mb-3 flex items-center gap-2">
                      <i className="fas fa-award"></i> Awards & Recognition
                    </h4>
                    <p className="text-sm text-neutral-300 italic leading-relaxed">"{selectedProject.awards}"</p>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-2 space-y-12">
                <div className="border-b border-white/5 pb-10">
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-7xl font-serif text-white mb-2 tracking-tight leading-tight">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.titleEn && (
                      <h3 className="text-xl md:text-2xl font-light text-neutral-500 uppercase tracking-[0.3em]">
                        {selectedProject.titleEn}
                      </h3>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-4 font-bold">Synopsis</h3>
                      <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light whitespace-pre-wrap italic opacity-90">
                        {selectedProject.synopsis || selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-8 font-bold">Frames & Stills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProject.stillUrls.map((url, i) => (
                      <div key={i} className="aspect-video overflow-hidden bg-neutral-800 rounded-sm group/still relative">
                        <img src={formatImageUrl(url)} alt={`Still ${i+1}`} className="w-full h-full object-cover group-hover/still:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 group-hover/still:bg-transparent transition-colors"></div>
                      </div>
                    ))}
                    {selectedProject.stillUrls.length === 0 && <p className="text-neutral-600 italic">No visuals available for this production.</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
