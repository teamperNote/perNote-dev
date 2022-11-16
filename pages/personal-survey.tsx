import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { IoChevronBackSharp } from "react-icons/io5";


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
    <PersonalScentContainer>
        <PersonalScentBox>
          {pageNumber == 0 &&
            <>
              <PersonalScentTitle>Personal Scent</PersonalScentTitle>
              <PersonalScentText>자신만의 향을 찾기 어려우셨나요?<br/>간단한 질문으로 여러분의 향을 찾아드립니다.</PersonalScentText>
              <StartBtn onClick={onNextClick}><StartSpan>START</StartSpan></StartBtn>
            </>
          }
          {pageNumber == 1 &&
            <>
              <SubTitle>어느 성별의 향을 원하시나요?</SubTitle>
              <CardContainer>
                {gender.map((data) => (
                  <Card key={data.id} onClick={onNextClick}>
                    <CardContent>{data.content}</CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          }
          {pageNumber == 2 &&
            <>
              <SubTitle>어느 때에 향수를 뿌리고 싶으신가요?</SubTitle>
              <CardContainer>
                {day.map((data) => (
                  <Card key={data.id} onClick={onNextClick}>
                    <CardContent>{data.content}</CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          }
          {pageNumber == 3 &&
            <>
              <SubTitle>당신이 좋아하는 계절은 무엇인가요?</SubTitle>
              <CardContainer>
                {season.map((data) => (
                  <Card key={data.id} onClick={onNextClick}>
                    <CardContent>{data.content}</CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          }
          {pageNumber == 4 &&
            <>
              <SubTitle margin_B='67px'>당신이 좋아하는 색은 무엇인가요?</SubTitle>
              <ColorCardContainer>
                {color.map((data) => (
                  <ColorCard key={data.id} onClick={onNextClick}>
                    <Color background={data.color}/>
                    <ColorCardContent>{data.content}</ColorCardContent>
                  </ColorCard>
                ))}
              </ColorCardContainer>
            </>
          }
          {pageNumber == 5 &&
            <>
              <SubTitle margin_B='92px'>당신을 가장 잘 표현한 단어는 무엇인가요?</SubTitle>
              <TextCardContainer>
                {express.map((data) => (
                  <TextCard key={data.id} onClick={onNextClick}>
                    <TextCardContent>{data.content}</TextCardContent>
                  </TextCard>
                ))}
              </TextCardContainer>
            </>
          }
          {pageNumber == 6 &&
            <>  
              <SubTitle margin_B='92px'>당신이 원하는 향수는 어떤 느낌인가요?</SubTitle>
              <TextCardContainer>
                {want.map((data) => (
                  <TextCard key={data.id} onClick={onSubmit}>
                    <TextCardContent>{data.content}</TextCardContent>
                  </TextCard>
                ))}
              </TextCardContainer>
            </>
          }
        </PersonalScentBox>
    </PersonalScentContainer>
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

export const PersonalScentContainer = styled.div`
    width: 1920px;
    height: 970px;
    background: #EAEAEA;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 79px;
`;

export const PersonalScentBox = styled.div`
    width: 1398px;
    height: 738px;
    background: #D9D9D9;
    border-radius: 20px;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
`;

export const BackIcon = styled(IoChevronBackSharp)`
    position: absolute;
    top: 90px;
    left: 100px;
    font-size: 39px;
`;

export const PersonalScentTitle = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 80px;
    line-height: 116px;
    margin-top: 148.05px;
    margin-bottom: 30.57px;
`;

export const PersonalScentText = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 35px;
    line-height: 51px;
    text-align: center;
    margin-bottom: 128.88px;
`;

export const StartBtn = styled.div`
    width: 288px;
    height: 80px;
    background: #FFFFFF;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StartSpan = styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 50px;
    line-height: 72px;
`;

export const SubTitle = styled.span<{ margin_B?: string }>`
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 35px;
    line-height: 51px;
    margin-top: 90px;
    margin-bottom: ${({margin_B}) => margin_B || '113px'};
`;

export const CardContainer = styled.div`
    display: flex;
`;

export const Card = styled.div`
    width: 230px;
    height: 310px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-right: 63px;
    :last-child {
        margin-right: 0;
    }
`;

export const CardContent = styled.div`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 25px;
    line-height: 36px;
    text-align: center;
    margin-top: 233.06px;
`;
    
export const ColorCardContainer = styled(CardContainer)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
`;

export const ColorCard = styled(Card)`
    width: 200px;
    height: 200px;
    :last-child {
        margin-right: 0;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 0;
`;

export const Color = styled.div<{background: string}>`
    width: 66px;
    height: 66px;
    border-radius: 100%;
    background: ${({background}) => background};
`;

export const ColorCardContent = styled(CardContent)`
    margin-top: 28px;
`;

export const TextCardContainer = styled(ColorCardContainer)`
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: row dense;
`;

export const TextCard = styled(Card)`
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
`;


export const TextCardContent = styled(CardContent)`
    margin-top: 0;
`;

export default PersonalScent
