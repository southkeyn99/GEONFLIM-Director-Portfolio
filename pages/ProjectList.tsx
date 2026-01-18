
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
    <div className="pt-24 min-h-screen bg-black">
      <header className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-yellow-500 uppercase tracking-[0.4em] text-[10px] mb-4 font-bold opacity-80">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tighter">{category}</h1>
        <div className="w-20 h-px bg-yellow-500 mx-auto mt-8 opacity-50"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-neutral-600 italic font-light">No projects available in this category.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative cursor-pointer overflow-hidden bg-neutral-900 aspect-[3/4] border border-white/5"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={formatImageUrl(project.posterUrl)} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  <span className="text-yellow-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 block">{project.year}</span>
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight">
                      {project.title}
                    </h3>
                    {project.titleEn && (
                      <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-[0.2em] font-light">
                        {project.titleEn}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <span className="w-6 h-px bg-yellow-500"></span>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-widest">{project.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-12 animate-fade-in-down">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-8 right-8 text-white hover:text-yellow-500 text-3xl transition-colors z-50 p-2"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <div className="w-full max-w-7xl h-full overflow-y-auto custom-scrollbar md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pb-24">
              <div className="lg:col-span-4 space-y-8">
                <div className="relative group">
                    <img src={formatImageUrl(selectedProject.posterUrl)} alt={selectedProject.title} className="w-full shadow-2xl border border-white/10 rounded-sm" />
                    <div className="absolute -inset-2 border border-yellow-500/20 pointer-events-none"></div>
                </div>
                
                <div className="bg-neutral-900/50 p-8 border border-white/5 space-y-5">
                  {[
                    { label: 'Year', value: selectedProject.year },
                    { label: 'Genre', value: selectedProject.genre || 'N/A' },
                    { label: 'Runtime', value: selectedProject.runningTime || 'N/A' },
                    { label: 'Role', value: selectedProject.role }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-[10px] uppercase text-neutral-500 tracking-widest font-bold">{item.label}</span>
                      <span className="text-sm font-serif text-neutral-200">{item.value}</span>
                    </div>
                  ))}
                </div>

                {selectedProject.awards && (
                  <div className="p-6 border-l-4 border-yellow-500 bg-yellow-500/5">
                    <h4 className="text-[10px] uppercase tracking-widest text-yellow-500 font-bold mb-3 flex items-center gap-2">
                      <i className="fas fa-award"></i> Recognition
                    </h4>
                    <p className="text-sm text-neutral-300 italic leading-relaxed font-light">"{selectedProject.awards}"</p>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-8 space-y-16">
                <div className="border-b border-white/5 pb-16">
                  <div className="mb-12">
                    <h2 className="text-5xl md:text-8xl font-serif text-white mb-3 tracking-tighter leading-none">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.titleEn && (
                      <h3 className="text-xl md:text-3xl font-light text-neutral-500 uppercase tracking-[0.4em]">
                        {selectedProject.titleEn}
                      </h3>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-500 mb-6 font-bold flex items-center gap-3">
                        <span className="w-8 h-px bg-yellow-500/30"></span> Synopsis
                    </h3>
                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light whitespace-pre-wrap italic opacity-80">
                      {selectedProject.synopsis || selectedProject.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-500 mb-10 font-bold">Cinematic Frames</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {selectedProject.stillUrls.map((url, i) => (
                      <div key={i} className="aspect-video overflow-hidden bg-neutral-800 rounded-sm relative group/frame">
                        <img src={formatImageUrl(url)} alt={`Still ${i+1}`} className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-black/30 group-hover/frame:bg-transparent transition-all duration-700"></div>
                      </div>
                    ))}
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
