import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryDropDown from "../category/CategoryDropDown";
// import { BiSearchAlt2 } from "react-icons/bi";

export default function NavBar() {
  const router = useRouter();
  const pathname = router.pathname;

  // 카테고리 드랍다운 표시 여부
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  // 스크롤 여부 (하단 그림자)
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const listener = () => {
    // TODO 나중에 y값 수정
    setIsScrolled(window.pageYOffset < 300);
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

  return (
    <NavBarContainer className={isScrolled ? "transparent" : ""}>
      <PernoteLogo>
        <Link href="/">per.note</Link>
      </PernoteLogo>
      <Navigator>
        <NavigatorLink>
          <Link href="/personal-survey/start">personal scent</Link>
        </NavigatorLink>
        <NavigatorLink>
          <Link href="/perfumeStory">perfume story</Link>
        </NavigatorLink>
        <CategoryContainer
          onMouseOver={() => setIsDropDownOpen(true)}
          onMouseLeave={() => setIsDropDownOpen(false)}
        >
          <NavigatorLink>Category</NavigatorLink>
          <div className={isDropDownOpen ? "show-modal" : "close-modal"}>
            <CategoryDropDown setIsDropDownOpen={setIsDropDownOpen} />
          </div>
        </CategoryContainer>
      </Navigator>
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
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  width: 1920px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 27px 60px 28px;
  position: fixed;
  color: black;
  background: white;
  z-index: 1000;
  border-bottom: 1px solid #d9d9d9;
  &.transparent {
    border-bottom: 0;
    color: white;
    background: transparent;
  }
`;

// 로고 나중에 바꾸기
const PernoteLogo = styled.div`
  margin-right: 133px;
  font-weight: 700;
  font-size: 30px;
  padding: 10px;
`;

const Navigator = styled.div`
  display: flex;
`;

const NavigatorLink = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  margin-right: 40px;
  padding: 10px;
`;

const CategoryContainer = styled.div`
  position: relative;

  .show-modal {
    position: absolute;
    left: -44px;
    z-index: 1000;
  }
  .close-modal {
    display: none;
  }
`;

const HeaderRight = styled.div`
  margin-left: auto;
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
  padding: 10px;
  margin-left: 5px;
  cursor: pointer;
`;

// const ModalContainer = styled.div`
//   .close-modal {
//     display: none;
//   }
// `;
