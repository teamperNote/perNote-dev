import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterLogo>
        <img src="/pernote_logo.svg" alt="pernote" />
      </FooterLogo>
      <FooterContent>
        <InfoContainer>
          <ContentTitle>대표명</ContentTitle> | 장진우
        </InfoContainer>
        <InfoContainer>
          <ContentTitle>서비스명</ContentTitle> | Per.Note
          <br />
        </InfoContainer>
        <InfoContainer>
          <ContentTitle>사업자번호</ContentTitle> | 장진우
        </InfoContainer>
        <InfoContainer>
          <ContentTitle>주소</ContentTitle> | 서울시 성동구 행당로 99
        </InfoContainer>
        <InfoContainer>
          <ContentTitle>소셜페이지링크</ContentTitle> | instagram @teamalp.1009
          <br />
        </InfoContainer>
        <InfoContainer>
          <ContentTitle>신고/문의/불편사항</ContentTitle> | alp1009@naver.com
        </InfoContainer>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--white-color);
`;

const FooterLogo = styled.h2`
  margin: 0;
  margin-top: 65px;
`;

const FooterContent = styled.p`
  text-align: center;
`;

const InfoContainer = styled.span``;

const ContentTitle = styled.b`
  margin-left: 20px;
`;
