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
            width={460}
            height={300}
            objectFit={"contain"}
          />
        </PerfumeImageContainer>
        <TextContainer>
          {pathname === "/mypage/test-result" && (
            <Date>{dateFormat(createdAt)}</Date>
          )}
          <PerfumeName>{name_eng}</PerfumeName>
          <PerfumeBrand>{brand_eng}</PerfumeBrand>
          <DetailInfo>
            <DetailInfoItem>
              <InfoTitle>노트</InfoTitle>
              <InfoContent>{note.map((note) => `${note}, `)} </InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>탑</InfoTitle>
              <InfoContent>{top !== "xxxx" ? top : "-"}</InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>미들</InfoTitle>
              <InfoContent>{middle !== "xxxx" ? middle : "-"}</InfoContent>
            </DetailInfoItem>
            <DetailInfoItem>
              <InfoTitle>베이스</InfoTitle>
              <InfoContent>{bottom !== "xxxx" ? bottom : "-"}</InfoContent>
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
`;

const PerfumeImageContainer = styled.div`
  width: 460px;
  height: 300px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const TextContainer = styled.div`
  padding: 0 34px;
`;

const Date = styled.time`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: left;
  color: var(--dark-gray-color);
`;

const PerfumeName = styled.h3`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
  text-align: left;
  color: var(--black-color);
  margin: 0;
  margin-bottom: 5px;

  width: 392px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PerfumeBrand = styled.h4`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: left;
  color: var(--black-color);
  margin: 0;
`;

const DetailInfo = styled.ul`
  padding: 25px 0;
  list-style-type: none;
`;

const DetailInfoItem = styled.li`
  display: flex;
  margin-bottom: 29px;
  :last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.span`
  width: 56px;
  margin-right: 30px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  text-align: left;
  color: var(--black-color);
`;

const InfoContent = styled(InfoTitle)`
  width: 306px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0;
  font-weight: 400;
`;
