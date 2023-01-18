import Link from "next/link";
import styled from "styled-components";

function Custom404() {
  return (
    <>
      <Header>
        <h2>per.note</h2>
      </Header>
      <main>
        <NotFound>페이지를 찾을 수 없습니다.</NotFound>
        <Section>
          <SectionParagraph>원하시는 결과를 찾을 수 없습니다.</SectionParagraph>
          <SectionParagraph>
            올바른 URL을 입력하였는지 확인하세요.
          </SectionParagraph>
        </Section>
        <LinkButton>
          <Link href="/">
            <Button>메인으로 돌아가기</Button>
          </Link>
        </LinkButton>
      </main>
    </>
  );
}

export default Custom404;

const Header = styled.header`
  padding-top: 212px;
  text-align: center;
  font-size: 80px;
`;

const NotFound = styled.main`
  text-align: center;
  font-weight: 700;
  font-size: 40px;
`;

const Section = styled.section`
  text-align: center;
  margin: 30px 0 60px 0;
  font-weight: 400;
  font-size: 30px;
`;

const SectionParagraph = styled.p`
  margin: 0;
  line-height: 43px;
`;

const LinkButton = styled.div`
  text-align: center;
`;
const Button = styled.button`
  border: none;
  background: #d9d9d9;
  border-radius: 10px;
  width: 500px;
  height: 100px;
  font-weight: 400;
  font-size: 35px;
`;
