import Link from "next/link";
import styled from "styled-components";

function Custom404() {
  return (
    <>
      <Header>
        <h1>per.note</h1>
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
  margin-top: 170px;
  text-align: center;
  font-weight: 700;
  font-size: 80px;
`;

const NotFound = styled.main`
  text-align: center;
  font-weight: 700;
  font-size: 50px;
`;

const Section = styled.section`
  text-align: center;
  margin: 30px 0 76px 0;
  font-weight: 400;
  font-size: 40px;
`;

const SectionParagraph = styled.p`
  margin: 0;
  line-height: 58px;
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
  font-size: 40px;
`;
