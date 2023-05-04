import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import RadioItem from "components/form/RadioButton";
import { SignupType } from "lib/types";
import { radioButtonArray } from "lib/arrays";
import NameForm from "components/form/NameForm";
import PhoneNumForm from "components/form/PhoneNumForm";

function SnsSignUp() {
  const router = useRouter();

  const [snsName, setSnsName] = useState<string>("");
  const [snsUserId, setUserId] = useState<string>("");
  const { snsType } = router.query;

  useEffect(() => {
    if (snsType) {
      setSnsName(snsType[0]);
      setUserId(snsType[1]);
      console.log(snsName);
    }
  }, [snsName, snsType, snsUserId]);

  const [name, setName] = useState<string>("");
  const [isValidName, setIsValidName] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValidNum, setIsValidNum] = useState(false);
  const [successAuth, setSuccessAuth] = useState<boolean>(false);

  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const inputYear = (e: any) => {
    setYear(e.target.value);
  };
  const inputMonth = (e: any) => {
    setMonth(e.target.value);
  };
  const inputDay = (e: any) => {
    setDay(e.target.value);
  };

  const convertBirth = (year: string, month: string, day: string) => {
    const convertYear = Number(year);
    const convertMonth = Number(month);
    const convertDay = Number(day);
    const birthday = new Date(convertYear, convertMonth - 1, convertDay + 1);
    return birthday;
  };

  const checkRequired = () => {
    if (isValidName && isValidNum && year && month && day && gender) {
      return true;
    }
    return false;
  };
  const clickSignup = async (e: any) => {
    e.preventDefault();
    const birthday = convertBirth(year, month, day);
    const data = {
      name,
      phoneNumber,
      birth: birthday,
      gender,
      userId: snsUserId,
    };

    if (checkRequired()) {
      if (snsName === "kakao") {
        try {
          const response = await axios.post("/api/auth/kakao/signup", data);
          console.log(response);
          if (response.status === 200) {
            router.push("/signin");
          }
        } catch (e) {
          console.log(e);
        }
      }

      if (snsName === "google") {
        try {
          const response = await axios.post("/api/auth/google/signup", data);
          console.log(response);
          if (response.status === 200) {
            router.push("/signin");
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  return (
    <SnsSignupWrapper>
      <SignupForm>
        <Field>
          <legend className="read-only">{`${snsName} 회원가입`}</legend>
          <LocalTitle>{`${snsName} 회원가입`}</LocalTitle>
          <FormList>
            <NameForm
              userInfo={name}
              setUserInfo={setName}
              isValidName={isValidName}
              setIsValidName={setIsValidName}
            />
            <PhoneNumForm
              userInfo={phoneNumber}
              setUserInfo={setPhoneNumber}
              successAuth={successAuth}
              setSuccessAuth={setSuccessAuth}
              isValidNum={isValidNum}
              setIsValidNum={setIsValidNum}
            />
            <BirthDayFormItem>
              <label htmlFor="birth">생년월일</label>
              <div>
                <select name="year" id="year" value={year} onChange={inputYear}>
                  <option value="">년도</option>
                  {Array(84)
                    .fill(null)
                    .map((item, index) => {
                      return (
                        <option key={index} value={index + 1940}>
                          {index + 1940}
                        </option>
                      );
                    })}
                </select>
                <select
                  name="month"
                  id="month"
                  value={month}
                  onChange={inputMonth}
                >
                  <option value="">월</option>
                  {Array(12)
                    .fill(null)
                    .map((item, index) => {
                      return (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    })}
                </select>
                <select name="day" id="day" value={day} onChange={inputDay}>
                  <option value="">일</option>
                  {Array(31)
                    .fill(null)
                    .map((item, index) => {
                      return (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    })}
                </select>
              </div>
            </BirthDayFormItem>
            <RadioItem
              radioData={radioButtonArray[0]}
              setStateValue={setGender}
            />
          </FormList>
        </Field>
        <SignupButton
          isActive={checkRequired() ? "isActive" : ""}
          onClick={clickSignup}
        >
          가입하기
        </SignupButton>
      </SignupForm>
    </SnsSignupWrapper>
  );
}

export default SnsSignUp;
const SnsSignupWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    padding-top: 50px;
  }

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 200px;
  padding-bottom: 200px;
`;
const SignupForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  width: 1180px;
`;

const Field = styled.fieldset`
  border: none;
`;

const LocalTitle = styled.h3`
  position: absolute;
  margin: 0;
  padding: 0 15px;
  top: 0;
  left: 50%;
  transform: translate(-129.205px, -22.5px);
  background: var(--white-color);
  font-weight: 700;
  font-size: 2rem;
`;

const FormList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
`;

const SignupButton = styled.button<SignupType>`
  cursor: ${(props) =>
    props.isActive === "isActive" ? "pointer" : "not-allowed"};
  width: 333px;
  height: 60px;
  border: none;
  background: ${(props) =>
    props.isActive === "isActive" ? "#525d4d" : "#d9d9d9"};
  border-radius: 10px;
  color: ${(props) => (props.isActive === "isActive" ? "white" : "#616161")};
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 60px;
`;
const BirthDayFormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;

  label {
    display: inline-block;
    width: 130px;
    text-align: left;
    font-weight: 400;
    font-size: 1.25rem;
    margin-right: 63px;
    @media screen and (max-width: 1440px) {
      width: 120px;
    }
    @media screen and (max-width: 480px) {
      width: 50px;
      margin-right: 13px;
      font-size: 1rem;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    @media screen and (max-width: 480px) {
      width: 220px;
    }
  }
  input {
    width: 90px;
    height: 46px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
  }

  input::placeholder {
    color: black;
    font-size: 1rem;
  }

  select {
    width: 90px;
    height: 46px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
    appearance: none;
    background: url("/down_arrow.svg") no-repeat;
    background-position: 60px 16px;
    background-size: 14px 10px;
    @media screen and (max-width: 480px) {
      background-position: 48px 16px;
    }
  }
`;
