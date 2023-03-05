import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

interface Props {
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

export default function CategoryCard({ alphabet, data, from }: Props) {
  const router = useRouter();
  const { slug } = router.query;

  const [isShow, setIsShow] = useState(false);

  // 좋아요 기능
  const [isLike, setIsLike] = useState<boolean>(data.liked);
  const [likeCounts, setLikeCounts] = useState<number>(data.likeCount);

  const onLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id.includes("heart")) {
      onLikeClick();
    } else {
      router.push(
        slug[0] === "brand" && slug[2] === undefined
          ? `brand/${alphabet}/${data.name_eng}`
          : `/product-detail/${data.id}`,
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
        perfumeId: data.id,
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
    //       ? `brand/${alphabet}/${data.name_eng}`
    //       : `/product-detail/${data.id}`
    //   }
    // >
    <CategoryCardContainer
      onClick={onLinkClick}
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <CategoryCardImg
        src={
          data.imgUrl == "" || data.imgUrl == "xxxx"
            ? "/noImage.png"
            : data.imgUrl
        }
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
              ? data.name_eng
              : data.brand_eng}
          </BrandName>
          {from == "Category" && <PurfumeName>{data.name_eng}</PurfumeName>}
        </Filter>
      )}
    </CategoryCardContainer>
    // </Link>
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
  cursor: pointer;
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
