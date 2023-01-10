/* eslint-disable react/no-unknown-property */
import styled from "styled-components";
// import { BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";
import CategoryDropDown from "./CategoryDropDown";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface NavBarProps {
  navOption: string;
}
export default function NavBar() {
  const router = useRouter();
  const pathname = router.pathname;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNavShow, setIsNavShow] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState(0);
  const openDropDown = () => {
    setIsOpen(true);
  };

  const closeDropDown = () => {
    setIsOpen(false);
  };

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();

    if (scrollY > 45) {
      setIsNavShow(true);
    } else {
      setIsNavShow(false);
    }

    return () => {
      window.removeEventListener("scroll", logit);
    };
  }, [isNavShow, scrollY]);
  return pathname === "/" ? (
    <>
      <ScrollNavBarContainer navOption={isNavShow ? "show" : ""}>
        <PernoteLogo>
          <Link href="/">per.note</Link>
        </PernoteLogo>
        <Navigator>
          <NavigatorLink>
            <Link href="/personal-survey/start">personal scent</Link>
          </NavigatorLink>
          <NavigatorLink>perfume story</NavigatorLink>
          <CategoryContainer
            onMouseOver={openDropDown}
            onMouseLeave={closeDropDown}
          >
            <NavigatorLink>Category</NavigatorLink>
            <div className={isOpen ? "show-modal" : "close-modal"}>
              <CategoryDropDown
                openDropDown={openDropDown}
                closeDropDown={closeDropDown}
              />
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
      </ScrollNavBarContainer>
    </>
  ) : (
    <>
      <NavBarContainer>
        <PernoteLogo>
          <Link href="/">per.note</Link>
        </PernoteLogo>
        <Navigator>
          <NavigatorLink>
            <Link href="/personal-survey/start">personal scent</Link>
          </NavigatorLink>
          <NavigatorLink>perfume story</NavigatorLink>
          <CategoryContainer
            onMouseOver={openDropDown}
            onMouseLeave={closeDropDown}
          >
            <NavigatorLink>Category</NavigatorLink>
            <div className={isOpen ? "show-modal" : "close-modal"}>
              <CategoryDropDown
                openDropDown={openDropDown}
                closeDropDown={closeDropDown}
              />
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
    </>
  );
}

const ScrollNavBarContainer = styled.div<NavBarProps>`
  width: 1920px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 70px;
  border: ${(props) => (props.navOption === "show" ? "" : "none")};
  border-bottom: ${(props) =>
    props.navOption === "show" ? "1px solid #d9d9d9" : ""};
  position: fixed;
  color: ${(props) => (props.navOption === "show" ? "black" : "white")};
  background: ${(props) =>
    props.navOption === "show" ? "white" : "transparent"};
  z-index: 1;
`;

const NavBarContainer = styled.div`
  width: 1920px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 70px;
  border-bottom: 1px solid #d9d9d9;
  position: fixed;
  color: black;
  background: white;
  z-index: 1;
`;
// 로고 나중에 바꾸기
const PernoteLogo = styled.div`
  margin-right: 153px;
  font-weight: 700;
  font-size: 30px;
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
  margin-right: 3.75rem;
`;

const CategoryContainer = styled.div`
  position: relative;

  .show-modal {
    position: absolute;
    left: -54px;
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
  margin-left: 25px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  .close-modal {
    display: none;
  }
`;
