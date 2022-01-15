import { Category } from './category';
import { Tag } from './tag';

export interface ArticleCategory {
  catId: number;
  articleId: number;
  status: number | null;
  category: Category;
}

export interface ArticleTag {
  articleId: number;
  tagId: number;
  status: number;
  tag: Tag | null;
}

export interface Article {
  id: number;
  partialId: number | null;
  sectionNo: number | null;
  title: string;
  slug: string | null;
  short_content: string | null;
  content: string | null;
  thumbnail: string | null;
  comments: any;
  status: number | null;
  author_id: number;
  source: string | null;
  stopShareAt: Date | null;
  countComment: string | null;
  approvalId: number | null;
  published_at: string | number | Date;
  view_count: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  mainCatId: number | null;
  mainCategory: string | null;
  authorFirstname: string | null;
  authorLastname: string | null;
  articleCategories: ArticleCategory;
  articleTags: ArticleTag;
  slugCategory: string | null;
}

export interface INewPost {
  title: string;
  shortContent: string;
  content: string;
  status: Boolean;
  reason: string;
  sectionNo: number;
  partialId: number;
  tag: string[];
  mainCategory: number | null;
  relatedCategory: string[];
  image: string;
  public: boolean;
}
