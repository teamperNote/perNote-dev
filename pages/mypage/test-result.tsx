import { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";
import axiosInstance from "lib/api/config";
import { ILiked } from "lib/types";

export default function TestResult() {
  const [tests, setTests] = useState<ILiked[]>([]);
  useEffect(() => {
    const getTests = () => {
      axiosInstance
        .get("/api/personalScent/result", {
          params: {
            userId: "6427c8c4aa6de7f827ba0fac",
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
      <TestResultTitle className="bold f50">테스트 결과</TestResultTitle>
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
  @media screen and (max-width: 1440px) {
    padding: 0rem 1.875rem;
    padding-top: 210px;
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    padding-top: 130px;
  }
`;

const TestResultTitle = styled.h1`
  margin-bottom: 6.875rem;
  @media screen and (max-width: 480px) {
    margin-bottom: 50px;
  }
`;

const ResultList = styled.ul`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.125rem 1.25rem;
  margin-bottom: 14.375rem;
  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 740px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 100px;
  }
`;
