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
      <MyPageTitle>개인정보 수정</MyPageTitle>
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
              <RadioItem
                radioData={radioList[1]}
                setStateValue={() => {
                  console.log("임시");
                }}
              />
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
  padding: 290px 0 200px 490px;
`;

const MyPageTitle = styled.h1`
  width: 288px;
  text-align: right;
  margin: 0;
  margin-bottom: 110px;
  font-weight: 700;
  font-size: 50px;
`;

const NotificationSection = styled.section`
  margin-bottom: 95px;
`;

const NotificationTitle = styled.h2`
  width: 288px;
  text-align: right;
  margin: 0;
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 60px;
`;

const SettingNoti = styled.div`
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  font-size: 64px;

  .icon {
    color: var(--primary-color);
  }

  .reverse-icon {
    transform: rotate(180deg);
    color: var(--primary-color);
  }
`;

const NotiTitle = styled.h3`
  width: 288px;
  text-align: right;
  margin: 0;
  font-weight: 400;
  font-size: 35px;
  margin-right: 65px;
`;

const PersonalInfo = styled.section``;

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
  width: 800px;
  height: 120px;
  border: none;
  background: #525d4d;
  border-radius: 20px;
  color: white;
  font-weight: 400;
  font-size: 40px;
  margin-top: 93px;
`;
