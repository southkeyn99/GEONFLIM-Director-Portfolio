
import React from 'react';
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
                            <span className="text-yellow-600/50 mt-1.5 text-[8px] flex-shrink-0">●</span>
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
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-yellow-500 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[10px] md:text-xs mb-8 md:mb-12 font-black">
            {director.title}
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif font-bold text-white mb-10 md:mb-14 tracking-tighter leading-[0.85] uppercase">
            {director.nameEn.split(' ')[0]} <br /> {director.nameEn.split(' ')[1]}
          </h1>
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <span className="h-px w-12 md:w-24 bg-white/10"></span>
            <p className="text-neutral-500 text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.7em] uppercase font-light whitespace-nowrap">Visual Storyteller</p>
            <span className="h-px w-12 md:w-24 bg-white/10"></span>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-30 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <i className="fas fa-chevron-down text-white text-xl"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-48 px-6 bg-neutral-950/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="relative flex-shrink-0 group">
              <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 p-2 transition-all duration-700 group-hover:border-yellow-500/40">
                <img 
                  src={formatImageUrl(director.profileImageUrl)} 
                  alt={director.name} 
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                Director
              </div>
            </div>

            <div className="flex-grow space-y-10 md:space-y-12 text-center lg:text-left">
              <div className="space-y-6">
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.7em] text-yellow-500 font-black opacity-80">Introduction</h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight">
                  {director.name} <br /><span className="text-neutral-600 italic text-2xl md:text-5xl">{director.nameEn}</span>
                </h3>
                <p className="text-base md:text-xl text-neutral-400 leading-relaxed font-light max-w-3xl mx-auto lg:mx-0">
                  {director.bio}
                </p>
              </div>
              
              <div className="pt-10 md:pt-14 border-t border-white/5 flex flex-col md:flex-row items-center lg:items-start gap-12 md:gap-20">
                <div className="space-y-2 text-left">
                    <span className="text-[9px] md:text-[10px] uppercase text-neutral-600 tracking-widest font-bold block mb-1">Contact</span>
                    <a href={`tel:${director.phone}`} className="text-white hover:text-yellow-500 transition-colors text-2xl md:text-3xl font-serif block tracking-tight">{director.phone}</a>
                    <a href={`mailto:${director.email}`} className="text-neutral-500 hover:text-yellow-500 transition-colors text-sm md:text-lg block">{director.email}</a>
                </div>
                <div className="flex items-center gap-8">
                  <a href={director.instagram} target="_blank" rel="noreferrer" className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-yellow-500 transition-all bg-white/5">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href={director.youtube} target="_blank" rel="noreferrer" className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-yellow-500 transition-all bg-white/5">
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                </div>
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
          {/* 순서 조정: DIRECTING -> COMMERCIAL WORKS -> CINEMATOGRAPHY -> AD & PRODUCING */}
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
