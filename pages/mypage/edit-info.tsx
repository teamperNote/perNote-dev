import Input from "components/form/Input";
import React, { useState } from "react";
import styled from "styled-components";
import ValidationButton from "components/form/ValidationButton";
import { IoToggle } from "react-icons/io5";
import { withRouter } from "next/router";

function EditInfo({ router: { query } }) {
  const userData = JSON.parse(query.userData);
  const [email, setEmail] = useState(userData.email);
  // const [password, setPassword] = useState("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState(userData.name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [birthday, setBirthday] = useState({
    year: userData.birth.slice(0, 4),
    month: userData.birth.slice(5, 7),
    day: userData.birth.slice(8, 10),
  });
  const inputName = (e: any) => {
    setName(e.target.value);
  };
  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  // const inputPassword = (e: any) => {
  //   setPassword(e.target.value);
  // };

  // const inputPasswordCheck = (e: any) => {
  //   setPasswordCheck(e.target.value);
  // };

  const inputPhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const inputYear = (e: any) => {
    setBirthday({ ...birthday, year: e.target.value });
  };
  const inputMonth = (e: any) => {
    setBirthday({ ...birthday, month: e.target.value });
  };
  const inputDay = (e: any) => {
    setBirthday({ ...birthday, day: e.target.value });
  };

  const handleStoreEditInfo = () => {
    console.log("수정 정보 저장");
  };
  return (
    <MyPageContainer>
      <NotificationSection>
        <NotificationTitle>스토리 알림 설정</NotificationTitle>
        <SettingNoti>
          <NotiTitle>카톡 알림 설정</NotiTitle>
          <IoToggle className="icon" />
        </SettingNoti>
        <SettingNoti>
          <NotiTitle>이메일 알림 설정</NotiTitle>
          <IoToggle className="reverse-icon" />
        </SettingNoti>
      </NotificationSection>
      <PersonalInfo>
        <NotificationTitle>개인 정보 수정</NotificationTitle>
        <PersonalInfoForm>
          <FormList>
            <FormItem>
              <Input
                htmlFor="email"
                labelContent="이메일"
                type="email"
                value={email}
                setStateValue={inputEmail}
              />
              <ValidationButton
                click={() => {
                  console.log("이메일 중복확인");
                }}
              >
                중복확인
              </ValidationButton>
            </FormItem>
            {/* <FormItem>
              <Input
                htmlFor="password"
                labelContent="비밀번호"
                type="text"
                value={password}
                setStateValue={inputPassword}
              />
            </FormItem>

            <FormItem>
              <Input
                htmlFor="passwordCheck"
                labelContent="비밀번호 확인"
                type="text"
                value={passwordCheck}
                setStateValue={inputPasswordCheck}
              />
              <ValidationButton
                click={() => {
                  console.log("비밀번호 일치 확인");
                }}
              >
                확인
              </ValidationButton>
            </FormItem> */}
            <FormItem>
              <Input
                htmlFor="name"
                labelContent="이름"
                type="text"
                value={name}
                setStateValue={inputName}
              />
            </FormItem>

            <FormItem>
              <Input
                htmlFor="phone"
                labelContent="전화번호"
                type="tel"
                value={phoneNumber}
                setStateValue={inputPhoneNumber}
              />
              <ValidationButton
                click={() => {
                  console.log("전화번호 인증");
                }}
              >
                인증하기
              </ValidationButton>
            </FormItem>

            <BirthDayFormItem>
              <label htmlFor="birth">생년월일</label>
              <div>
                <select
                  name="year"
                  id="year"
                  value={birthday.year}
                  onChange={inputYear}
                >
                  <option value={birthday.year} selected>
                    {birthday.year}
                  </option>
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
                  value={birthday.month}
                  onChange={inputMonth}
                >
                  <option value={birthday.month} selected>
                    {birthday.month}
                  </option>
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
                <select
                  name="day"
                  id="day"
                  value={birthday.day}
                  onChange={inputDay}
                >
                  <option value={birthday.day} selected>
                    {birthday.day}
                  </option>
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
          </FormList>
          <StoreButton onClick={handleStoreEditInfo}>저장하기</StoreButton>
        </PersonalInfoForm>
      </PersonalInfo>
    </MyPageContainer>
  );
}
export default withRouter(EditInfo);

const MyPageContainer = styled.div`
  font-family: "Noto Sans KR";
  padding: 200px 0;
`;

const NotificationSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
`;

const NotificationTitle = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 60px;
`;

const SettingNoti = styled.div`
  width: 683px;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  font-size: 2.5rem;

  .icon {
    color: var(--primary-color);
  }

  .reverse-icon {
    transform: rotate(180deg);
    color: var(--primary-color);
  }
`;

const NotiTitle = styled.h3`
  width: 150px;
  margin: 0;
  font-weight: 400;
  font-size: 1.4rem;
  margin-right: 65px;
  @media screen and (max-width: 1440px) {
    width: 130px;
  }
`;

const PersonalInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PersonalInfoForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  width: 1008px;
`;
const FormList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
`;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;
`;

const StoreButton = styled.button`
  width: 333px;
  height: 60px;
  border: none;
  border-radius: 10px;
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 90px;
  /* 버튼 활성화 비활성화 구분하기 */
  background: #525d4d;
  color: white;
`;

const BirthDayFormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;

  label {
    display: inline-block;
    /* 248px 이상이면 레이아웃 깨짐  */
    width: 120px;
    text-align: left;
    font-weight: 400;
    font-size: 1.25rem;
    margin-right: 63px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
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
  }
`;
