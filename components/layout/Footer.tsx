import Image from "next/image";
import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterLogo>
        <Image
          src="/logo_white.png"
          alt="per.per 로고"
          layout="fill"
          objectFit="contain"
          unoptimized
        />
      </FooterLogo>
      <FooterBox>
        <FooterTitle>GitHub</FooterTitle>
        <FooterText
          href="https://github.com/teamperNote/perNote-dev"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/teamperNote/perNote-dev
        </FooterText>
      </FooterBox>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white-color);
  text-align: center;
  padding: 3.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 480px) {
    padding: 1.875rem 1.25rem;
  }
`;

const FooterLogo = styled.div`
  position: relative;
  width: 13.625rem;
  height: 2.4375rem;
  margin-bottom: 4.75rem;
  @media screen and (max-width: 480px) {
    height: 20px;
    margin-bottom: 1.875rem;
  }
`;

const FooterBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const FooterTitle = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-right: 0.625rem;
  border-right: 1px solid #ffffff;
  padding-right: 0.625rem;
  @media screen and (max-width: 480px) {
    margin-right: 0;
    border-right: 0;
    padding-right: 0;
  }
`;

const FooterText = styled.a`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.8125rem;
  cursor: pointer;
`;
