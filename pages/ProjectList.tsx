
import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { DIRECTOR_INFO } from '../data';
import { formatImageUrl } from '../utils/imageHelper';

interface ProjectListProps {
  category: ProjectCategory;
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ category, projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filteredProjects = projects.filter(p => p.category === category);
  
  const displayProjects = filteredProjects; 
  const isCommercial = category === ProjectCategory.COMMERCIAL;

  const formatText = (str: string | undefined) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleProjectClick = (project: Project) => {
    if (isCommercial) {
      window.open(project.link || DIRECTOR_INFO.adPortfolio, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="pt-24 md:pt-40 min-h-screen bg-black text-neutral-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* 헤더 섹션: 왼쪽 정렬 및 하단 선 */}
        <header className="mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-[0.15em] uppercase mb-4 leading-tight">
            {category}
          </h1>
          <div className="w-12 h-[1px] bg-white/40"></div>
        </header>

        {/* 그리드 레이아웃: 3열 구성 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
          {displayProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer flex flex-col space-y-6"
              onClick={() => handleProjectClick(project)}
            >
              {/* 포스터 영역 */}
              <div className="aspect-[2/3] overflow-hidden bg-neutral-900 border border-white/5 relative shadow-lg">
                {project.posterUrl ? (
                  <img 
                    src={formatImageUrl(project.posterUrl)} 
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.title === '노이즈캔슬링' ? 'object-[33.3%_center]' : ''}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] tracking-widest text-neutral-700 font-serif italic">
                    NO POSTER
                  </div>
                )}
                
                {project.isAI && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-black/60 backdrop-blur-md border border-yellow-500/50 px-2 py-1 text-[8px] font-black tracking-[0.2em] text-yellow-500 uppercase rounded-sm">
                      AI FILM
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
              </div>

              {/* 정보 영역: 제목 아래 역할 및 수상 정보 추가 */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-lg md:text-xl font-serif text-white tracking-tight leading-tight flex-1">
                      {project.title}
                    </h3>
                    <span className="text-yellow-500 font-bold text-xs tracking-wider shrink-0">
                      {project.year}
                    </span>
                  </div>
                  {project.titleEn && (
                    <p className="text-[10px] md:text-[11px] text-neutral-500 uppercase tracking-[0.2em] font-medium leading-none">
                      {project.titleEn}
                    </p>
                  )}
                </div>

                {/* 참여 역할 및 대표 수상 정보 */}
                <div className="space-y-2">
                  <p className="text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-[0.1em] font-light">
                    {project.role}
                  </p>
                  
                  {project.awardsList && project.awardsList.length > 0 && (
                    <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                      <i className="fas fa-award text-[8px] text-yellow-600 mt-1"></i>
                      <p className="text-[9px] md:text-[10px] text-neutral-500 leading-tight italic line-clamp-1">
                        {project.awardsList[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 영화 상세 정보 모달 (기존 디자인 절대 유지) */}
      {!isCommercial && selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto custom-scrollbar flex flex-col items-center">
          <button 
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[120] text-neutral-700 hover:text-white transition-all p-3 group" 
            onClick={() => setSelectedProject(null)}
          >
            <i className="fas fa-times text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
          </button>

          <div className="w-full max-w-7xl px-6 md:px-12 pt-24 md:pt-48 pb-24 mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48 relative items-start justify-center">
              <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-32 h-fit space-y-10">
                <div className="aspect-[3/4.2] overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl relative">
                  {selectedProject.posterUrl ? (
                    <img 
                      src={formatImageUrl(selectedProject.posterUrl)} 
                      className={`w-full h-full object-cover ${selectedProject.title === '노이즈캔슬링' ? 'object-[33.3%_center]' : ''}`}
                      alt={selectedProject.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-800 text-[10px] tracking-[0.5em] uppercase italic opacity-30">Cinematic Archive</div>
                  )}
                </div>

                <div className="border-t border-white/10">
                  {[
                    { label: 'Year', value: selectedProject.year },
                    { label: 'Genre', value: formatText(selectedProject.genre) || 'Drama' },
                    { label: 'Runtime', value: formatText(selectedProject.runtime) || 'N/a' },
                    { label: 'Role', value: selectedProject.role }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{item.label}</span>
                      <span className="text-[12px] font-bold text-neutral-200 tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-grow space-y-24 max-w-2xl">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] uppercase break-keep">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.titleEn && (
                    <p className="text-neutral-500 font-serif text-xl md:text-2xl italic opacity-40">
                      {selectedProject.titleEn}
                    </p>
                  )}
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-px bg-yellow-600/40"></div>
                    <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Synopsis</h3>
                  </div>
                  <p className="text-neutral-300 text-[15px] md:text-[17px] leading-[1.8] tracking-normal font-normal break-keep whitespace-pre-line opacity-90">
                    {selectedProject.synopsis || "작품의 기록이 준비 중입니다."}
                  </p>
                </div>

                {selectedProject.description && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-px bg-yellow-600/40"></div>
                      <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Planning Intention</h3>
                    </div>
                    <p className="text-white text-[15px] md:text-[17px] font-serif italic leading-[1.8] tracking-tight break-keep whitespace-pre-line opacity-100">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

                {selectedProject.awardsList && selectedProject.awardsList.length > 0 && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-px bg-yellow-600/40"></div>
                      <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Recognition</h3>
                    </div>
                    <ul className="space-y-5">
                      {selectedProject.awardsList.map((award, i) => (
                        <li key={i} className="flex items-start gap-5 text-neutral-400 text-base md:text-lg font-light group">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 group-hover:bg-neutral-400 transition-colors"></span>
                          <span className="group-hover:text-white transition-colors duration-300 leading-snug">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-16 border-t border-white/5 pt-40">
              <div className="flex flex-col items-center gap-10 mb-16">
                 <h3 className="text-[10px] uppercase tracking-[1em] text-neutral-700 font-black">Cinematic Frames</h3>
                 <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent"></div>
              </div>
              
              <div className="space-y-16 md:space-y-32">
                {selectedProject.stillPhotos && selectedProject.stillPhotos.length > 0 ? (
                  selectedProject.stillPhotos.map((photo, i) => (
                    <div key={i} className="w-full bg-neutral-900 overflow-hidden shadow-2xl group border border-white/5">
                      <img 
                        src={formatImageUrl(photo)} 
                        className="w-full h-auto block transition-all duration-1000 group-hover:scale-[1.01]"
                        alt={`Scene Frame ${i + 1}`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-10">
                     <div className="aspect-video bg-neutral-950 border border-white/5 flex items-center justify-center font-mono text-[9px] tracking-widest uppercase italic">Frame_Alpha</div>
                     <div className="aspect-video bg-neutral-950 border border-white/5 flex items-center justify-center font-mono text-[9px] tracking-widest uppercase italic">Frame_Beta</div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-64 pb-32 flex flex-col items-center justify-center">
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="group flex flex-col items-center gap-6 text-neutral-700 hover:text-white transition-all duration-700"
               >
                  <div className="flex flex-col items-center gap-2">
                    <i className="fas fa-chevron-up text-[10px] group-hover:-translate-y-2 transition-transform"></i>
                    <i className="fas fa-chevron-up text-[8px] opacity-30 group-hover:-translate-y-2 transition-transform delay-75"></i>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.8em] font-bold">Back to Gallery</span>
               </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
