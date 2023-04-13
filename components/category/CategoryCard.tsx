import styled from "styled-components";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LikeButton from "components/LikeButton";

interface IProps {
  alphabet?: string;
  data: {
    id: string;
    imgUrl: string;
    brand_eng: string;
    name_eng: string;
    liked: boolean;
    likeCount: number;
  };
  from: string;
}

export default function CategoryCard({
  alphabet,
  data: { id, imgUrl, brand_eng, name_eng, liked, likeCount },
  from,
}: IProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [isShow, setIsShow] = useState(false);

  const likeRef = useRef(null);
  const onLinkClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (likeRef.current && !likeRef.current.contains(e.target)) {
      router.push(
        slug[0] === "brand" && slug[2] === undefined
          ? `brand/${alphabet}/${name_eng}`
          : `/product-detail/${id}`,
      );
    }
  };

  return (
    <CategoryCardContainer
      onClick={onLinkClick}
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <Image
        src={imgUrl == "" || imgUrl == "xxxx" ? "/noImage.png" : imgUrl}
        alt={`${
          slug[0] === "brand" && slug[2] === undefined ? "브랜드" : "향수"
        } 이미지`}
        layout="fill"
        objectFit={"contain"}
        unoptimized
      />
      <Filter className={isShow ? "show" : "hide"}>
        {from == "Category" && (
          <HeartBox>
            <LikeButton
              id={id}
              likeRef={likeRef}
              direction={"column"}
              liked={liked}
              likeCount={likeCount}
            />
          </HeartBox>
        )}
        <BrandName className="bold f30">
          {slug[0] === "brand" && slug[2] === undefined ? name_eng : brand_eng}
        </BrandName>
        {from == "Category" && (
          <PurfumeName className="regular f20">{name_eng}</PurfumeName>
        )}
      </Filter>
    </CategoryCardContainer>
  );
}

const CategoryCardContainer = styled.li`
  position: relative;
  width: 21.25rem;
  height: 21.25rem;
  cursor: pointer;
  overflow: hidden;
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 1.125rem 1.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
  &.hide {
    display: none;
  }
`;

const HeartBox = styled.div`
  position: absolute;
  top: 0.875rem;
  right: 1rem;
  color: var(--white-color);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandName = styled.h3`
  color: var(--white-color);
  margin-bottom: 0.3125rem;

  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PurfumeName = styled.h4`
  color: var(--white-color);
  margin-bottom: 0;

  width: 100%;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
