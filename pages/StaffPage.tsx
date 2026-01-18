
import React from 'react';
import { Staff } from '../types';
import { formatImageUrl } from '../utils/imageHelper';

interface StaffPageProps {
  staff: Staff[];
}

const StaffPage: React.FC<StaffPageProps> = ({ staff }) => {
  return (
    <div className="pt-24 min-h-screen bg-black">
      <header className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-yellow-500 uppercase tracking-[0.4em] text-[10px] mb-4 font-bold opacity-80">Creative Core</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tighter">Collaborators</h1>
        <div className="w-20 h-px bg-yellow-500 mx-auto mt-8 opacity-50"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {staff.map((member) => (
            <div key={member.id} className="group relative cursor-default overflow-hidden bg-neutral-900 aspect-[3/4] border border-white/5">
              <img 
                src={formatImageUrl(member.photoUrl)} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <span className="text-yellow-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                  {member.role}
                </span>
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight">
                    {member.name}
                  </h3>
                  {member.nameEn && (
                    <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-[0.2em] font-light">
                      {member.nameEn}
                    </p>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <p className="text-neutral-400 text-[11px] md:text-xs leading-relaxed font-light italic">
                    "Pushing the visual boundaries alongside the director, ensuring every frame resonates with cinematic truth."
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
