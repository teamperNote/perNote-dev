import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

interface RadioDataProps {
  label: string;
  id: object;
  name: string;
  text: object;
}
interface RadioProps {
  radioData: RadioDataProps;
  setStateValue: (e: any) => void;
}

interface MarginProps {
  marginProps: string;
}

function RadioItem({ radioData, setStateValue }: RadioProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div>
      <RadioContainer>
        <FormLabel marginProps={pathname}>{radioData.label}</FormLabel>
        <RadioButton>
          <input
            id={radioData.id[0]}
            type="radio"
            name={radioData.name}
            value={radioData.id[0]}
            onChange={(e) => {
              setStateValue(e.target.value);
            }}
          />
          <label htmlFor={radioData.id[0]}>{radioData.text[0]}</label>
        </RadioButton>
        <RadioButton>
          <input
            id={radioData.id[1]}
            type="radio"
            name={radioData.name}
            value={radioData.id[1]}
            onChange={(e) => {
              setStateValue(e.target.value);
            }}
          />
          <label htmlFor={radioData.id[1]}>{radioData.text[1]}</label>
        </RadioButton>
      </RadioContainer>
    </div>
  );
}

export default RadioItem;

const RadioContainer = styled.li`
  display: flex;
  margin-top: 44px;
`;

const FormLabel = styled.label<MarginProps>`
  display: inline-block;
  width: 120px;
  text-align: left;
  font-weight: 400;
  font-size: 1.25rem;
  margin-right: 63px;
`;
const RadioButton = styled.div`
  font-weight: 400;
  font-size: 1.25rem;
  margin-right: 35px;
  display: flex;
  align-items: center;
  input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    accent-color: #525d4d;
  }

  label {
    padding-top: 4px;
  }
`;
