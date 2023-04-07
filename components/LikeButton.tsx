import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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

  const onLikeClick = async () => {
    if (isLike) {
      setIsLike(false);
      setLikeCounts(likeCounts - 1);
    } else {
      setIsLike(true);
      setLikeCounts(likeCounts + 1);
    }
    if (content !== "story") {
      await axios
        .post("/api/perfumeLike", {
          perfumeId: id,
          userId: "6427c8c4aa6de7f827ba0fac",
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("/api/story/like", {
          storyId: id,
          userId: "6427c8c4aa6de7f827ba0fac",
        })
        .catch((err) => {
          console.log(err);
        });
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
