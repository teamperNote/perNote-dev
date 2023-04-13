import React from "react";
import styled from "styled-components";

import Link from "next/link";

function LinkItem({ title, linkProp }) {
  return (
    <LinkContainer>
      <Link href={linkProp}>
        <PageLink>
          <img src="/perNoteBackImg.png" alt="" width="90" height="90" />
          <LinkTitle>{title}</LinkTitle>
          {/* <ListContent>Lorem Ipsum</ListContent> */}
        </PageLink>
      </Link>
    </LinkContainer>
  );
}

export default LinkItem;
const LinkContainer = styled.li`
  width: 100%;
  height: 100%;
  background: var(--white-color);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  &:not(:last-child) {
    margin-right: 20px;
  }
  @media screen and (max-width: 1440px) {
    height: 360px;
  }
  @media screen and (max-width: 950px) {
    height: 250px;
  }
`;

const PageLink = styled.a`
  padding: 2rem 0;
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
