import { Author } from './author';
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
  shortContent: string | null;
  content: string | null;
  thumbnail: string | null;
  comments: any;
  status: number | null;
  authorId: number;
  source: string | null;
  stopShareAt: Date | null;
  approvalId: number | null;
  publishedAt: string | number | Date;
  viewCount: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  mainCatId: number | null;
  mainCategory: Category | null;
  author: Author | null;
  articleCategories: ArticleCategory;
  articleTags: ArticleTag;
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
  mainCategory: number;
  relatedCategory: string[];
  image: string;
  public: boolean;
}
