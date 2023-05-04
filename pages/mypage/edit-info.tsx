import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IoToggle } from "react-icons/io5";
import axiosInstance from "../../lib/api/config";
import { UserType } from "lib/types";
import EditPassword from "components/mypage/EditPassword";
import EmailForm from "components/form/EmailForm";
import NameForm from "components/form/NameForm";

interface IData {
  data: UserType;
}

function EditInfo() {
  const router = useRouter();
  const regex = /([0-9])+/g;

  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  const [newPassword, setNewPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);

  const [isValidName, setIsValidName] = useState<boolean>(true);

  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isUnExisted, setIsUnExisted] = useState<boolean>(false);

  const [isShowPasswordForm, setIsShowPasswordForm] = useState(false);

  const inputYear = (e: any) => {
    const year = userInfo.birth.match(regex)[0];
    setUserInfo({
      ...userInfo,
      birth: userInfo.birth.replace(year, e.target.value),
    });
  };
  const inputMonth = (e: any) => {
    const month = userInfo.birth.match(regex)[1];
    setUserInfo({
      ...userInfo,
      birth: userInfo.birth.replace(month, e.target.value.padStart(2, "0")),
    });
  };
  const inputDay = (e: any) => {
    const day = userInfo.birth.match(regex)[2];
    setUserInfo({
      ...userInfo,
      birth: userInfo.birth.replace(day, e.target.value.padStart(2, "0")),
    });
  };

  const showEditPasswordForm = (e: any) => {
    e.preventDefault();
    setIsShowPasswordForm(true);
  };

  const checkRequired = () => {
    if (isShowPasswordForm) {
      if (isValidName && isValidEmail && isCheckedEmail && isPasswordSame) {
        return true;
      }
      return false;
    } else {
      if (isValidName && isValidEmail && isCheckedEmail) {
        return true;
      }
      return false;
    }
  };
  const handleStoreEditInfo = async (e: any) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/mypage/edit", {
        email: userInfo.email,
        name: userInfo.name,
        newPassword,
        birth: userInfo.birth,
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data: user }: IData = await axiosInstance.get(
          "/api/users/getInfo",
        );
        setUserInfo(user);
      } catch (error) {
        console.log("액세스 재발급 전 edit-info axios error");
      }
    }
    getUserInfo();
  }, []);

  return (
    <MyPageContainer>
      {/* <NotificationSection>
        <NotificationTitle>스토리 알림 설정</NotificationTitle>
        <SettingNoti>
          <NotiTitle>카톡 알림 설정</NotiTitle>
          <IoToggle className="icon" />
        </SettingNoti>
        <SettingNoti>
          <NotiTitle>이메일 알림 설정</NotiTitle>
          <IoToggle className="reverse-icon" />
        </SettingNoti>
      </NotificationSection> */}
      <PersonalInfo>
        <NotificationTitle>개인 정보 수정</NotificationTitle>
        <PersonalInfoForm>
          <FormList>
            <EmailForm
              userInfo={userInfo || ""}
              setUserInfo={setUserInfo}
              isValidEmail={isValidEmail}
              setIsValidEmail={setIsValidEmail}
              isUnExisted={isUnExisted}
              setIsUnExisted={setIsUnExisted}
              isChecked={isCheckedEmail}
              setIsChecked={setIsCheckedEmail}
            />
            <NameForm
              userInfo={userInfo || ""}
              setUserInfo={setUserInfo}
              isValidName={isValidName}
              setIsValidName={setIsValidName}
            />
            <BirthDayFormItem>
              <label htmlFor="birth">생년월일</label>
              <div>
                <select
                  name="year"
                  id="year"
                  value={userInfo?.birth.slice(0, 4) || ""}
                  onChange={inputYear}
                >
                  <option value={userInfo?.birth.slice(0, 4)}>
                    {userInfo?.birth.slice(0, 4)}
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
                  value={userInfo?.birth.slice(5, 7) || ""}
                  onChange={inputMonth}
                >
                  <option value={userInfo?.birth.slice(5, 7)}>
                    {userInfo?.birth.slice(5, 7)}
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
                  value={userInfo?.birth.slice(8, 10) || ""}
                  onChange={inputDay}
                >
                  <option value={userInfo?.birth.slice(8, 10)}>
                    {userInfo?.birth.slice(8, 10)}
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
            <>
              <PasswordEditButton
                isClicked={isShowPasswordForm}
                onClick={showEditPasswordForm}
              >
                {isShowPasswordForm
                  ? "전화번호 인증을 진행해주세요."
                  : "전화번호 인증 후 비밀번호 변경하기"}
              </PasswordEditButton>
            </>
            {isShowPasswordForm && (
              <EditPassword
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                password={newPassword}
                setPassword={setNewPassword}
                isPasswordSame={isPasswordSame}
                setIsPasswordSame={setIsPasswordSame}
              />
            )}
          </FormList>
          <StoreButton onClick={handleStoreEditInfo} isActive={checkRequired()}>
            저장하기
          </StoreButton>
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

const StoreButton = styled.button<{ isActive: boolean }>`
  width: 333px;
  height: 60px;
  border: none;
  border-radius: 10px;
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 90px;
  background: ${(props) => (props.isActive ? "#525d4d" : "#d9d9d9")};
  color: ${(props) => (props.isActive ? "white" : "#616161")};
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
`;

const BirthDayFormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 35px 0;

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

const PasswordEditButton = styled.button<{ isClicked: any }>`
  margin: 0 auto;
  transform: translateX(6px);
  border: none;
  border-radius: 10px;
  background-color: ${({ isClicked }) => (isClicked ? "gray" : "#6e7c65")};
  width: 333px;
  height: 46px;
  padding: 8px 0 8px 4px;
  font-size: 1.25rem;
  color: white;
  cursor: ${({ isClicked }) => (isClicked ? "not-allowed" : "pointer")};

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
