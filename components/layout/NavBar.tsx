/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryDropDown from "../category/CategoryDropDown";
import axiosInstance from "../../lib/api/config";

export default function NavBar() {
  const router = useRouter();
  const pathname = router.pathname;
  // 로그인 상태
  const [user, setUser] = useState(null);

  //로그아웃 기능
  const handleClickLogout = () => {
    localStorage.removeItem("user");
    setUser(localStorage.getItem("user"));
    axiosInstance.defaults.headers.Authorization = "";
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
    setUser(localStorage.getItem("user"));
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

  return (
    <NavBarContainer className={isScrolled && "transparent"}>
      <NavBarBox>
        <Link href="/">
          {isScrolled ? (
            <PernoteLogo>
              <img
                src="/pernote_logo.svg"
                alt="pernote"
                width="145"
                height="26"
              />
            </PernoteLogo>
          ) : (
            <PernoteLogo>
              <img src="/pernote_black_logo.svg" alt="pernote" />
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
          {user ? (
            <HeaderRight>
              <LogoutButton onClick={handleClickLogout}>Logout</LogoutButton>
              <Link href="/mypage">
                <Sign>MyPage</Sign>
              </Link>
            </HeaderRight>
          ) : (
            <HeaderRight>
              {/* <SearchInput>
              <input type="text" />
              <BiSearchAlt2 />
            </SearchInput> */}
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
`;

const NavBarBox = styled.div`
  width: 1920px;
  padding: 20px 50px 21px 50px;
  display: flex;
  align-items: center;
`;

const PernoteLogo = styled.div`
  margin-right: 113px;
  padding: 20px;
  cursor: pointer;
`;

const NavigatorBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigator = styled.div`
  display: flex;
  align-items: center;
`;

const NavigatorLink = styled.div`
  position: relative;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  margin-right: 20px;
  padding: 20px;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

// const SearchInput = styled.div`
//   width: 271px;
//   height: 36px;
//   margin-right: 2.813rem;
//   padding: 9px;
//   border-radius: 1.125rem;
//   background-color: #d9d9d9;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   input {
//     width: 90%;
//     background-color: #d9d9d9;
//     border: none;
//     outline: none;
//   }
// `;

const Sign = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  padding: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  cursor: pointer;
`;
