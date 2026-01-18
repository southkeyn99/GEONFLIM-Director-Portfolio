
import React, { useState } from 'react';
import { Project, Staff, ProjectCategory, DirectorInfo } from '../types';
import { GoogleGenAI } from "@google/genai";
import { formatImageUrl } from '../utils/imageHelper';

interface AdminDashboardProps {
  projects: Project[];
  staff: Staff[];
  director: DirectorInfo;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateStaff: (staff: Staff[]) => void;
  onUpdateDirector: (info: DirectorInfo) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, 
  staff, 
  director,
  onUpdateProjects, 
  onUpdateStaff,
  onUpdateDirector
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'staff' | 'director'>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState<Partial<Project>>({});
  const [editStaff, setEditStaff] = useState<Partial<Staff>>({});
  const [editDirector, setEditDirector] = useState<DirectorInfo>(director);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIDescription = async () => {
    if (!editProject.title) return alert("Enter a title first");
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a compelling, long cinematic synopsis (around 300-500 characters) for a film titled "${editProject.title}" where the director role is "${editProject.role || 'Director'}". Category is ${editProject.category || 'Film'}. Make it sound professional and artistic.`,
      });
      setEditProject({ ...editProject, synopsis: response.text?.trim() });
    } catch (err) {
      console.error(err);
      alert("AI generation failed. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProject.id) {
      onUpdateProjects(projects.map(p => p.id === editProject.id ? editProject as Project : p));
    } else {
      const newProject = { ...editProject, id: Date.now().toString() } as Project;
      onUpdateProjects([...projects, newProject]);
    }
    setEditProject({});
    setIsEditing(false);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editStaff.id) {
      onUpdateStaff(staff.map(s => s.id === editStaff.id ? editStaff as Staff : s));
    } else {
      const newStaffMember = { ...editStaff, id: Date.now().toString() } as Staff;
      onUpdateStaff([...staff, newStaffMember]);
    }
    setEditStaff({});
    setIsEditing(false);
  };

  const handleSaveDirector = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDirector(editDirector);
    alert("Director information updated!");
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-24 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center py-12 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Management</h1>
          <p className="text-neutral-500 mt-2">Update your portfolio contents.</p>
        </div>
        <div className="flex bg-neutral-900 rounded-lg p-1 overflow-x-auto">
          <button 
            onClick={() => { setActiveTab('projects'); setIsEditing(false); }}
            className={`px-6 py-2 rounded-md transition-all whitespace-nowrap text-xs uppercase tracking-widest ${activeTab === 'projects' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => { setActiveTab('staff'); setIsEditing(false); }}
            className={`px-6 py-2 rounded-md transition-all whitespace-nowrap text-xs uppercase tracking-widest ${activeTab === 'staff' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400'}`}
          >
            Collaborators
          </button>
          <button 
            onClick={() => { setActiveTab('director'); setIsEditing(false); }}
            className={`px-6 py-2 rounded-md transition-all whitespace-nowrap text-xs uppercase tracking-widest ${activeTab === 'director' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400'}`}
          >
            Director
          </button>
        </div>
      </header>

      {activeTab === 'director' ? (
        <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 animate-in fade-in">
          <h2 className="text-2xl font-serif mb-8 text-white">Edit Profile</h2>
          <form onSubmit={handleSaveDirector} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Public Name</span>
                <input 
                  type="text" 
                  value={editDirector.name}
                  onChange={(e) => setEditDirector({...editDirector, name: e.target.value})}
                  className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Title</span>
                <input 
                  type="text" 
                  value={editDirector.title}
                  onChange={(e) => setEditDirector({...editDirector, title: e.target.value})}
                  className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Photo URL</span>
                <input 
                  type="text" 
                  value={editDirector.profileImageUrl}
                  onChange={(e) => setEditDirector({...editDirector, profileImageUrl: e.target.value})}
                  className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                />
              </label>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Biography</span>
                <textarea 
                  rows={6}
                  value={editDirector.bio}
                  onChange={(e) => setEditDirector({...editDirector, bio: e.target.value})}
                  className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none resize-none"
                ></textarea>
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Quote</span>
                <input 
                  type="text" 
                  value={editDirector.quote}
                  onChange={(e) => setEditDirector({...editDirector, quote: e.target.value})}
                  className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                />
              </label>
              <button type="submit" className="w-full bg-yellow-500 text-black font-bold uppercase py-4 rounded-sm hover:bg-yellow-400 transition-colors mt-4 text-xs tracking-widest">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      ) : isEditing ? (
        <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-serif mb-8 text-white">
            {activeTab === 'projects' ? 'Project Details' : 'Staff Details'}
          </h2>
          
          {activeTab === 'projects' ? (
            <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Titles</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Korean Title (Main)</span>
                      <input 
                        type="text" 
                        value={editProject.title || ''}
                        onChange={(e) => setEditProject({...editProject, title: e.target.value})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">English Title (Sub)</span>
                      <input 
                        type="text" 
                        value={editProject.titleEn || ''}
                        onChange={(e) => setEditProject({...editProject, titleEn: e.target.value})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                        placeholder="ENGLISH TITLE"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Specs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Year</span>
                      <input 
                        type="text" 
                        value={editProject.year || ''}
                        onChange={(e) => setEditProject({...editProject, year: e.target.value})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Category</span>
                      <select 
                        value={editProject.category || ProjectCategory.FILM}
                        onChange={(e) => setEditProject({...editProject, category: e.target.value as ProjectCategory})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                      >
                        {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Genre</span>
                      <input 
                        type="text" 
                        value={editProject.genre || ''}
                        onChange={(e) => setEditProject({...editProject, genre: e.target.value})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Runtime</span>
                      <input 
                        type="text" 
                        value={editProject.runningTime || ''}
                        onChange={(e) => setEditProject({...editProject, runningTime: e.target.value})}
                        className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                      />
                    </label>
                  </div>
                </div>
                
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Poster URL</span>
                  <input 
                    type="text" 
                    value={editProject.posterUrl || ''}
                    onChange={(e) => setEditProject({...editProject, posterUrl: e.target.value})}
                    placeholder="https://drive.google.com/..."
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Narrative</h3>
                  <label className="block">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Synopsis</span>
                      <button 
                        type="button"
                        onClick={generateAIDescription}
                        disabled={isGenerating}
                        className="text-[9px] text-yellow-500 hover:text-white uppercase font-bold flex items-center gap-1"
                      >
                        <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i> AI Writer
                      </button>
                    </div>
                    <textarea 
                      rows={5}
                      value={editProject.synopsis || ''}
                      onChange={(e) => setEditProject({...editProject, synopsis: e.target.value})}
                      className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none resize-none"
                    ></textarea>
                  </label>
                </div>
                
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Still URLs (Comma sep)</span>
                  <textarea 
                    rows={3}
                    value={editProject.stillUrls?.join(', ') || ''}
                    onChange={(e) => setEditProject({...editProject, stillUrls: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})}
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none resize-none"
                  ></textarea>
                </label>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <button type="submit" className="flex-1 bg-yellow-500 text-black font-bold uppercase py-3 rounded-sm hover:bg-yellow-400 transition-colors text-xs tracking-widest">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-neutral-800 text-white font-bold uppercase py-3 rounded-sm hover:bg-neutral-700 transition-colors text-xs tracking-widest">Cancel</button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Name (KR)</span>
                  <input 
                    type="text" 
                    value={editStaff.name || ''}
                    onChange={(e) => setEditStaff({...editStaff, name: e.target.value})}
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Name (EN)</span>
                  <input 
                    type="text" 
                    value={editStaff.nameEn || ''}
                    onChange={(e) => setEditStaff({...editStaff, nameEn: e.target.value})}
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                    placeholder="NAME IN ENGLISH"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Role</span>
                  <input 
                    type="text" 
                    value={editStaff.role || ''}
                    onChange={(e) => setEditStaff({...editStaff, role: e.target.value})}
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                    required
                  />
                </label>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Profile Image URL</span>
                  <input 
                    type="text" 
                    value={editStaff.photoUrl || ''}
                    onChange={(e) => setEditStaff({...editStaff, photoUrl: e.target.value})}
                    className="mt-1 block w-full bg-black border border-neutral-800 rounded-sm p-3 text-white focus:border-yellow-500 outline-none"
                  />
                </label>
                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-1 bg-yellow-500 text-black font-bold uppercase py-3 rounded-sm hover:bg-yellow-400 transition-colors text-xs tracking-widest">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-neutral-800 text-white font-bold uppercase py-3 rounded-sm hover:bg-neutral-700 transition-colors text-xs tracking-widest">Cancel</button>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-end">
            <button 
              onClick={() => {
                setEditProject({category: ProjectCategory.FILM, stillUrls: []});
                setEditStaff({});
                setIsEditing(true);
              }}
              className="bg-yellow-500 text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2 text-xs"
            >
              <i className="fas fa-plus"></i> New {activeTab === 'projects' ? 'Project' : 'Staff'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeTab === 'projects' ? (
              projects.map(p => (
                <div key={p.id} className="bg-neutral-900/40 p-5 rounded-sm border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-6">
                    <img src={formatImageUrl(p.posterUrl)} className="w-12 h-16 object-cover rounded shadow-lg" alt="" />
                    <div>
                      <h4 className="text-white font-serif text-lg">{p.title} <span className="text-neutral-500 text-sm font-sans font-light">{p.titleEn}</span></h4>
                      <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">{p.category} — {p.year}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { setEditProject(p); setIsEditing(true); }} className="text-neutral-400 hover:text-yellow-500 p-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => { if(window.confirm("Delete?")) onUpdateProjects(projects.filter(proj => proj.id !== p.id)) }} className="text-neutral-400 hover:text-red-500 p-2">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              staff.map(s => (
                <div key={s.id} className="bg-neutral-900/40 p-5 rounded-sm border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-6">
                    <img src={formatImageUrl(s.photoUrl)} className="w-12 h-16 object-cover rounded shadow-lg" alt="" />
                    <div>
                      <h4 className="text-white font-serif text-lg">{s.name} <span className="text-neutral-500 text-sm font-sans font-light">{s.nameEn}</span></h4>
                      <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">{s.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { setEditStaff(s); setIsEditing(true); }} className="text-neutral-400 hover:text-yellow-500 p-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => { if(window.confirm("Delete?")) onUpdateStaff(staff.filter(st => st.id !== s.id)) }} className="text-neutral-400 hover:text-red-500 p-2">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
