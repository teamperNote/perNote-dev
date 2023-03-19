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

export interface IPerfume {
  isLoading: boolean;
  data: {
    id: string;
    imgUrl: string;
    brand_eng: string;
    name_eng: string;
    note: string[];
    personality: string[];
    feature: string[];
    top: string;
    middle: string;
    bottom: string;
    liked: boolean;
    likeCount: number;
    viewCount: number;
    similars: {
      id: string;
      imgUrl: string;
      name_eng: string;
    }[];
  } | null;
}

export interface IChosen {
  gender: string;
  concentration: string;
  season: string;
  color: string;
  personality: string;
  feature: string;
}

export interface ILiked {
  id: string;
  imgUrl: string;
  createdAt?: string;
  name_eng: string;
  brand_eng: string;
  note: string[];
  top: string;
  middle: string;
  bottom: string;
}
