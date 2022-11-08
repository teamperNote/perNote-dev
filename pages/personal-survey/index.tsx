import { useRouter } from 'next/router';
import { useState } from 'react';
import * as style from './style';

const PersonalScent = () => {
  const router = useRouter();
  const page = router.query.page as string
  const [pageNumber, setPageNumber] = useState(parseInt(page));

  const onNextClick = () => {
    setPageNumber(pageNumber + 1);
  }
  
  const onSubmit = () => {
    router.push('/personal-scent')
  }

  return (
    <style.PersonalScentContainer>
        <style.PersonalScentBox>
          {pageNumber == 0 &&
            <>
              <style.PersonalScentTitle>Personal Scent</style.PersonalScentTitle>
              <style.PersonalScentText>자신만의 향을 찾기 어려우셨나요?<br/>간단한 질문으로 여러분의 향을 찾아드립니다.</style.PersonalScentText>
              <style.StartBtn onClick={onNextClick}><style.StartSpan>START</style.StartSpan></style.StartBtn>
            </>
          }
          {pageNumber == 1 &&
            <>
              <style.SubTitle>어느 성별의 향을 원하시나요?</style.SubTitle>
              <style.CardContainer>
                {gender.map((data) => (
                  <style.Card key={data.id} onClick={onNextClick}>
                    <style.CardContent>{data.content}</style.CardContent>
                  </style.Card>
                ))}
              </style.CardContainer>
            </>
          }
          {pageNumber == 2 &&
            <>
              <style.SubTitle>어느 때에 향수를 뿌리고 싶으신가요?</style.SubTitle>
              <style.CardContainer>
                {day.map((data) => (
                  <style.Card key={data.id} onClick={onNextClick}>
                    <style.CardContent>{data.content}</style.CardContent>
                  </style.Card>
                ))}
              </style.CardContainer>
            </>
          }
          {pageNumber == 3 &&
            <>
              <style.SubTitle>당신이 좋아하는 계절은 무엇인가요?</style.SubTitle>
              <style.CardContainer>
                {season.map((data) => (
                  <style.Card key={data.id} onClick={onNextClick}>
                    <style.CardContent>{data.content}</style.CardContent>
                  </style.Card>
                ))}
              </style.CardContainer>
            </>
          }
          {pageNumber == 4 &&
            <>
              <style.SubTitle margin_B='67px'>당신이 좋아하는 색은 무엇인가요?</style.SubTitle>
              <style.ColorCardContainer>
                {color.map((data) => (
                  <style.ColorCard key={data.id} onClick={onNextClick}>
                    <style.Color background={data.color}/>
                    <style.ColorCardContent>{data.content}</style.ColorCardContent>
                  </style.ColorCard>
                ))}
              </style.ColorCardContainer>
            </>
          }
          {pageNumber == 5 &&
            <>
              <style.SubTitle margin_B='92px'>당신을 가장 잘 표현한 단어는 무엇인가요?</style.SubTitle>
              <style.TextCardContainer>
                {express.map((data) => (
                  <style.TextCard key={data.id} onClick={onNextClick}>
                    <style.TextCardContent>{data.content}</style.TextCardContent>
                  </style.TextCard>
                ))}
              </style.TextCardContainer>
            </>
          }
          {pageNumber == 6 &&
            <>  
              <style.SubTitle margin_B='92px'>당신이 원하는 향수는 어떤 느낌인가요?</style.SubTitle>
              <style.TextCardContainer>
                {want.map((data) => (
                  <style.TextCard key={data.id} onClick={onSubmit}>
                    <style.TextCardContent>{data.content}</style.TextCardContent>
                  </style.TextCard>
                ))}
              </style.TextCardContainer>
            </>
          }
        </style.PersonalScentBox>
    </style.PersonalScentContainer>
  )
}

const gender = [
  {
    id: 0,
    content: 'WOMAN'
  },
  {
    id: 1,
    content: 'MAN'
  },
  {
    id: 2,
    content: 'UNI'
  },
];

const day = [
  {
    id: 0,
    content: '데일리'
  },
  {
    id: 1,
    content: '특별한 날'
  },
];

const season = [
  {
    id: 0,
    content: '봄'
  },
  {
    id: 1,
    content: '여름'
  },
  {
    id: 2,
    content: '가을'
  },
  {
    id: 3,
    content: '겨울'
  },
];

const color = [
  {
    id: 0,
    content: '빨간색',
    color: "#ff0000"
  },
  {
    id: 1,
    content: '주황색',
    color: "#ff7f00"
  },
  {
    id: 2,
    content: '노란색',
    color: "#ffff00"
  },
  {
    id: 3,
    content: '초록색',
    color: "#ff7f00"
  },
  {
    id: 4,
    content: '파란색',
    color: "#ff7f00"
  },
  {
    id: 5,
    content: '분홍색',
    color: "#ff7f00"
  },
  {
    id: 6,
    content: '보라색',
    color: "#ff7f00"
  },
  {
    id: 7,
    content: '검은색',
    color: "#ff7f00"
  },
  {
    id: 8,
    content: '흰 색',
    color: "#ff7f00"
  },
  {
    id: 9,
    content: '갈 색',
    color: "#ff7f00"
  },
];

const express = [
  {
    id: 0,
    content: '생동감 있는',
  },
  {
    id: 1,
    content: '섬세한',
  },
  {
    id: 2,
    content: '관능적인',
  },
  {
    id: 3,
    content: '편안한',
  },
  {
    id: 4,
    content: '차분한',
  },
  {
    id: 5,
    content: '모험적인',
  },
  {
    id: 6,
    content: '남성스러운',
  },
  {
    id: 7,
    content: '여성스러운',
  },
  {
    id: 8,
    content: '순수한',
  },
  {
    id: 9,
    content: '성숙한',
  },
  {
    id: 10,
    content: '청순한',
  },
];

const want = [
  {
    id: 0,
    content: '생동감 있는',
  },
  {
    id: 1,
    content: '섬세한',
  },
  {
    id: 2,
    content: '관능적인',
  },
  {
    id: 3,
    content: '편안한',
  },
  {
    id: 4,
    content: '차분한',
  },
  {
    id: 5,
    content: '모험적인',
  },
  {
    id: 6,
    content: '남성스러운',
  },
  {
    id: 7,
    content: '여성스러운',
  },
  {
    id: 8,
    content: '순수한',
  },
  {
    id: 9,
    content: '성숙한',
  },
  {
    id: 10,
    content: '청순한',
  },
];

export default PersonalScent
