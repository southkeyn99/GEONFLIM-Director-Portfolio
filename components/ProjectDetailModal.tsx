import React, { useEffect } from 'react';
import { Project } from '../types';
import { formatImageUrl } from '../utils/imageHelper';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const formatText = (str: string | undefined) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto custom-scrollbar flex flex-col items-center">
      <button 
        className="fixed top-8 right-8 md:top-12 md:right-12 z-[120] text-neutral-700 hover:text-white transition-all p-3 group" 
        onClick={onClose}
        aria-label="Close"
      >
        <i className="fas fa-times text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
      </button>

      <div className="w-full max-w-7xl px-6 md:px-12 pt-24 md:pt-48 pb-24 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48 relative items-start justify-center">
          <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-32 h-fit space-y-10">
            <div className="aspect-[3/4.2] overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl relative">
              {project.posterUrl ? (
                <img 
                  src={formatImageUrl(project.posterUrl)} 
                  onError={(e) => {
                    if (project.title === '유서 파이널 최종') {
                      e.currentTarget.src = '/images/the_last_letter_poster.jpg';
                    }
                  }}
                  className={`w-full h-full object-cover ${project.title === '노이즈캔슬링' ? 'object-[33.3%_center]' : project.title === '문' ? 'object-[33.3%_center]' : ''}`}
                  alt={project.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-800 text-[10px] tracking-[0.5em] uppercase italic opacity-30">Cinematic Archive</div>
              )}
            </div>

            <div className="border-t border-white/10">
              {[
                { label: 'Year', value: project.year },
                { label: 'Genre', value: formatText(project.genre) || 'Drama' },
                { label: 'Runtime', value: formatText(project.runtime) || 'N/a' },
                { label: 'Role', value: project.role }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{item.label}</span>
                  <span className="text-[12px] font-bold text-neutral-200 tracking-tight">{item.value}</span>
                </div>
              ))}
            </div>

            {project.youtubeUrl && (
              <div className="pt-2">
                <a 
                  href={project.youtubeUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-3 text-red-600 hover:text-red-500 text-xs tracking-widest uppercase font-bold"
                >
                  <i className="fab fa-youtube text-lg"></i>
                  <span>Watch on YouTube</span>
                </a>
              </div>
            )}
          </div>

          <div className="flex-grow space-y-24 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] uppercase break-keep">
                {project.title}
              </h2>
              {project.titleEn && (
                <p className="text-neutral-500 font-serif text-xl md:text-2xl italic opacity-40">
                  {project.titleEn}
                </p>
              )}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-10 h-px bg-yellow-600/40"></div>
                <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Synopsis</h3>
              </div>
              <p className="text-neutral-300 text-[15px] md:text-[17px] leading-[1.8] tracking-normal font-normal break-keep whitespace-pre-line opacity-90">
                {project.synopsis || "작품의 기록이 준비 중입니다."}
              </p>
            </div>

            {project.description && (
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-10 h-px bg-yellow-600/40"></div>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Planning Intention</h3>
                </div>
                <p className="text-white text-[15px] md:text-[17px] font-serif italic leading-[1.8] tracking-tight break-keep whitespace-pre-line opacity-100">
                  {project.description}
                </p>
              </div>
            )}

            {project.awardsList && project.awardsList.length > 0 && (
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-10 h-px bg-yellow-600/40"></div>
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-yellow-600 font-black">Recognition</h3>
                </div>
                <ul className="space-y-5">
                  {project.awardsList.map((award, i) => {
                    const text = typeof award === 'string' ? award : award.text;
                    const link = typeof award === 'object' ? award.link : undefined;

                    return (
                      <li key={i} className="flex items-start gap-5 text-neutral-400 text-base md:text-lg font-light group">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 group-hover:bg-neutral-400 transition-colors"></span>
                        {link ? (
                          <a 
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group-hover:text-white hover:text-yellow-400 hover:underline transition-colors duration-300 leading-snug cursor-pointer"
                          >
                            {text}
                          </a>
                        ) : (
                          <span className="group-hover:text-white transition-colors duration-300 leading-snug">{text}</span>
                        )}
                      </li>
                    );
                  })}
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
            {project.stillPhotos && project.stillPhotos.length > 0 ? (
              project.stillPhotos.map((photo, i) => (
                <div key={i} className="w-full bg-neutral-900 overflow-hidden shadow-2xl group border border-white/5">
                  <img 
                    src={formatImageUrl(photo)} 
                    className="w-full h-auto block transition-all duration-1000 group-hover:scale-[1.01]"
                    alt={`Scene Frame ${i + 1}`}
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement)?.classList.add('hidden');
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-10">
                 <div className="aspect-video bg-neutral-950 border border-white/5 flex items-center justify-center font-mono text-[9px] tracking-widest uppercase italic">COMING SOON</div>
                 <div className="aspect-video bg-neutral-950 border border-white/5 flex items-center justify-center font-mono text-[9px] tracking-widest uppercase italic">COMING SOON</div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-64 pb-32 flex flex-col items-center justify-center">
           <button 
              onClick={onClose}
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
  );
};

export default ProjectDetailModal;
