export interface Tag {
  id: number;
  name: string;
  slug: string;
  type?: string | null;
  priority: number;
  createdAt: string;
}
