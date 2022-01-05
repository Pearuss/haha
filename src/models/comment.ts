export interface IComment {
  id: number;
  userId: number;
  articleId: number;
  parentId: number;
  quoteId: number;
  comment: string;
  status: number;
  liked: number;
  user: any[];
}
