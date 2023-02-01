// 천 단위마다 쉼표 찍어주는 코드
export const numberComma = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 천 이상 숫자 줄일 때 사용
export const overThousand = (num) => {
  if (num >= 1000) {
    return "999+";
  } else {
    return num;
  }
};

// 날짜 데이터 포맷
export const dateFormat = (num: string) => {
  return `${num.substr(0, 4)}.${num.substr(5, 2)}.
  ${num.substr(8, 2)}`;
};
