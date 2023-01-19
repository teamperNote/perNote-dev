import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CategoryCard({ data, from }) {
  const router = useRouter();
  const { page } = router.query;

  const [isShow, setIsShow] = useState(false);
  return (
    <Link href={page === "brand" ? `brand/${data.name}` : "/product-detail"}>
      <CategoryCardContainer
        background={data.imgUrl}
        onMouseOver={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        {isShow && (
          <Filter>
            {from == "Category" && (
              <HeartBox>
                {/* TODO 서지수 마우스 올라가면 빨간 하트로 변경 해야함 */}
                {/* TODO 서지수 좋아요 여부에 따라 빨간 하트 */}
                <StoryCardOutlineHeart src="/heatIcon.png" />
                {/* TODO 좋아요 갯수 반영 */}
                <HeartCount>108</HeartCount>
              </HeartBox>
            )}
            <PurfumeName>{data.name}</PurfumeName>
            {/* TODO 서지수 향수 설명 추가되면 수정 */}
            {/* TODO 서지수 브랜드 카드 디자인 확저오디면 수정하기 */}
            {from == "Category" && (
              <PurfumeDesc>
                뭐라뭐라 뭐라뭐라 블라블라해서 어쩌고 저쩌고한 향수입니다. 이런
                저런 이런 저런 향이 나고 어쩌고 저쩌고 쨌든 냄새 좋음
              </PurfumeDesc>
            )}
          </Filter>
        )}
      </CategoryCardContainer>
    </Link>
  );
}

const CategoryCardContainer = styled.div<{ background: string }>`
  position: relative;
  width: 460px;
  height: 460px;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-position: center;
`;

const Filter = styled.div`
  width: 460px;
  height: 460px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
`;

const HeartBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  /* mix-blend-mode: difference; */
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

const PurfumeName = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 51px;
  color: #ffffff;
  margin-bottom: 15px;
`;

const PurfumeDesc = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #ffffff;

  width: 420px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;
