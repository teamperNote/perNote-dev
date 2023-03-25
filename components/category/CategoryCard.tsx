import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

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

  // 좋아요 기능
  const [isLike, setIsLike] = useState<boolean>(liked);
  const [likeCounts, setLikeCounts] = useState<number>(likeCount);

  const onLinkClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if ((e.target as HTMLLIElement).id.includes("heart")) {
      onLikeClick();
    } else {
      router.push(
        slug[0] === "brand" && slug[2] === undefined
          ? `brand/${alphabet}/${name_eng}`
          : `/product-detail/${id}`,
      );
    }
  };

  const onLikeClick = async () => {
    if (isLike) {
      setIsLike(false);
      setLikeCounts(likeCounts - 1);
    } else {
      setIsLike(true);
      setLikeCounts(likeCounts + 1);
    }
    await axios
      .post("/api/perfumeLike", {
        perfumeId: id,
        userId: "64023ce1c704c82c11f5df20",
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <Link
    //   href={
    //     slug[0] === "brand" && slug[2] === undefined
    //       ? `brand/${alphabet}/${name_eng}`
    //       : `/product-detail/${id}`
    //   }
    // >
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
        width={340}
        height={340}
        objectFit={"contain"}
        unoptimized={true}
      />
      {isShow && (
        <Filter>
          {from == "Category" && (
            <HeartBox>
              <Image
                src={isLike ? "/heartFillIcon.png" : "/heartIcon.png"}
                alt={`${isLike ? "like" : "unlike"} icon`}
                width={40}
                height={36.7}
                id={"heart"}
              />
              <HeartCount id={"heart"}>{likeCounts}</HeartCount>
            </HeartBox>
          )}
          <BrandName>
            {/* TODO 서지수 브랜드 name_eng -> brand_eng으로 수정되면 수정하기 */}
            {slug[0] === "brand" && slug[2] === undefined
              ? name_eng
              : brand_eng}
          </BrandName>
          {from == "Category" && <PurfumeName>{name_eng}</PurfumeName>}
        </Filter>
      )}
    </CategoryCardContainer>
    // </Link>
  );
}

const CategoryCardContainer = styled.li`
  position: relative;
  width: 340px;
  height: 340px;
  cursor: pointer;
  overflow: hidden;
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 340px;
  height: 340px;
  padding: 18px 17px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
`;

const HeartCount = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);
  align-items: center;
  margin-top: 5px;
`;

const BrandName = styled.h3`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
  color: var(--white-color);
  margin-bottom: 5px;

  width: 306px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PurfumeName = styled(BrandName)`
  font-weight: 400;
  font-size: 21px;
  line-height: 25px;
  margin-bottom: 0;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
