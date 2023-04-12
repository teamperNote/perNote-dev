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

export interface ILowest {
  domain: string;
  name: string;
  price: string;
  url: string;
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
    lowest: ILowest[];
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

export interface UserType {
  birth: string;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  snsId: string;
  snsType: string;
  updatedAt: string;
}

export interface SignupType {
  isActive: string;
}

export interface InputType {
  htmlFor: string;
  labelContent: string;
  type: string;
  value: string;
  setStateValue: (e: any) => void;
}

export interface RadioType {
  label: string;
  id: object;
  name: string;
  text: object;
}
