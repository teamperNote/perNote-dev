import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { withAuth } from "components/HOC/withAuth";
import axiosInstance from "../../lib/api/config";
import { UserType } from "lib/types";
import LinkItem from "components/mypage/LinkItem";

interface IData {
  data: UserType;
}
function MyPage() {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data: user }: IData = await axiosInstance.get(
          "/api/users/getInfo",
        );
        setUserInfo(user);
      } catch (error) {
        console.log("액세스 재발급 전 mypage axios error");
      }
    }
    getUserInfo();
  }, []);

  return (
    <MypageContainer>
      {/* <ProfileImageContainer>
        <img src="/perNoteBackImg.png" alt="사용자 이름" />
      </ProfileImageContainer> */}
      {userInfo && <UserName>{userInfo.name}님 </UserName>}
      <LinkList>
        <LinkItem title="테스트 결과" linkProp="/mypage/test-result" />
        <LinkItem title="찜한 향수" linkProp="/mypage/like-perfume" />
        <LinkItem title="스토리" linkProp="/mypage/like-story" />
        <LinkItem title="개인정보 수정" linkProp="/mypage/edit-info" />
      </LinkList>
    </MypageContainer>
  );
}
export default withAuth(MyPage);

const MypageContainer = styled.div`
  padding-top: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 165px;
`;

const ProfileImageContainer = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.h2`
  margin: 0;
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 3.125rem;
`;
const LinkList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  width: 90%;
  height: 500px;
  @media screen and (max-width: 950px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;
