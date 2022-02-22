export interface Comment {
  id: string;
  commentText: string;
  user: { name: string };
  createdAt: Date;
  userId: string;
}
