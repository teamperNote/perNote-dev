import Link from "next/link";
import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <Link href="https://github.com/teamperNote/perNote-dev">
        github 보러가기
      </Link>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white-color);
  text-align: center;
  padding: 20px 0;
  font-size: 1.25rem;
  font-weight: 600;
`;
