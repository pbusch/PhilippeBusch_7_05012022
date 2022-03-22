import { Creator } from './creator';
import { Comment } from './comment';
import { Like } from './like';

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
  creator: Creator;
  createdAt: Date;
  comments: Comment[];
  likes: Like[];
}
