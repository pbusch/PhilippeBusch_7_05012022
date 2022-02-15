export interface Post {
  id?: string;
  title: string;
  imgUrl: string;
  userId: string;
  user: { name: string };
  createdAt: Date;
  //updatedAt: Date;
}
