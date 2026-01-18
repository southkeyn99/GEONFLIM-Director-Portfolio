
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h2 className="font-serif text-2xl text-white mb-6">DIRECTOR<span className="accent-yellow">.</span>NAME</h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Pushing the boundaries of visual storytelling through film and advanced technology. 
            Available for worldwide collaborations.
          </p>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white font-bold mb-6">Inquiries</h3>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li><a href="mailto:hello@director.name" className="hover:text-yellow-500 transition-colors">hello@director.name</a></li>
            <li>+1 (555) 982-1234</li>
            <li>New York / Los Angeles</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white font-bold mb-6">Social</h3>
          <div className="flex justify-center md:justify-start space-x-6 text-xl">
            <a href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors"><i className="fab fa-vimeo-v"></i></a>
            <a href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors"><i className="fab fa-imdb"></i></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-neutral-600">
        <p>&copy; {new Date().getFullYear()} Cinematic Studios. All Rights Reserved.</p>
        <p>Built with Passion & Precision</p>
      </div>
    </footer>
  );
};

export default Footer;
