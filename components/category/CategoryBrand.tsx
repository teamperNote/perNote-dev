import styled from "styled-components";
import CategoryCard from "./CategoryCard";

export default function CategoryBrand({ brandList }) {
  return (
    <CategoryBrandContainer>
      <BrandAlphabet>{brandList[0]}</BrandAlphabet>
      <CardBox>
        {brandList[1].map((data) => (
          <CategoryCard key={data.id} data={data} from={"CategoryBrand"} />
        ))}
      </CardBox>
    </CategoryBrandContainer>
  );
}

const CategoryBrandContainer = styled.div`
  width: 1420px;
  display: flex;
  flex-direction: column;
  margin-bottom: 140px;
`;

const BrandAlphabet = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  color: #000000;
  margin-bottom: 80px;
`;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
