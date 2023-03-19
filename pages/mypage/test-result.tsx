import { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";
import axios from "axios";
import { ILiked } from "lib/types";

export default function TestResult() {
  const [tests, setTests] = useState<ILiked[]>([]);
  useEffect(() => {
    const getTests = () => {
      axios
        .get("/api/personalScent/result", {
          params: {
            userId: "64023ce1c704c82c11f5df20",
          },
        })
        .then(({ data }) => {
          setTests(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTests();
  }, []);

  return (
    <TestResultContainer>
      <TestResultTitle>테스트 결과</TestResultTitle>
      <ResultList>
        {tests.map((test) => (
          <PerfumeInfo key={test.id} data={test} />
        ))}
      </ResultList>
    </TestResultContainer>
  );
}

const TestResultContainer = styled.main`
  padding-top: 290px;
  max-width: 1420px;
  margin: 0 auto;
`;

const TestResultTitle = styled.h2`
  margin: 0;
  margin-bottom: 110px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  text-align: left;
  color: var(--black-color);
`;

const ResultList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 20px;
  margin-bottom: 230px;
`;
