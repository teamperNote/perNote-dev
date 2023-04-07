import Input from "components/form/Input";
import React from "react";
import styled from "styled-components";
import ValidationButton from "components/form/ValidationButton";
import RadioItem from "components/form/RadioButton";
import { IoToggle } from "react-icons/io5";

const radioList = [
  {
    label: "성별",
    id: ["male", "female"],
    name: "gender",
    text: ["남성", "여성"],
  },
  {
    label: "메세지 수신 동의",
    id: ["agree", "disagee"],
    name: "story",
    text: ["동의", "비동의"],
  },
];
function EditInfo() {
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
                htmlFor="name"
                labelContent="이메일 변경"
                type="text"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
            </FormItem>
            <FormItem>
              <Input
                htmlFor="email"
                labelContent="비밀번호 변경"
                type="email"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
              <ValidationButton
                click={() => {
                  console.log("");
                }}
              >
                중복확인
              </ValidationButton>
            </FormItem>

            <FormItem>
              <Input
                htmlFor="password"
                labelContent="비밀번호 확인"
                type="passowrd"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
              <ValidationButton
                click={() => {
                  console.log("");
                }}
              >
                확인
              </ValidationButton>
            </FormItem>
            <FormItem>
              <Input
                htmlFor="pwdCheck"
                labelContent="이름"
                type="passowrd"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
            </FormItem>

            <FormItem>
              <Input
                htmlFor="phone"
                labelContent="전화번호"
                type="tel"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
              <ValidationButton
                click={() => {
                  console.log("");
                }}
              >
                변경하기
              </ValidationButton>
            </FormItem>

            <FormItem>
              <Input
                htmlFor="birth"
                labelContent="생년월일"
                type="text"
                value=""
                setStateValue={() => {
                  console.log("임시");
                }}
              />
            </FormItem>
            <div>
              <RadioItem
                radioData={radioList[0]}
                setStateValue={() => {
                  console.log("임시");
                }}
              />
              {/* <RadioItem
                radioData={radioList[1]}
                setStateValue={() => {
                  console.log("임시");
                }}
              /> */}
            </div>
          </FormList>
          <StoreButton>저장하기</StoreButton>
        </PersonalInfoForm>
      </PersonalInfo>
    </MyPageContainer>
  );
}
export default EditInfo;

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
