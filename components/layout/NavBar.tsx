/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryDropDown from "../category/CategoryDropDown";
import { useRecoilState } from "recoil";
import { loginState } from "@store/loginState";
import Image from "next/image";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
export default function NavBar() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const [isLoginNav, setIsLoginNav] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  //로그아웃 기능
  const handleClickLogout = () => {
    localStorage.removeItem("accessToken");
    cookies.remove("refreshToken");
    setLoginInfo("");
    setIsLoginNav(false);
    router.push("/");
  };
  // 카테고리 드랍다운 표시 여부
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  // 스크롤 여부 (하단 그림자)
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const listener = () => {
    // TODO 나중에 y값 수정
    setIsScrolled(window.pageYOffset < 50);
  };
  useEffect(() => {
    if (pathname === "/") {
      setIsScrolled(true);
      window.addEventListener("scroll", listener);
    } else {
      setIsScrolled(false);
    }
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [pathname]);

  useEffect(() => {
    if (loginInfo) {
      setIsLoginNav(true);
    }
  }, [loginInfo]);
  return (
    <NavBarContainer className={isScrolled && "transparent"}>
      <NavBarBox>
        <Link href="/">
          {isScrolled ? (
            <PernoteLogo>
              <Image
                src="/logo_white.png"
                alt="pernote"
                width={134}
                height={30}
              />
            </PernoteLogo>
          ) : (
            <PernoteLogo>
              <Image
                src="/logo_black.png"
                alt="pernote"
                width={134}
                height={30}
              />
            </PernoteLogo>
          )}
        </Link>
        <NavigatorBox>
          <Navigator>
            <Link href="/personal-survey/start">
              <NavigatorLink>personal scent</NavigatorLink>
            </Link>
            <Link href="/perfume-story">
              <NavigatorLink>perfume story</NavigatorLink>
            </Link>
            <NavigatorLink
              onMouseOver={() => setIsDropDownOpen(true)}
              onMouseLeave={() => setIsDropDownOpen(false)}
            >
              Category
              {isDropDownOpen && (
                <CategoryDropDown setIsDropDownOpen={setIsDropDownOpen} />
              )}
            </NavigatorLink>
          </Navigator>
          {isLoginNav ? (
            <HeaderRight>
              <LogoutButton onClick={handleClickLogout}>Logout</LogoutButton>
              <Link href="/mypage">
                <Sign>MyPage</Sign>
              </Link>
            </HeaderRight>
          ) : (
            <HeaderRight>
              <Link href="/signin">
                <Sign>Login</Sign>
              </Link>
              <Link href="/signup">
                <Sign>Signup</Sign>
              </Link>
            </HeaderRight>
          )}
        </NavigatorBox>
      </NavBarBox>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  width: 100%;
  height: 110px;
  position: fixed;
  z-index: 1000;
  color: black;
  background: white;
  border-bottom: 1px solid #d9d9d9;
  &.transparent {
    border-bottom: 0;
    color: var(--white-color);
    background: transparent;
  }
  &.transparent button {
    color: var(--white-color);
  }
  @media screen and (max-width: 1440px) {
    height: 80px;
  }
  @media screen and (max-width: 480px) {
    height: 120px;
  }
`;

const NavBarBox = styled.div`
  width: 100%;
  padding: 20px 50px 21px 50px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1440px) {
    padding: 10px 40px 11px 40px;
  }
  @media screen and (max-width: 1440px) {
    flex-direction: column; 
    padding: 0;
  }
`;

const PernoteLogo = styled.div`
  margin-right: 113px;
  padding: 20px;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    margin-right: 50px;
  }
  @media screen and (max-width: 480px) {
    margin-right: auto;
    width: 120px;
  }
`;

const NavigatorBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Navigator = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    width: 100%; 
    justify-content: space-between;
  }
`;

const NavigatorLink = styled.div`
  position: relative;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 29px;
  margin-right: 20px;
  padding: 20px;
  white-space: nowrap;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 480px) {
    width: 100px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    position: absolute; 
    top: 0;
    right: 0; 
    margin-right: 8px; 
  }
`;

const Sign = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 29px;
  padding: 20px;
  margin-left: 5px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

const LogoutButton = styled.button`
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 1.25rem;
  background-color: transparent;
  border: none;
  padding: 20px;
  cursor: pointer;
`;
