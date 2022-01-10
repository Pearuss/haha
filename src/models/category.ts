export interface Category {
  id: number;
  parentId: number;
  slug: string;
  name: string;
  status: number;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string | null;
  metaId: string | null;
}
