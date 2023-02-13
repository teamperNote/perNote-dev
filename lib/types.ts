export interface IStory {
  id: string;
  imgUrl: string[];
  createdAt: string;
  title: string;
  liked: boolean;
  likeCount: number;
  viewCount: number;
  body: string;
  tags: string[];
}
