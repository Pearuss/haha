export interface Author {
  id: number;
  ssoId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | null;
  nickname: string | null;
  authorName: string | null;
  status: number | null;
  role: number;
}
