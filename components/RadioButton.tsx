import React from "react";
import styled from "styled-components";

interface radioProps {
  label: string;
  id: object;
  name: string;
  text: object;
}
function RadioItem({ radioData }: { radioData: radioProps }) {
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
          />
          <label htmlFor={radioData.id[0]}>{radioData.text[0]}</label>
        </RadioButton>
        <RadioButton>
          <input
            id={radioData.id[1]}
            type="radio"
            name={radioData.name}
            value={radioData.id[1]}
          />
          <label htmlFor={radioData.id[1]}>{radioData.text[1]}</label>
        </RadioButton>
      </RadioContainer>
    </div>
  );
}
{
  /* <RadioItem>
                <FormLabel>성별</FormLabel>
                <RadioButton onChange={selectGender}>
                  <input id="male" type="radio" name="gender" value="male" />
                  <label htmlFor="male">남성</label>
                </RadioButton>
                <RadioButton onChange={selectGender}>
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  <label htmlFor="female">여성</label>
                </RadioButton>
              </RadioItem>
              <RadioItem>
                <FormLabel>스토리 수신 여부</FormLabel>
                <RadioButton onChange={changeStoryAgree}>
                  <input id="agree" type="radio" name="story" value="yes" />
                  <label htmlFor="agree">동의</label>
                </RadioButton>
                <RadioButton onChange={changeStoryAgree}>
                  <input id="disagree" type="radio" name="story" value="no" />
                  <label htmlFor="disagree">비동의</label>
                </RadioButton>
              </RadioItem> */
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
