
export enum ProjectCategory {
  FILM = 'Film',
  AI_FILM = 'AI Film',
  CINEMATOGRAPHY = 'Cinematography',
  COMMERCIAL = 'Commercial'
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  titleEn?: string; // 영어 제목 추가
  year: string;
  role: string;
  description: string;
  posterUrl: string;
  stillUrls: string[];
  genre?: string;
  runningTime?: string;
  awards?: string;
  synopsis?: string;
}

export interface Staff {
  id: string;
  name: string;
  nameEn?: string; // 영어 이름 추가
  role: string;
  photoUrl: string;
  bio?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface DirectorInfo {
  name: string;
  title: string;
  bio: string;
  quote: string;
  profileImageUrl: string;
}
