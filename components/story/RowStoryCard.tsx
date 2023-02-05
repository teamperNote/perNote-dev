import styled from "styled-components";

// interface Props {
//   data: {
//     id: string;
//     imgUrl: string;
//     liked: boolean;
//     likeCount: number;
//     createdAt: string;
//     viewCount: string;
//     title: string;
//     body: string;
//     // notes: string[];
//   };
// }

export default function RowStoryCard() {
  return (
    <RowStoryCardContainer>
      <ImgBox>
        <Img
          src={
            "https://tumblbug-pci.imgix.net/dfd6741e6221c177ba50d064c6f64cbc6f8edc53/fc0ce9d607a91d2b3fbe5a0334a1cd87ad9aa4db/361db07e56e0ffc1c06081d5166649a68f0f1a6e/24d66be1-6dc9-47a8-92aa-74ce3d7829eb.jpg?ixlib=rb-1.1.0&w=1240&h=930&auto=format%2Ccompress&lossless=true&fit=crop&s=6e24176c21e4e69cd76c678ffc470397"
          }
        />
      </ImgBox>
      <InfoBox>
        <DateSpan>2022.11.01</DateSpan>
        <TitleSpan>Lorem Ipsum</TitleSpan>
        <TextSpan>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo
          donec elit, lectus arcu. Pellentesque quis sit nec magna nibh. Neque,
          orci sagittis, vel, vulputate leo aliquam vitae. Fringilla mauris
          molestie iaculis erat commodo scelerisque. Tincidunt platea pretium
          ipsum euismod amet ultrices purus in tempus.
        </TextSpan>
        <IconContainer>
          <IconBox>
            <IconImg src={"/heartIcon_green.svg"} />
            <IconSpan>108</IconSpan>
          </IconBox>
          <IconBox>
            <IconImg src={"/viewIcon.svg"} />
            <IconSpan>108</IconSpan>
          </IconBox>
        </IconContainer>
      </InfoBox>
    </RowStoryCardContainer>
  );
}

const RowStoryCardContainer = styled.div`
  width: 1420px;
  height: 505px;
  border: 3px solid var(--secondary-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 47px;
`;

const ImgBox = styled.div`
  width: 650px;
  height: 100%;
  margin-right: 67px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  object-fit: cover;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
`;

const DateSpan = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--dark-gray-color);
`;

const TitleSpan = styled(DateSpan)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  color: var(--black-color);
  margin-bottom: 10px;
`;

const TextSpan = styled(DateSpan)`
  font-size: 30px;
  line-height: 43px;
  color: var(--black-color);
  margin-bottom: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  white-space: pre-line;
`;

const IconContainer = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  display: flex;
  :first-child {
    margin-right: 13px;
  }
`;

const IconImg = styled.img`
  margin-right: 13px;
  height: 100%;
`;

const IconSpan = styled(DateSpan)`
  font-size: 25px;
  line-height: 36px;
  color: var(--third-color);
`;
