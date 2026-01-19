
import React from 'react';
import { Link } from 'react-router-dom';
import { DIRECTOR_INFO } from '../data';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-2">
          <h2 className="font-serif text-3xl text-white mb-8 tracking-widest">
            {DIRECTOR_INFO.nameEn}<span className="text-yellow-500">.</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-10 font-light">
            독립 영화에서 AI 단편, 상업 광고까지. <br />
            경계를 허무는 시각적 서사를 통해 새로운 가치를 창출합니다.
          </p>
          <div className="flex space-x-8 text-xl">
            <a href={DIRECTOR_INFO.instagram} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
            <a href={DIRECTOR_INFO.youtube} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">Contact</h3>
          <ul className="space-y-4 text-sm text-neutral-400 font-light">
            <li><a href={`tel:${DIRECTOR_INFO.phone}`} className="hover:text-yellow-500 transition-colors">{DIRECTOR_INFO.phone}</a></li>
            <li><a href={`mailto:${DIRECTOR_INFO.email}`} className="hover:text-yellow-500 transition-colors">{DIRECTOR_INFO.email}</a></li>
            <li className="text-neutral-600 pt-2 uppercase text-[9px] tracking-widest">Based in Seoul, Korea</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">Portfolios</h3>
          <ul className="space-y-4 text-sm text-neutral-400 font-light">
            <li><a href={DIRECTOR_INFO.adPortfolio} target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition-colors">Advertising Portfolio</a></li>
            <li><a href={DIRECTOR_INFO.youtube} target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition-colors">Personal Channel (@소질소)</a></li>
            {/* Added Link component which requires import from react-router-dom */}
            <li><Link to="/directing" className="hover:text-yellow-500 transition-colors">Film Archives</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-neutral-600">
        <p>&copy; {new Date().getFullYear()} {DIRECTOR_INFO.nameEn}. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0 italic">Designed with Cinematic Integrity</p>
      </div>
    </footer>
  );
};

export default Footer;
