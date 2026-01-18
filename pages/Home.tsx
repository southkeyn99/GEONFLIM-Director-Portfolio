
import React from 'react';
import { Project, TimelineEvent, DirectorInfo } from '../types';
import { TIMELINE_DATA } from '../data';
import { formatImageUrl } from '../utils/imageHelper';

interface HomeProps {
  projects: Project[];
  director: DirectorInfo;
}

const Home: React.FC<HomeProps> = ({ projects, director }) => {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/director-hero/1920/1080?grayscale" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <p className="text-yellow-500 uppercase tracking-[0.5em] text-xs mb-4 font-semibold animate-pulse">
            {director.title}
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter">
            Vision Through <br /> The Lens
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <p className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Scroll to explore</p>
            <i className="fas fa-chevron-down text-yellow-500 text-xs"></i>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-yellow-500/30 rounded-full group-hover:border-yellow-500/60 transition-all duration-500"></div>
            <img 
              src={formatImageUrl(director.profileImageUrl)} 
              alt={director.name} 
              className="w-full aspect-square object-cover rounded-full shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-white">Defining the <span className="accent-yellow italic">Cinematic</span> Narrative</h2>
            <p className="text-lg text-neutral-400 leading-relaxed font-light whitespace-pre-wrap">
              {director.bio}
            </p>
            <p className="text-neutral-500 italic">
              "{director.quote}"
            </p>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-white text-center mb-16 tracking-widest uppercase">Career Milestones</h2>
          
          <div className="relative border-l border-neutral-800 ml-4 md:ml-0 space-y-12">
            {TIMELINE_DATA.map((event, index) => (
              <div key={event.id} className="relative pl-10 md:pl-0">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-yellow-500 border-4 border-black z-10"></div>
                
                <div className={`md:flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <span className="text-yellow-500 font-bold text-2xl font-serif">{event.year}</span>
                    <h3 className="text-xl text-white font-serif mt-1">{event.title}</h3>
                    <p className="mt-2 text-neutral-500 max-w-md mx-auto md:mx-0 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
