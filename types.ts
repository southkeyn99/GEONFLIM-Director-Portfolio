
export enum ProjectCategory {
  DIRECTING = 'Directing',
  AI_FILM = 'AI Film',
  PRODUCING = 'AD & Producing',
  CINEMATOGRAPHY = 'Cinematography',
  COMMERCIAL = 'Commercial'
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  titleEn?: string;
  year: string;
  role: string;
  description?: string;
  posterUrl?: string;
  awards?: string;
  awardsList?: string[];
  isAI?: boolean;
  isFeature?: boolean;
  link?: string;
  synopsis?: string;
  stillPhotos?: string[];
  genre?: string;
  runtime?: string;
  aspectRatio?: string;
}

export interface DirectorInfo {
  name: string;
  nameEn: string;
  title: string;
  phone: string;
  email: string;
  instagram: string;
  youtube: string;
  adPortfolio: string;
  bio: string;
  profileImageUrl: string;
}
