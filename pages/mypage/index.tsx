import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { withAuth } from "components/HOC/withAuth";
import axiosInstance from "../../lib/api/config";

interface UserType {
  birth: string;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  snsId: string;
  snsType: string;
  updatedAt: string;
}
interface IData {
  data: UserType;
}
function MyPage() {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      const { data: user }: IData = await axiosInstance.get(
        "/api/users/getInfo",
      );
      setUserInfo(user);
    }
    getUserInfo();
  }, []);

  return (
    <MypageContainer>
      <ProfileImageContainer>
        <img src="/perNoteBackImg.png" alt="사용자 이름" />
      </ProfileImageContainer>
      {userInfo && <UserName>{userInfo.name}님 </UserName>}
      <LinkList>
        <LinkItem>
          <Link href="/mypage/test-result">
            <PageLink>
              <img src="/perNoteBackImg.png" alt="" width="90" height="90" />
              <LinkTitle>테스트 결과</LinkTitle>
              <ListContent>Lorem Ipsum</ListContent>
            </PageLink>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/mypage/like-perfume">
            <PageLink>
              <img src="/perNoteBackImg.png" alt="" width="90" height="90" />
              <LinkTitle>찜한 향수</LinkTitle>
              <ListContent>Lorem Ipsum</ListContent>
            </PageLink>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/mypage/like-story">
            <PageLink>
              <img src="/perNoteBackImg.png" alt="" width="90" height="90" />
              <LinkTitle>스토리</LinkTitle>
              <ListContent>Lorem Ipsum</ListContent>
            </PageLink>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link
            href={{
              pathname: "/mypage/edit-info",
              query: { userData: JSON.stringify(userInfo) },
            }}
            as="/mypage/edit-info"
          >
            <PageLink>
              <img src="/perNoteBackImg.png" alt="" width="90" height="90" />
              <LinkTitle>개인정보 수정</LinkTitle>
              <ListContent>Lorem Ipsum</ListContent>
            </PageLink>
          </Link>
        </LinkItem>
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
`;

const LinkItem = styled.li`
  width: 340px;
  height: 500px;
  background: var(--white-color);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  &:not(:last-child) {
    margin-right: 20px;
  }
  @media screen and (max-width: 1440px) {
    width: 280px;
    height: 360px;
  }
`;

const PageLink = styled.a`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 90px;
  }
`;
const LinkTitle = styled.h3`
  font-weight: 700;
  font-size: 1.875rem;
  margin: 0;
  margin-bottom: 14px;
`;

const ListContent = styled.p`
  font-weight: 400;
  font-size: 1.875rem;
  margin: 0;
`;
