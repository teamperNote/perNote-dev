interface ICategory {
  id: number;
  value: string;
  url?: string;
  text: string;
  color?: string;
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

export const colorArray: ICategory[] = [
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
    value: "sensual",
    text: "관능적인",
  },
  {
    id: 1,
    value: "adventurous",
    text: "모험적인",
  },
  {
    id: 2,
    value: "vivid",
    text: "생동감있는",
  },
  {
    id: 3,
    value: "delicate",
    text: "섬세한",
  },
  {
    id: 4,
    value: "mature",
    text: "성숙한",
  },
  {
    id: 5,
    value: "pure",
    text: "순수한",
  },
  {
    id: 6,
    value: "calm",
    text: "차분한",
  },
  {
    id: 7,
    value: "purehearted",
    text: "청순한",
  },
  {
    id: 8,
    value: "comfortable",
    text: "편안한",
  },
  {
    id: 9,
    value: "masculine",
    text: "남성적인",
  },
  {
    id: 10,
    value: "feminine",
    text: "여성적인",
  },
];

export const charArray: ICategory[] = [
  {
    id: 0,
    value: "intense",
    text: "강렬한",
  },
  {
    id: 1,
    value: "light",
    text: "경쾌한",
  },
  {
    id: 2,
    value: "luxurious",
    text: "고급스러운",
  },
  {
    id: 3,
    value: "deep",
    text: "깊은",
  },
  {
    id: 4,
    value: "clean",
    text: "깨끗한",
  },
  {
    id: 5,
    value: "fresh",
    text: "신선한",
  },
  {
    id: 6,
    value: "rich",
    text: "풍부한",
  },
];

export const noteArray: ICategory[] = [
  {
    id: 0,
    value: "aquatic",
    text: "AQUATIC",
  },
  {
    id: 1,
    value: "aromatic",
    text: "AROMATIC",
  },
  {
    id: 2,
    value: "citrus",
    text: "CITRUS",
  },
  {
    id: 3,
    value: "floral",
    text: "FLORAL",
  },
  {
    id: 4,
    value: "frutiy",
    text: "FRUTIY",
  },
  {
    id: 5,
    value: "green",
    text: "GREEN",
  },
  {
    id: 6,
    value: "musk",
    text: "MUSK",
  },
  {
    id: 7,
    value: "spicy",
    text: "SPICY",
  },
  {
    id: 8,
    value: "wild",
    text: "WILD",
  },
  {
    id: 9,
    value: "woody",
    text: "WOODY",
  },
];

export const alphabetArray: ICategory[] = [
  {
    id: 0,
    value: "A",
    text: "A",
  },
  {
    id: 1,
    value: "B",
    text: "B",
  },
  {
    id: 2,
    value: "C",
    text: "C",
  },
  {
    id: 3,
    value: "D",
    text: "D",
  },
  {
    id: 4,
    value: "E",
    text: "E",
  },
  {
    id: 5,
    value: "F",
    text: "F",
  },
  {
    id: 6,
    value: "G",
    text: "G",
  },
  {
    id: 7,
    value: "H",
    text: "H",
  },
  {
    id: 8,
    value: "I",
    text: "I",
  },
  {
    id: 9,
    value: "J",
    text: "J",
  },
  {
    id: 10,
    value: "K",
    text: "K",
  },
  {
    id: 11,
    value: "L",
    text: "L",
  },
  {
    id: 12,
    value: "M",
    text: "M",
  },
  {
    id: 13,
    value: "N",
    text: "N",
  },
  {
    id: 14,
    value: "O",
    text: "O",
  },
  {
    id: 15,
    value: "P",
    text: "P",
  },
  {
    id: 16,
    value: "Q",
    text: "Q",
  },
  {
    id: 17,
    value: "R",
    text: "R",
  },
  {
    id: 18,
    value: "S",
    text: "S",
  },
  {
    id: 19,
    value: "T",
    text: "T",
  },
  {
    id: 20,
    value: "U",
    text: "U",
  },
  {
    id: 21,
    value: "V",
    text: "V",
  },
  {
    id: 22,
    value: "W",
    text: "W",
  },
  {
    id: 23,
    value: "X",
    text: "X",
  },
  {
    id: 24,
    value: "Y",
    text: "Y",
  },
  {
    id: 25,
    value: "Z",
    text: "Z",
  },
];

export const categoryArray: ICategory[] = [
  {
    id: 0,
    value: "note",
    url: `note/${noteArray[0].value}`,
    text: "노트",
  },
  {
    id: 1,
    value: "brand",
    url: `brand/0`,
    text: "브랜드",
  },
  {
    id: 2,
    value: "personality",
    url: `personality/${personalityArray[0].value}`,
    text: "나의 성격",
  },
  {
    id: 3,
    value: "feature",
    url: `feature/${charArray[0].value}`,
    text: "향수의 특징",
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
