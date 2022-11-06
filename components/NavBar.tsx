/* eslint-disable react/no-unknown-property */
import styled from "styled-components";
import { useRouter } from "next/router";
import { BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <NavBarContainer>
      <PernoteLogo>
        <Link href="/">per.note</Link>
      </PernoteLogo>
      <Navigator>
        <div>
          <Link href="/PersonalScent">personal scent</Link>
        </div>
        <div>perfume story</div>
        <div>Category</div>
      </Navigator>
      <HeaderRight>
        <SearchInput>
          <input type="text" />
          <BiSearchAlt2 />
        </SearchInput>
        <Login>Login</Login>
      </HeaderRight>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 34px 77px;
  background-color: #ffffff;
`;

const PernoteLogo = styled.div`
  margin-right: 160px;
  font-weight: 700;
  font-size: 30px;
`;

const Navigator = styled.div`
  display: flex;

  div {
    margin-right: 3.75rem;
    font-weight: 400;
    font-size: 20px;
  }
`;

const HeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.div`
  width: 271px;
  height: 36px;
  margin-right: 2.813rem;
  padding: 9px;
  border-radius: 1.125rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 90%;
    background-color: #d9d9d9;
    border: none;
    outline: none;
  }
`;

const Login = styled.div`
  font-weight: 400;
  font-size: 20px;
`;
