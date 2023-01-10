interface ICategory {
  id: number;
  value: string;
  text: string;
}

export const genderArray: ICategory[] = [
  {
    id: 0,
    value: "f",
    text: "매우 여성적인",
  },
  {
    id: 1,
    value: "fUni",
    text: "여성적인",
  },
  {
    id: 2,
    value: "uni",
    text: "중성적인",
  },
  {
    id: 3,
    value: "mUni",
    text: "남성적인",
  },
  {
    id: 4,
    value: "m",
    text: "매우 남성적인",
  },
];

export const concentrationArray: ICategory[] = [
  {
    id: 0,
    value: "daily",
    text: "데일리",
  },
  {
    id: 1,
    value: "specialParty",
    text: "특별한 날",
  },
];

export const seasonArray: ICategory[] = [
  {
    id: 0,
    value: "spring",
    text: "봄",
  },
  {
    id: 1,
    value: "summer",
    text: "여름",
  },
  {
    id: 2,
    value: "autumn",
    text: "가을",
  },
  {
    id: 3,
    value: "winter",
    text: "겨울",
  },
];

export const colorArray = [
  {
    id: 0,
    value: "red",
    text: "빨간색",
    color: "#FF0000",
  },
  {
    id: 1,
    value: "orange",
    text: "주황색",
    color: "#FF7A00",
  },
  {
    id: 2,
    value: "yellow",
    text: "노란색",
    color: "#FFE600",
  },
  {
    id: 3,
    value: "green",
    text: "초록색",
    color: "#00A61B",
  },
  {
    id: 4,
    value: "blue",
    text: "파란색",
    color: "#0500FF",
  },
  {
    id: 5,
    value: "pink",
    text: "분홍색",
    color: "#FF9999",
  },
  {
    id: 6,
    value: "purple",
    text: "보라색",
    color: "#9816D4",
  },
  {
    id: 7,
    value: "black",
    text: "검은색",
    color: "#000000",
  },
  {
    id: 8,
    value: "white",
    text: "흰 색",
    color: "#000000",
  },
  {
    id: 9,
    value: "brown",
    text: "갈 색",
    color: "#D9D9D9",
  },
];

export const personalityArray: ICategory[] = [
  {
    id: 0,
    value: "vivid",
    text: "생동감있는",
  },
  {
    id: 1,
    value: "delicate",
    text: "섬세한",
  },
  {
    id: 2,
    value: "sensual",
    text: "관능적인",
  },
  {
    id: 3,
    value: "comfortable",
    text: "편안한",
  },
  {
    id: 4,
    value: "calm",
    text: "차분한",
  },
  {
    id: 5,
    value: "adventurous",
    text: "모험적인",
  },
  {
    id: 6,
    value: "masculine",
    text: "남성적인",
  },
  {
    id: 7,
    value: "feminine",
    text: "여성적인",
  },
  {
    id: 8,
    value: "pure",
    text: "순수한",
  },
  {
    id: 9,
    value: "mature",
    text: "성숙한",
  },
  {
    id: 10,
    value: "purehearted",
    text: "청순한",
  },
  // {
  //   id: 11,
  //   value: "cotton",
  //   text: "활기찬",
  // },
];

export const charArray: ICategory[] = [
  {
    id: 0,
    value: "intense",
    text: "강렬한",
  },
  {
    id: 1,
    value: "fresh",
    text: "신선한",
  },
  {
    id: 2,
    value: "deep",
    text: "깊은",
  },
  {
    id: 3,
    value: "rich",
    text: "풍부한",
  },
  {
    id: 4,
    value: "light",
    text: "경쾌한",
  },
  {
    id: 5,
    value: "clean",
    text: "깨끗한",
  },
  {
    id: 6,
    value: "luxurious",
    text: "고급스러운",
  },
  // {
  //   id: 7,
  //   value: "",
  //   text: "모던한",
  // },
  // {
  //   id: 8,
  //   value: "",
  //   text: "산뜻한",
  // },
];

