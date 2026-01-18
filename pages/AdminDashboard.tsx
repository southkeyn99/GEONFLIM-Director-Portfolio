
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
    const apiKey = (window as any).process?.env?.API_KEY || '';
    if (!apiKey) return alert("API Key is missing in the environment.");

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a professional, cinematic synopsis (around 500 characters) for a film titled "${editProject.title}". Role: ${editProject.role}. Category: ${editProject.category}.`,
      });
      setEditProject({ ...editProject, synopsis: response.text?.trim() });
    } catch (err) {
      console.error(err);
      alert("AI generation failed.");
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

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-center py-16 gap-8 border-b border-white/5 mb-12">
        <div>
          <h1 className="text-4xl font-serif text-white tracking-widest uppercase">Dashboard</h1>
          <p className="text-neutral-500 mt-2 text-sm">Fine-tune your visual legacy.</p>
        </div>
        <div className="flex bg-neutral-900/50 p-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
          {(['projects', 'staff', 'director'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setIsEditing(false); }}
              className={`px-8 py-2.5 rounded-md transition-all text-[10px] uppercase tracking-[0.2em] font-bold ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'director' ? (
        <div className="bg-neutral-900/40 p-10 rounded-sm border border-white/5 animate-in fade-in">
          <h2 className="text-2xl font-serif mb-10 text-white">Director Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); onUpdateDirector(editDirector); alert("Updated!"); }} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { label: 'Name (KR)', key: 'name' },
                { label: 'Title', key: 'title' },
                { label: 'Profile Image URL', key: 'profileImageUrl' }
              ].map(f => (
                <label key={f.key} className="block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2 block">{f.label}</span>
                  <input 
                    type="text" 
                    value={(editDirector as any)[f.key]}
                    onChange={(e) => setEditDirector({...editDirector, [f.key]: e.target.value})}
                    className="w-full bg-black border border-neutral-800 rounded-sm p-4 text-white focus:border-yellow-500 outline-none transition-colors"
                  />
                </label>
              ))}
            </div>
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2 block">Biography</span>
                <textarea 
                  rows={6}
                  value={editDirector.bio}
                  onChange={(e) => setEditDirector({...editDirector, bio: e.target.value})}
                  className="w-full bg-black border border-neutral-800 rounded-sm p-4 text-white focus:border-yellow-500 outline-none resize-none transition-colors"
                ></textarea>
              </label>
              <button type="submit" className="w-full bg-yellow-500 text-black font-bold uppercase py-5 rounded-sm hover:bg-yellow-400 transition-all text-xs tracking-widest shadow-xl">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      ) : isEditing ? (
        <div className="bg-neutral-900/40 p-10 rounded-sm border border-white/5 animate-in slide-in-from-bottom-6">
          <h2 className="text-2xl font-serif mb-10 text-white">Entry Details</h2>
          {activeTab === 'projects' ? (
            <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Title (KR)</span>
                  <input type="text" value={editProject.title || ''} onChange={(e) => setEditProject({...editProject, title: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" required />
                </label>
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Title (EN)</span>
                  <input type="text" value={editProject.titleEn || ''} onChange={(e) => setEditProject({...editProject, titleEn: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Year</span>
                      <input type="text" value={editProject.year || ''} onChange={(e) => setEditProject({...editProject, year: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" />
                    </label>
                    <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Category</span>
                      <select value={editProject.category || ProjectCategory.FILM} onChange={(e) => setEditProject({...editProject, category: e.target.value as ProjectCategory})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none">
                        {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </label>
                </div>
              </div>
              <div className="space-y-6">
                <label className="block">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Synopsis</span>
                    <button type="button" onClick={generateAIDescription} className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest border border-yellow-500/30 px-2 py-0.5 hover:bg-yellow-500 hover:text-black">AI Writer</button>
                  </div>
                  <textarea rows={5} value={editProject.synopsis || ''} onChange={(e) => setEditProject({...editProject, synopsis: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none resize-none"></textarea>
                </label>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-yellow-500 text-black font-bold uppercase py-4 text-xs tracking-widest">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-neutral-800 text-white font-bold uppercase py-4 text-xs tracking-widest">Cancel</button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Name (KR)</span>
                  <input type="text" value={editStaff.name || ''} onChange={(e) => setEditStaff({...editStaff, name: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" required />
                </label>
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Name (EN)</span>
                  <input type="text" value={editStaff.nameEn || ''} onChange={(e) => setEditStaff({...editStaff, nameEn: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" />
                </label>
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Role</span>
                  <input type="text" value={editStaff.role || ''} onChange={(e) => setEditStaff({...editStaff, role: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" required />
                </label>
              </div>
              <div className="space-y-6">
                <label className="block"><span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Photo URL</span>
                  <input type="text" value={editStaff.photoUrl || ''} onChange={(e) => setEditStaff({...editStaff, photoUrl: e.target.value})} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-yellow-500 outline-none" />
                </label>
                <button type="submit" className="w-full bg-yellow-500 text-black font-bold uppercase py-5 text-xs tracking-widest">Save Staff</button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button 
              onClick={() => { setEditProject({category: ProjectCategory.FILM, stillUrls: []}); setEditStaff({}); setIsEditing(true); }}
              className="bg-yellow-500 text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all text-xs"
            >
              Add New {activeTab === 'projects' ? 'Project' : 'Collaborator'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeTab === 'projects' ? (
              projects.map(p => (
                <div key={p.id} className="bg-neutral-900/30 p-4 border border-white/5 flex items-center justify-between group hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={formatImageUrl(p.posterUrl)} className="w-10 h-14 object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                    <div>
                      <h4 className="text-white font-serif text-lg">{p.title} <span className="text-neutral-600 text-xs font-sans tracking-widest uppercase ml-2">{p.titleEn}</span></h4>
                      <p className="text-neutral-600 text-[9px] uppercase tracking-widest mt-1">{p.category} — {p.year}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditProject(p); setIsEditing(true); }} className="text-neutral-500 hover:text-yellow-500 p-3"><i className="fas fa-edit"></i></button>
                    <button onClick={() => { if(window.confirm("Delete?")) onUpdateProjects(projects.filter(proj => proj.id !== p.id)) }} className="text-neutral-500 hover:text-red-500 p-3"><i className="fas fa-trash"></i></button>
                  </div>
                </div>
              ))
            ) : (
              staff.map(s => (
                <div key={s.id} className="bg-neutral-900/30 p-4 border border-white/5 flex items-center justify-between group hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={formatImageUrl(s.photoUrl)} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                    <div>
                      <h4 className="text-white font-serif text-lg">{s.name} <span className="text-neutral-600 text-xs font-sans tracking-widest uppercase ml-2">{s.nameEn}</span></h4>
                      <p className="text-neutral-600 text-[9px] uppercase tracking-widest mt-1">{s.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditStaff(s); setIsEditing(true); }} className="text-neutral-500 hover:text-yellow-500 p-3"><i className="fas fa-edit"></i></button>
                    <button onClick={() => { if(window.confirm("Delete?")) onUpdateStaff(staff.filter(st => st.id !== s.id)) }} className="text-neutral-500 hover:text-red-500 p-3"><i className="fas fa-trash"></i></button>
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
