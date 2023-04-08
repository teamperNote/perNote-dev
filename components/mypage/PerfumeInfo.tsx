import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { dateFormat } from "lib/numberFomat";
import { ILiked } from "lib/types";

interface Iprops {
  data: ILiked;
}

export default function PerfumeInfo({
  data: {
    id,
    imgUrl,
    createdAt,
    name_eng,
    brand_eng,
    note,
    top,
    middle,
    bottom,
  },
}: Iprops) {
  const { pathname } = useRouter();
  return (
    <Link
      href={
        pathname === "/mypage/test-result"
          ? `/personal-scent/${id}`
          : `/product-detail/${id}`
      }
    >
      <PerfumeInfoContainer>
        <PerfumeImageContainer>
          <Image
            src={imgUrl !== "" ? imgUrl : "/noImage.png"}
            alt={`${name_eng} 이미지`}
            layout="fill"
            objectFit={"contain"}
          />
        </PerfumeImageContainer>
        <TextContainer>
          {pathname === "/mypage/test-result" && (
            <Date className="regular f20">{dateFormat(createdAt)}</Date>
          )}
          <PerfumeName className="bold f30">{name_eng}</PerfumeName>
          <PerfumeBrand className="regular f20">{brand_eng}</PerfumeBrand>
          <DetailInfo className="bold f20">
            <DetailInfoItem>
              <InfoTitle>노트</InfoTitle>
              <InfoContent className="regular">
                {note.map((note) => `${note}, `)}
              </InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>탑</InfoTitle>
              <InfoContent className="regular">
                {top !== "xxxx" ? top : "-"}
              </InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>미들</InfoTitle>
              <InfoContent className="regular">
                {middle !== "xxxx" ? middle : "-"}
              </InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>베이스</InfoTitle>
              <InfoContent className="regular">
                {bottom !== "xxxx" ? bottom : "-"}
              </InfoContent>
            </DetailInfoItem>
          </DetailInfo>
        </TextContainer>
      </PerfumeInfoContainer>
    </Link>
  );
}

const PerfumeInfoContainer = styled.li`
  width: 460px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    width: 360px;
  }
  @media screen and (max-width: 740px) {
    width: 80vw;
  }
`;

const PerfumeImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 1.875rem;
`;

const TextContainer = styled.div`
  padding: 0 2.125rem;
`;

const Date = styled.time`
  color: var(--dark-gray-color);
`;

const PerfumeName = styled.h3`
  margin-bottom: 0.3125rem;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PerfumeBrand = styled.h4`
  color: var(--black-color);
  margin: 0;
`;

const DetailInfo = styled.ul`
  padding: 1.5625rem 0rem;
`;

const DetailInfoItem = styled.li`
  display: flex;
  margin-bottom: 1.8125rem;
  :last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.h5`
  width: 3.5rem;
  margin-right: 1.875rem;
`;

const InfoContent = styled.span`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
