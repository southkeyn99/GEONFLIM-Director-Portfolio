
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
  
  // 데이터에 정의된 순서 그대로 유지
  const displayProjects = filteredProjects; 
  
  const isCommercial = category === ProjectCategory.COMMERCIAL;
  const isProducing = category === ProjectCategory.PRODUCING;

  // 첫 글자만 대문자, 나머지는 소문자로 변환하는 헬퍼 함수
  const formatText = (str: string | undefined) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-black text-neutral-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-24 md:mb-40 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-[0.1em] md:tracking-[0.2em] uppercase mb-4 leading-tight">
            {category}
          </h1>
          <div className="w-16 md:w-24 h-px bg-white/20 mx-auto mt-6 md:mt-10"></div>
        </header>

        <div className="space-y-40 md:space-y-64">
          {displayProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const hasPoster = !isProducing && project.posterUrl;

            return (
              <div 
                key={project.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-24`}
              >
                {/* 리스트 프리뷰 섹션 */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[3/4.5] overflow-hidden bg-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 relative flex items-center justify-center">
                    {hasPoster ? (
                      <img 
                        src={formatImageUrl(project.posterUrl!)} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="text-neutral-800 font-serif italic text-sm md:text-lg tracking-widest opacity-40 select-none">
                        NO POSTER AVAILABLE
                      </div>
                    )}
                    
                    {project.isAI && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-black/60 backdrop-blur-md border border-yellow-500/50 px-3 py-1 text-[9px] font-black tracking-[0.2em] text-yellow-500 uppercase rounded-sm shadow-xl">
                          AI FILM
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                      {isCommercial ? (
                        <a 
                          href={project.link || DIRECTOR_INFO.adPortfolio} 
                          target="_blank" 
                          rel="noreferrer"
                          className="border border-white bg-black/40 backdrop-blur-md px-6 md:px-8 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
                        >
                          자세히 보기 <i className="fab fa-youtube ml-3 text-red-500"></i>
                        </a>
                      ) : (
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="border border-white bg-black/40 backdrop-blur-md px-6 md:px-8 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-white hover:bg-white hover:text-black transition-all"
                        >
                          자세히 보기
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 리스트 텍스트 섹션 */}
                <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-left">
                  <div className="space-y-3 md:space-y-4">
                    <span className="text-yellow-600 font-bold tracking-widest text-xs md:text-sm block">
                      {project.year}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight tracking-tight break-keep">
                      {project.title} {project.titleEn && <span className="text-neutral-500 text-xl md:text-3xl block md:inline md:ml-2">({project.titleEn})</span>}
                    </h2>
                    
                    {(project.genre || project.runtime || project.aspectRatio) && (
                      <div className="flex flex-wrap gap-3 md:gap-4 text-orange-400 font-bold text-[10px] md:text-xs tracking-widest pt-1 md:pt-2">
                        {project.genre && <span>{formatText(project.genre)}</span>}
                        {project.runtime && <span className="text-neutral-800">|</span>}
                        {project.runtime && <span>{formatText(project.runtime)}</span>}
                        {project.aspectRatio && <span className="text-neutral-800">|</span>}
                        {project.aspectRatio && <span>{project.aspectRatio}</span>}
                      </div>
                    )}
                  </div>

                  {!isCommercial && (
                    <p className="text-neutral-400 leading-relaxed font-light text-base md:text-lg max-w-lg">
                      {project.synopsis ? project.synopsis.slice(0, 150) + '...' : project.description || "상세 정보가 준비 중입니다."}
                    </p>
                  )}

                  {project.awardsList && project.awardsList.length > 0 && (
                    <div className="space-y-2 md:space-y-3 pt-2 md:pt-4">
                      {project.awardsList.slice(0, 5).map((award, i) => (
                        <div key={i} className="flex items-start gap-3 text-neutral-400 text-xs md:text-sm font-medium leading-snug">
                          <i className="fas fa-award text-[10px] text-yellow-600/70 mt-1"></i>
                          <span>{award}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 영화 상세 정보 모달 */}
      {!isCommercial && selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto custom-scrollbar flex flex-col items-center">
          {/* 닫기 버튼 */}
          <button 
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[120] text-neutral-700 hover:text-white transition-all p-3 group" 
            onClick={() => setSelectedProject(null)}
          >
            <i className="fas fa-times text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
          </button>

          {/* 메인 콘텐츠 컨테이너: 중앙 정렬 */}
          <div className="w-full max-w-7xl px-6 md:px-12 pt-24 md:pt-48 pb-24 mx-auto">
            
            {/* 상단 섹션: 포스터(Sticky) + 정보(Scroll) */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48 relative items-start justify-center">
              
              {/* 좌측: 포스터 & 스펙 (스티키) */}
              <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-32 h-fit space-y-10">
                <div className="aspect-[3/4.2] overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl relative">
                  {selectedProject.posterUrl ? (
                    <img 
                      src={formatImageUrl(selectedProject.posterUrl)} 
                      className="w-full h-full object-cover"
                      alt={selectedProject.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-800 text-[10px] tracking-[0.5em] uppercase italic opacity-30">Cinematic Archive</div>
                  )}
                </div>

                {/* 하단 스펙 테이블 */}
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

              {/* 우측: 텍스트 정보 */}
              <div className="flex-grow space-y-24 max-w-2xl">
                {/* 1. 타이틀 영역 */}
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

                {/* 2. 시놉시스: 줄 간격(1.8) 유지하되 글자 크기(15px/17px) 하향 조정 */}
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-px bg-yellow-600/40"></div>
                    <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Synopsis</h3>
                  </div>
                  <p className="text-neutral-300 text-[15px] md:text-[17px] leading-[1.8] tracking-normal font-normal break-keep whitespace-pre-line opacity-90">
                    {selectedProject.synopsis || "작품의 기록이 준비 중입니다."}
                  </p>
                </div>

                {/* 3. 수상 내역 (Recognition) */}
                {selectedProject.awardsList && selectedProject.awardsList.length > 0 && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-px bg-yellow-600/40"></div>
                      <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Recognition</h3>
                    </div>
                    <ul className="space-y-5">
                      {selectedProject.awardsList.map((award, i) => (
                        <li key={i} className="flex items-start gap-5 text-neutral-400 text-base md:text-lg font-light group">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-600/30 mt-2.5 group-hover:bg-yellow-600 transition-colors"></span>
                          <span className="group-hover:text-white transition-colors duration-300 leading-snug">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 하단 섹션: 스틸컷 */}
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

            {/* 모달 하단 클로징 */}
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
