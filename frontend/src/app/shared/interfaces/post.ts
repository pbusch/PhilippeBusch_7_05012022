import { Creator } from './creator';
import { Comment } from './comment';

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
  creator: Creator;
  createdAt: Date;
  comments: Comment[];
}