export const categoryArray: ICategory[] = [
  {
    id: 0,
    value: "note",
    text: "노트",
  },
  {
    id: 1,
    value: "brand",
    text: "브랜드",
  },
  {
    id: 2,
    value: "personality",
    text: "성격",
  },
  {
    id: 3,
    value: "characteristics",
    text: "특징",
  },
];

export const noteArray: ICategory[] = [
  {
    id: 0,
    value: "amber",
    text: "AMBER",
  },
  {
    id: 1,
    value: "aquatic",
    text: "AQUATIC",
  },
  {
    id: 2,
    value: "woody",
    text: "WOODY",
  },
  {
    id: 3,
    value: "aromatic",
    text: "AROMATIC",
  },
  {
    id: 4,
    value: "chypre",
    text: "CHYPRE",
  },
  {
    id: 5,
    value: "citrus",
    text: "CITRUS",
  },
  {
    id: 6,
    value: "floral",
    text: "FLORAL",
  },
  {
    id: 7,
    value: "frutiy",
    text: "FRUTIY",
  },
  {
    id: 8,
    value: "green",
    text: "GREEN",
  },
  {
    id: 9,
    value: "animalic",
    text: "ANIMALIC",
  },
  {
    id: 10,
    value: "spicy",
    text: "SPICY",
  },
  {
    id: 11,
    value: "cotton",
    text: "COTTON",
  },
  {
    id: 12,
    value: "flourere",
    text: "FOURERE",
  },
  {
    id: 13,
    value: "etc",
    text: "E.T.C",
  },
];

export const alphabetArray: ICategory[] = [
  {
    id: 0,
    value: "a",
    text: "A",
  },
  {
    id: 1,
    value: "b",
    text: "B",
  },
  {
    id: 2,
    value: "c",
    text: "C",
  },
  {
    id: 3,
    value: "d",
    text: "D",
  },
  {
    id: 4,
    value: "e",
    text: "E",
  },
  {
    id: 5,
    value: "f",
    text: "F",
  },
  {
    id: 6,
    value: "g",
    text: "G",
  },
  {
    id: 7,
    value: "h",
    text: "H",
  },
  {
    id: 8,
    value: "i",
    text: "I",
  },
  {
    id: 9,
    value: "j",
    text: "J",
  },
  {
    id: 10,
    value: "k",
    text: "K",
  },
  {
    id: 11,
    value: "l",
    text: "L",
  },
  {
    id: 12,
    value: "m",
    text: "M",
  },
  {
    id: 13,
    value: "n",
    text: "N",
  },
  {
    id: 14,
    value: "o",
    text: "O",
  },
  {
    id: 15,
    value: "p",
    text: "P",
  },
  {
    id: 16,
    value: "q",
    text: "Q",
  },
  {
    id: 17,
    value: "r",
    text: "R",
  },
  {
    id: 18,
    value: "s",
    text: "S",
  },
  {
    id: 19,
    value: "t",
    text: "T",
  },
  {
    id: 20,
    value: "u",
    text: "U",
  },
  {
    id: 21,
    value: "v",
    text: "V",
  },
  {
    id: 22,
    value: "w",
    text: "W",
  },
  {
    id: 23,
    value: "x",
    text: "X",
  },
  {
    id: 24,
    value: "y",
    text: "Y",
  },
  {
    id: 25,
    value: "z",
    text: "Z",
  },
];

export const sortArray: ICategory[] = [
  {
    id: 0,
    value: "latest",
    text: "최신순",
  },
  {
    id: 1,
    value: "lowPrice",
    text: "낮은 가격순",
  },
  {
    id: 2,
    value: "highPrice",
    text: "높은 가격순",
  },
  {
    id: 3,
    value: "view",
    text: "조회순",
  },
  {
    id: 4,
    value: "like",
    text: "좋아요순",
  },
];
