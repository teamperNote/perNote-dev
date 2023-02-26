import Link from "next/link";
import styled from "styled-components";

function Custom404() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>per.note</NotFoundTitle>
      <NotFoundSubTitle>페이지를 찾을 수 없습니다.</NotFoundSubTitle>
      <NotFoundContent>
        {`
  원하시는 결과를 찾을 수 없습니다.
올바른 URL을 입력하였는지 확인하세요.
            `}
      </NotFoundContent>
      <NotFoundLink>
        <Link href="/">메인으로 돌아가기</Link>
      </NotFoundLink>
    </NotFoundContainer>
  );
}

export default Custom404;

const NotFoundContainer = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 212px;
`;
const NotFoundTitle = styled.h2`
  margin: 0;
  font-size: 80px;
`;

const NotFoundSubTitle = styled.h3`
  margin: 0;
  margin-top: 95px;
  font-weight: 700;
  font-size: 40px;
`;

const NotFoundContent = styled.pre`
  margin: 0;
  margin-top: 30px;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
`;

const NotFoundLink = styled.a`
  margin-top: 60px;
  border: none;
  background: var(--primary-color);
  color: var(--white-color);
  border-radius: 10px;
  width: 500px;
  height: 100px;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
`;
