import { Creator } from './creator';

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
  creator: Creator;
  createdAt: Date;
  comments: Comment[];
}
