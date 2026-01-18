
import React from 'react';
import { Staff } from '../types';
import { formatImageUrl } from '../utils/imageHelper';

interface StaffPageProps {
  staff: Staff[];
}

const StaffPage: React.FC<StaffPageProps> = ({ staff }) => {
  return (
    <div className="pt-24 min-h-screen">
      <header className="py-12 px-6 max-w-7xl mx-auto text-center">
        <p className="text-yellow-500 uppercase tracking-widest text-[10px] mb-2 font-bold">Creative Force</p>
        <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter">Collaborators</h1>
        <div className="w-16 h-0.5 bg-yellow-500 mx-auto mt-4"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
          {staff.map((member) => (
            <div key={member.id} className="group relative cursor-default overflow-hidden bg-neutral-900 aspect-[3/4] rounded-sm">
              <img 
                src={formatImageUrl(member.photoUrl)} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-yellow-500 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block">
                  {member.role}
                </p>
                <div className="space-y-0.5">
                  <h3 className="text-xl md:text-3xl font-serif text-white transition-colors leading-tight">
                    {member.name}
                  </h3>
                  {member.nameEn && (
                    <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-light">
                      {member.nameEn}
                    </p>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <p className="text-neutral-400 text-[11px] md:text-xs leading-relaxed font-light italic">
                    "Expert in their field, bringing unique vision to every production."
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
