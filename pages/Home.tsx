
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Project, DirectorInfo, ProjectCategory } from '../types';
import { formatImageUrl } from '../utils/imageHelper';
import ProjectDetailModal from '../components/ProjectDetailModal';

interface HomeProps {
  projects: Project[];
  director: DirectorInfo;
}

const Home: React.FC<HomeProps> = ({ projects, director }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleMovieClick = (project: Project) => {
    setSearchParams({ project: project.id });
  };

  const handleCloseModal = () => {
    if (searchParams.has('project')) {
      window.history.back();
    } else {
      setSelectedProject(null);
    }
  };

  // 히어로 화면 아래 3개 작품: 유서파이널최종, 아부지, 도애의 시간
  const targetTitles = ['유서 파이널 최종', '아부지', '도애의 시간'];
  const directingProjects = targetTitles
    .map(title => projects.find(p => p.title.replace(/\s+/g, '') === title.replace(/\s+/g, '')))
    .filter((p): p is Project => p !== undefined);

  const renderResumeCategory = (category: ProjectCategory, title: string) => {
    const filtered = projects.filter(p => p.category === category);
    
    const groupedByYear = filtered.reduce((acc: { [key: string]: Project[] }, project) => {
      if (!acc[project.year]) acc[project.year] = [];
      acc[project.year].push(project);
      return acc;
    }, {});
    
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

    if (filtered.length === 0) return null;

    return (
      <div key={category} className="mb-32 md:mb-40">
        <div className="mb-14 md:mb-20">
          <h3 className="text-xl md:text-2xl font-serif text-white tracking-[0.25em] uppercase mb-5">
            {title}
          </h3>
          <div className="h-px w-24 md:w-40 bg-neutral-800"></div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {sortedYears.map((year) => (
            <div key={year} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-16">
              <div className="text-2xl md:text-3xl font-bold text-yellow-500 font-sans tracking-tight">
                {year}
              </div>

              <div className="space-y-14">
                {groupedByYear[year].map((project) => (
                  <div key={project.id} className="space-y-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 text-lg md:text-xl">
                      <h4 className="font-bold tracking-tight text-white leading-tight break-keep">
                        {/* 영어 통일을 위해 단편/장편 레이블을 영어로 수정 */}
                        {project.isAI 
                          ? 'AI Short Film ' 
                          : project.isFeature 
                            ? 'Feature Film '
                            : (project.category === ProjectCategory.COMMERCIAL ? '' : 'Short Film ')
                        }
                        &lt;{project.title}&gt;
                      </h4>
                      <span className="text-neutral-500 font-medium text-base md:text-lg">
                        {project.role}
                      </span>
                    </div>
                    
                    {project.awardsList && project.awardsList.length > 0 && (
                      <ul className="space-y-2.5">
                        {project.awardsList.map((award, idx) => {
                          const text = typeof award === 'string' ? award : award.text;
                          const link = typeof award === 'object' ? award.link : undefined;

                          return (
                            <li key={idx} className="text-neutral-400 text-[14px] md:text-[16px] font-normal leading-relaxed flex items-start gap-3">
                              <span className="text-neutral-600 mt-1.5 text-[8px] flex-shrink-0">●</span>
                              {link ? (
                                <a 
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 opacity-90 hover:opacity-100 hover:text-yellow-400 hover:underline transition-colors cursor-pointer"
                                >
                                  {text}
                                </a>
                              ) : (
                                <span className="flex-1 opacity-90">{text}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {/* Full Hero Background Container (Reverted to original uncropped full ratio) */}
          <div className="w-full h-full relative [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]">
            {/* Background Image (7th still photo) - Brightened for enhanced visibility */}
            <img 
              src={formatImageUrl("https://drive.google.com/file/d/1SZ5dJVlaoT9ORM5ejdyHc3F9_8ZfBdD8/view?usp=sharing")} 
              alt="Hero Background" 
              onError={(e) => {
                e.currentTarget.src = '/images/the_last_letter_7.jpg';
              }}
              className="w-full h-full object-cover object-center opacity-100 brightness-125 contrast-[1.08]"
            />

            {/* Natural top and bottom edge blending */}
            <div className="absolute inset-x-0 top-0 h-24 md:h-36 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-28 md:h-44 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>
          <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-7">
            <span className="w-8 md:w-12 h-px bg-yellow-500/60"></span>
            <p className="text-yellow-500 uppercase tracking-[0.5em] md:tracking-[0.7em] text-[10px] md:text-xs font-bold drop-shadow">
              {director.title}
            </p>
            <span className="w-8 md:w-12 h-px bg-yellow-500/60"></span>
          </div>

          {/* Director Name in refined cinematic editorial serif */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 md:mb-12 tracking-[0.06em] md:tracking-[0.1em] uppercase leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {director.nameEn}
          </h1>

          {/* Visual Storyteller Sub-element */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-9 md:mb-12">
            <span className="h-px w-10 md:w-20 bg-white/30"></span>
            <p className="text-white text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.7em] uppercase font-semibold whitespace-nowrap drop-shadow-lg">
              Visual Storyteller
            </p>
            <span className="h-px w-10 md:w-20 bg-white/30"></span>
          </div>

          {/* Navigation Buttons - Elegant Cinema Festival Style */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              to="/directing" 
              className="px-7 md:px-9 py-3 border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-200 hover:text-white hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 shadow-xl"
            >
              Film Portfolio
            </Link>
            <Link 
              to="/commercial" 
              className="px-7 md:px-9 py-3 border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-200 hover:text-white hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 shadow-xl"
            >
              Commercial Portfolio
            </Link>
          </div>
        </div>
        
        {/* Minimalist Editorial Scroll Indicator */}
        <div 
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-all duration-500" 
          onClick={() => document.getElementById('directing-preview')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-sans group-hover:text-yellow-500 transition-colors">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent group-hover:from-yellow-500 transition-colors"></div>
        </div>
      </section>

      {/* Directing Works Preview Section */}
      <section id="directing-preview" className="py-24 md:py-36 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-yellow-500 font-black text-[10px] tracking-[0.5em] uppercase opacity-80">
                <span className="w-10 h-px bg-yellow-500/50"></span>
                Selected Works
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-[0.15em] uppercase leading-tight">
                Directing
              </h2>
            </div>
            
            <Link 
              to="/directing" 
              className="group inline-flex items-center gap-3 text-neutral-400 hover:text-yellow-500 text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300"
            >
              <span>더보기</span>
              <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-300"></i>
            </Link>
          </div>

          {/* 3 Directing Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
            {directingProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => handleMovieClick(project)}
                className="group cursor-pointer flex flex-col space-y-6 block"
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

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

                  {/* Hover Overlay: Synopsis & Basic Info */}
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
                </div>

                {/* 정보 영역 */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="text-lg md:text-xl font-serif text-white tracking-tight leading-tight flex-1 group-hover:text-yellow-500 transition-colors">
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

          {/* Bottom 더보기 Button */}
          <div className="mt-16 md:mt-24 text-center">
            <Link 
              to="/directing" 
              className="inline-flex items-center gap-4 px-8 md:px-10 py-3.5 md:py-4 border border-white/20 bg-neutral-950/80 hover:bg-white hover:text-black text-white text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-300 shadow-lg"
            >
              <span>View More</span>
              <i className="fas fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Editorial layout */}
      <section id="about" className="py-32 md:py-56 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Circular Image & Contacts below it */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
              <div className="relative group max-w-[220px] mx-auto lg:mx-0">
                {/* Circular Image Container with Golden Ring Border */}
                <div className="aspect-square relative flex items-center justify-center">
                  {/* Outer Golden Ring */}
                  <div className="absolute inset-0 rounded-full border border-yellow-600/40 p-1 group-hover:border-yellow-500 transition-all duration-700"></div>
                  
                  {/* Inner Image Wrapper */}
                  <div className="w-[calc(100%-12px)] h-[calc(100%-12px)] overflow-hidden rounded-full">
                    <img 
                      src={formatImageUrl(director.profileImageUrl)} 
                      alt={director.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                  </div>
                </div>

                {/* Floating 'DIRECTOR' Badge - Rounded Pill Shape as requested */}
                <div className="absolute bottom-4 -right-6 bg-yellow-500 text-black px-6 py-2.5 font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full">
                  DIRECTOR
                </div>
              </div>

              {/* Contacts and Socials under photo */}
              <div className="space-y-10 pt-4 text-center lg:text-left">
                <div className="space-y-4">
                    <span className="text-[9px] md:text-[10px] uppercase text-neutral-600 tracking-[0.4em] font-bold block">Direct Contact</span>
                    <div className="space-y-3">
                      <a href={`tel:${director.phone}`} className="text-white hover:text-yellow-500 transition-all text-xl md:text-2xl font-serif block tracking-tighter">{director.phone}</a>
                      <a href={`mailto:${director.email}`} className="text-neutral-500 hover:text-white transition-all text-xs md:text-sm block lowercase tracking-tight">{director.email}</a>
                    </div>
                </div>
                
                <div className="space-y-4">
                  <span className="text-[9px] md:text-[10px] uppercase text-neutral-600 tracking-[0.4em] font-bold block">Social Media</span>
                  <div className="flex items-center justify-center lg:justify-start gap-6">
                    <a href={director.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-yellow-500 transition-all bg-white/5">
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href={director.youtube} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-yellow-500 transition-all bg-white/5">
                      <i className="fab fa-youtube text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Content */}
            <div className="lg:col-span-8 space-y-12 md:space-y-16">
              <header className="space-y-4">
                <div className="flex items-center gap-4 text-yellow-500 font-black text-[10px] tracking-[0.5em] uppercase opacity-70">
                  <span className="w-12 h-px bg-yellow-500/30"></span>
                  Director's Profile
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-none uppercase">
                  {director.name} <br />
                  <span className="text-neutral-700 italic text-3xl md:text-5xl lowercase font-serif mt-2 block">{director.nameEn}</span>
                </h2>
              </header>

              <div className="prose prose-invert max-w-none">
                {/* 우측 정렬을 맞추기 위해 text-justify와 break-all 속성을 적용 */}
                <p className="text-[14px] md:text-[17px] text-neutral-300 leading-[2.2] font-normal tracking-tight whitespace-pre-line text-justify break-all font-sans opacity-90">
                  {director.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Section */}
      <section id="filmography" className="py-24 md:py-48 px-6 max-w-6xl mx-auto border-t border-white/5">
        <header className="mb-24 md:mb-40 text-center space-y-6 md:space-y-10">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white tracking-[0.1em] md:tracking-widest leading-none">
              CURRICULUM VITAE
            </h2>
            <div className="text-neutral-500 text-[10px] md:text-[13px] uppercase tracking-[0.5em] md:tracking-[0.9em] font-medium opacity-60">
              FILMOGRAPHY & PROFESSIONAL EXPERIENCE
            </div>
        </header>

        <div className="flex flex-col">
          {renderResumeCategory(ProjectCategory.DIRECTING, "Directing")}
          {renderResumeCategory(ProjectCategory.COMMERCIAL, "Commercial Works")}
          {renderResumeCategory(ProjectCategory.CINEMATOGRAPHY, "Cinematography")}
          {renderResumeCategory(ProjectCategory.PRODUCING, "AD & Producing")}
        </div>

        <div className="mt-32 md:mt-48 text-center border-t border-white/5 pt-20 md:pt-32">
            <p className="text-neutral-600 text-[10px] md:text-[12px] uppercase tracking-[0.6em] md:tracking-[0.8em] mb-12 md:mb-20 italic opacity-50">
              Continuing the visual journey
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-20">
              <a href={director.adPortfolio} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-yellow-600 text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold hover:text-white transition-all">
                <span>Advertising Portfolio</span>
                <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform"></i>
              </a>
              <a href={director.youtube} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-yellow-600 text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold hover:text-white transition-all">
                <span>Personal Channel</span>
                <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform"></i>
              </a>
            </div>
        </div>
      </section>

      {/* 영화 상세 정보 모달 */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Home;
