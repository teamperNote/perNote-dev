import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  alphabet?: string;
  data: {
    id: string;
    imgUrl: string;
    brand_eng: string;
    name_eng: string;
  };
  from: string;
}

export default function CategoryCard({ alphabet, data, from }: Props) {
  const router = useRouter();
  const { slug } = router.query;

  const [isShow, setIsShow] = useState(false);
  return (
    <Link
      href={
        slug[0] === "brand" && slug[2] === undefined
          ? `brand/${alphabet}/${data.name_eng}`
          : `/product-detail/${data.id}`
      }
    >
      <CategoryCardContainer
        onMouseOver={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <CategoryCardImg src={data.imgUrl} />
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
            <BrandName>
              {/* TODO 서지수 브랜드 name_eng -> brand_eng으로 수정되면 수정하기 */}
              {slug[0] === "brand" && slug[2] === undefined
                ? data.name_eng
                : data.brand_eng}
            </BrandName>
            {from == "Category" && <PurfumeName>{data.name_eng}</PurfumeName>}
          </Filter>
        )}
      </CategoryCardContainer>
    </Link>
  );
}

const CategoryCardContainer = styled.div`
  position: relative;
  width: 460px;
  height: 460px;
  cursor: pointer;
  overflow: hidden;
`;

const CategoryCardImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  color: var(--white-color);
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
  color: var(--white-color);
  align-items: center;
`;

const BrandName = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 51px;
  color: var(--white-color);
  margin-bottom: 15px;
`;

const PurfumeName = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);

  width: 420px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;
