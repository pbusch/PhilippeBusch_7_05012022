import { Creator } from './creator';
export interface Comment {
  id: string;
  commentText: string;
  creator: Creator;
  createdAt: Date;
}
