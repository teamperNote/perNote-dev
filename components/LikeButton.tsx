import styled from "styled-components";
import { useState } from "react";
import axiosInstance from "lib/api/config";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { loginState } from "@store/loginState";
import { useRouter } from "next/router";

interface IProps {
  content?: string;
  id: string;
  likeRef?: React.RefObject<HTMLButtonElement>;
  direction?: string;
  liked: boolean;
  likeCount: number;
  size?: number;
  color?: string;
  isCount?: boolean;
  countSize?: number;
  countMargin?: string;
}

export default function LikeButton({
  content,
  id,
  likeRef,
  direction,
  liked,
  likeCount,
  size,
  color = "#FFFFFF",
  isCount = true,
  countSize,
  countMargin,
}: IProps) {
  const [isLike, setIsLike] = useState<boolean>(liked);
  const [likeCounts, setLikeCounts] = useState<number>(likeCount);
  const router = useRouter();
  const loginInfo = useRecoilValue<string>(loginState);

  const onLikeClick = async () => {
    if (loginInfo) {
      if (isLike) {
        setIsLike(false);
        setLikeCounts(likeCounts - 1);
      } else {
        setIsLike(true);
        setLikeCounts(likeCounts + 1);
      }
      if (content !== "story") {
        await axiosInstance
          .post("/api/perfumeLike", {
            perfumeId: id,
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axiosInstance
          .post("/api/story/like", {
            storyId: id,
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/signin");
    }
  };
  return (
    <HeartContainer
      direction={direction}
      onClick={onLikeClick}
      color={color}
      ref={likeRef}
    >
      {isLike ? (
        <AiFillHeart size={size ? size : 48} />
      ) : (
        <AiOutlineHeart size={size ? size : 48} />
      )}
      {isCount && (
        <HeartCount countSize={countSize} countMargin={countMargin}>
          {likeCounts}
        </HeartCount>
      )}
    </HeartContainer>
  );
}

const HeartContainer = styled.button<{ direction: string; color?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: center;
  align-items: center;
  color: ${({ color }) => (color ? color : "var(--white-color)")};
  cursor: pointer;
`;

const HeartCount = styled.span<{ countSize: number; countMargin: string }>`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: ${({ countSize }) => (countSize ? `${countSize}px` : "20px")};
  line-height: ${({ countSize }) =>
    countSize ? `${countSize + 9}px` : "29px"};
  color: inherit;
  margin: ${({ countMargin }) => countMargin};
`;
