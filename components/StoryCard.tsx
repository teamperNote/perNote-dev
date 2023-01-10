import styled from "styled-components";

export default function StoryCard({ url }) {
  // TODO 아이콘 임시로 해둔 것 - 화질이 너무 떨어짐
  // 채워진 하트 반영되게 할 것
  // mix-blend-mode 생각한 것과 다름
  // 배경 이미지 css 수정 해야함
  return (
    <StoryCardContainer background={url}>
      <HeartBox>
        <StoryCardOutlineHeart src="/heatIcon.png" />
        <HeartCount>108</HeartCount>
      </HeartBox>
    </StoryCardContainer>
  );
}

const StoryCardContainer = styled.div<{ background: string }>`
  position: relative;
  width: 460px;
  height: 300px;
  background: url(${({ background }) => background}) no-repeat center;
`;

const HeartBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  mix-blend-mode: difference;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
`;

const StoryCardOutlineHeart = styled.img`
  width: 40px;
  height: 36.7px;
  margin-bottom: 5px;
`;

const HeartCount = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #ffffff;
  align-items: center;
`;