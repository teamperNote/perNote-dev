import React, { useState } from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";
import SortDropDown from "components/category/SortDropDown";
import { sortArray } from "lib/modules";

function TestResult() {
  const [sort, setSort] = useState(sortArray[0].value);

  return (
    <TestResultContainer>
      <TestResultTitle>테스트 결과</TestResultTitle>
      <SortBox>
        <SortDropDown sort={sort} setSort={setSort} />
      </SortBox>
      <ResultList>
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
      </ResultList>
    </TestResultContainer>
  );
}

export default TestResult;

const TestResultContainer = styled.div`
  padding-top: 290px;
  max-width: 1420px;
  margin: 0 auto;
`;

const TestResultTitle = styled.h2`
  margin: 0;
  margin-bottom: 110px;
  font-weight: 700;
  font-size: 50px;
`;

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ResultList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
`;
