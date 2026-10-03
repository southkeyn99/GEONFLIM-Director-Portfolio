
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Project, ProjectCategory } from '../types';
import { DIRECTOR_INFO } from '../data';
import { formatImageUrl } from '../utils/imageHelper';
import ProjectDetailModal from '../components/ProjectDetailModal';

interface ProjectListProps {
  category: ProjectCategory;
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ category, projects }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filteredProjects = projects.filter(p => p.category === category);
  
  const displayProjects = filteredProjects; 
  const isCommercial = category === ProjectCategory.COMMERCIAL;

  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      const found = projects.find(p => p.id === projectId);
      if (found) {
        setSelectedProject(found);
      }
    } else {
      setSelectedProject(null);
    }
  }, [searchParams, projects]);

  const handleProjectClick = (project: Project) => {
    if (isCommercial) {
      window.open(project.link || DIRECTOR_INFO.adPortfolio, '_blank');
    } else {
      setSearchParams({ project: project.id });
    }
  };

  const handleCloseModal = () => {
    if (searchParams.has('project')) {
      window.history.back();
    } else {
      setSelectedProject(null);
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
                    onError={(e) => {
                      if (project.title === '유서 파이널 최종') {
                        e.currentTarget.src = '/images/the_last_letter_poster.jpg';
                      }
                    }}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.title === '노이즈캔슬링' ? 'object-[33.3%_center]' : project.title === '문' ? 'object-[33.3%_center]' : ''}`}
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

                {/* Hover Overlay: Synopsis & Basic Info */}
                {!isCommercial && (
                  <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm pointer-events-none">
                    <div className="space-y-5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 font-sans">
                      <div className="space-y-2">
                        <p className="text-[9px] text-yellow-500 uppercase tracking-[0.3em] font-black">Information</p>
                        <div className="flex flex-col gap-1">
                          <p className="text-white text-[11px] md:text-xs font-bold tracking-tight uppercase">
                            {project.genre || 'Drama'}
                          </p>
                          <p className="text-neutral-400 text-[10px] md:text-[11px] tracking-widest font-medium uppercase">
                            {project.runtime || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-6 h-[1px] bg-white/20 mx-auto"></div>
                      
                      {project.synopsis && (
                        <p className="text-neutral-200 text-[11px] md:text-[12px] leading-relaxed line-clamp-8 font-normal break-keep">
                          {project.synopsis}
                        </p>
                      )}
                    </div>
                  </div>
                )}
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
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {project.awardsList.slice(0, 3).map((award, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <i className="fas fa-award text-[8px] text-yellow-600 mt-1"></i>
                          <p className="text-[9px] md:text-[10px] text-neutral-500 leading-tight italic line-clamp-1">
                            {award}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 영화 상세 정보 모달 */}
      {!isCommercial && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ProjectList;
