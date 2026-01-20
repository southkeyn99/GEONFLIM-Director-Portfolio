
import React from 'react';
import { Link } from 'react-router-dom';
import { Project, DirectorInfo, ProjectCategory } from '../types';
import { formatImageUrl } from '../utils/imageHelper';

interface HomeProps {
  projects: Project[];
  director: DirectorInfo;
}

const Home: React.FC<HomeProps> = ({ projects, director }) => {
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
                        {project.awardsList.map((award, idx) => (
                          <li key={idx} className="text-neutral-400 text-[14px] md:text-[16px] font-normal leading-relaxed flex items-start gap-3">
                            <span className="text-neutral-600 mt-1.5 text-[8px] flex-shrink-0">●</span>
                            <span className="flex-1 opacity-90">{award}</span>
                          </li>
                        ))}
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
        <div className="absolute inset-0 z-0 bg-black">
          {/* Desktop/Tablet Background Image - Kept object-contain for full visibility */}
          <img 
            src={formatImageUrl("https://drive.google.com/file/d/1c4YXXdzakITg8GMGkBe7Y366LSCK2c3r/view?usp=sharing")} 
            alt="Hero Background Desktop" 
            className="hidden md:block w-full h-full object-contain opacity-80"
          />
          {/* Mobile Background Image - Reverted to object-cover with specific centering */}
          <img 
            src={formatImageUrl("https://drive.google.com/file/d/1_fdg9qMJjNKVYSf45J0umlAC4qJ5cYVO/view?usp=sharing")} 
            alt="Hero Background Mobile" 
            className="block md:hidden w-full h-full object-cover object-[33%_center] opacity-80"
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-yellow-500 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[10px] md:text-xs mb-8 md:mb-12 font-black drop-shadow-md">
            {director.title}
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif font-bold text-white mb-8 md:mb-10 tracking-tighter leading-[0.85] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {director.nameEn.split(' ')[0]} <br /> {director.nameEn.split(' ')[1]}
          </h1>

          {/* New Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 md:mb-14">
            <Link 
              to="/directing" 
              className="px-6 md:px-8 py-2.5 md:py-3 border border-white/30 bg-black/20 backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              FILM PORTFOLIO
            </Link>
            <Link 
              to="/commercial" 
              className="px-6 md:px-8 py-2.5 md:py-3 border border-white/30 bg-black/20 backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              COMMERCIAL PORTFOLIO
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10">
            <span className="h-px w-12 md:w-24 bg-white/40"></span>
            <p className="text-white text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.7em] uppercase font-bold whitespace-nowrap drop-shadow-lg">Visual Storyteller</p>
            <span className="h-px w-12 md:w-24 bg-white/40"></span>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <i className="fas fa-chevron-down text-white text-xl"></i>
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
    </div>
  );
};

export default Home;
