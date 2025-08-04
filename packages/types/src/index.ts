// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  isPro: boolean;
  createdAt: Date;
}

// Site types
export interface Site {
  id: string;
  name: string;
  slug: string;
  description?: string;
  template?: string;
  userId: string;
  domain?: string;
  isPublic: boolean;
  createdAt: Date;
}

// Page types
export interface Page {
  id: string;
  title: string;
  siteId: string;
  components: Component[];
}

// Component types
export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  style: ComponentStyle;
  orderIndex: number;
  parentId?: string;
  pageId: string;
}

export type ComponentType =
  | 'text'
  | 'image'
  | 'project'
  | 'testimonial'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'social'
  | 'resume';

export interface ComponentStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  display?: 'block' | 'inline' | 'flex';
  flexDirection?: 'row' | 'column';
  justifyContent?: string;
  alignItems?: string;
}

// Analytics types
export interface AnalyticsEvent {
  id: string;
  siteId: string;
  type: 'page_view' | 'button_click' | 'form_submit' | 'download';
  data: Record<string, any>;
  createdAt: Date;
}

// Resume types
export interface ResumeUpload {
  id: string;
  userId: string;
  fileUrl: string;
  parsed: ParsedResume;
  createdAt: Date;
}

export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  experience?: WorkExperience[];
  education?: Education[];
  skills?: string[];
  projects?: Project[];
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  imageUrl?: string;
}

// AI Content types
export interface AIContentRequest {
  type: 'bio' | 'headline' | 'project_description' | 'skill_summary';
  content: string;
  tone: 'professional' | 'confident' | 'concise' | 'creative' | 'friendly';
  context?: string;
}

export interface AIContentResponse {
  original: string;
  improved: string;
  suggestions?: string[];
}

// Template types
export interface Template {
  id: string;
  name: string;
  category: 'minimal' | 'bold' | 'creative' | 'techy' | 'elegant';
  preview: string;
  components: Omit<Component, 'id' | 'pageId'>[];
  theme: Theme;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateSiteRequest {
  name: string;
  slug: string;
  description?: string;
  template?: string;
  domain?: string;
  isPublic?: boolean;
}

export interface UpdateComponentRequest {
  props?: Record<string, any>;
  style?: Partial<ComponentStyle>;
  orderIndex?: number;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  isPro: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
