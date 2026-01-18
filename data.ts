
import { Project, ProjectCategory, Staff, TimelineEvent } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    category: ProjectCategory.FILM,
    title: 'Shadows of the Past',
    year: '2023',
    role: 'Director / Writer',
    description: 'A neo-noir thriller set in the neon-drenched streets of a forgotten city.',
    posterUrl: 'https://picsum.photos/seed/shadows/600/800',
    stillUrls: ['https://picsum.photos/seed/s1/1200/800', 'https://picsum.photos/seed/s2/1200/800']
  },
  {
    id: '2',
    category: ProjectCategory.AI_FILM,
    title: 'Ethereal Circuit',
    year: '2024',
    role: 'AI Director',
    description: 'An experimental piece exploring the intersection of human consciousness and machine logic.',
    posterUrl: 'https://picsum.photos/seed/circuit/600/800',
    stillUrls: ['https://picsum.photos/seed/c1/1200/800', 'https://picsum.photos/seed/c2/1200/800']
  },
  {
    id: '3',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: 'Silent Valley',
    year: '2022',
    role: 'Cinematographer',
    description: 'Visual exploration of remote landscapes and the silence of nature.',
    posterUrl: 'https://picsum.photos/seed/valley/600/800',
    stillUrls: ['https://picsum.photos/seed/v1/1200/800', 'https://picsum.photos/seed/v2/1200/800']
  },
  {
    id: '4',
    category: ProjectCategory.COMMERCIAL,
    title: 'The Modern Drive',
    year: '2024',
    role: 'Director',
    description: 'High-octane commercial campaign for a luxury electric vehicle.',
    posterUrl: 'https://picsum.photos/seed/drive/600/800',
    stillUrls: ['https://picsum.photos/seed/d1/1200/800', 'https://picsum.photos/seed/d2/1200/800']
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: 's1',
    name: 'Eleanor Vance',
    role: 'Creative Producer',
    photoUrl: 'https://picsum.photos/seed/eleanor/400/400'
  },
  {
    id: 's2',
    name: 'Julian Black',
    role: 'Lead Editor',
    photoUrl: 'https://picsum.photos/seed/julian/400/400'
  },
  {
    id: 's3',
    name: 'Sarah Chen',
    role: 'Sound Designer',
    photoUrl: 'https://picsum.photos/seed/sarah/400/400'
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { id: 't1', year: '2015', title: 'Graduation', description: 'Earned MFA in Film Production from NYU Tisch School of the Arts.' },
  { id: 't2', year: '2018', title: 'Breakthrough Short', description: 'Directed "Neon Pulse", which won Best Short Film at the Independent Film Awards.' },
  { id: 't3', year: '2021', title: 'First Feature', description: 'Released "The Echo Room" to critical acclaim globally.' },
  { id: 't4', year: '2024', title: 'AI Exploration', description: 'Pioneered generative AI workflows in professional narrative filmmaking.' }
];
