import React from "react";
import styled from "styled-components";

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

function RadioItem({ radioData, setStateValue }: RadioProps) {
  return (
    <div>
      <RadioContainer>
        <FormLabel>{radioData.label}</FormLabel>
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
  /* background: pink; */
  display: flex;
  margin-top: 35px;
`;

const FormLabel = styled.label`
  display: inline-block;
  width: 300px;
  text-align: right;
  font-weight: 400;
  font-size: 35px;
  margin-right: 63px;
`;
const RadioButton = styled.div`
  font-weight: 400;
  font-size: 30px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  input {
    width: 30px;
    height: 30px;
    margin-right: 26px;
  }

  label {
    padding-top: 4px;
  }
`;
