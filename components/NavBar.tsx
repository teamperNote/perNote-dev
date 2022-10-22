/* eslint-disable react/no-unknown-property */
import styled from "styled-components";
import { useRouter } from "next/router";
import { BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <NavBarContainer>
      <div className="pernote-logo">
        <Link href="/">per.note</Link>
      </div>
      <div className="router">
        <div className="personal-scent">
          <Link href="/PersonalScent">personal scent</Link>
        </div>
        <div className="perfume-story">perfume story</div>
        <div className="Category">Category</div>
      </div>
      <div className="navbar-right">
        <div className="search-input">
          <input type="text" />
          <BiSearchAlt2 />
        </div>
        <div className="login">Login</div>
      </div>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2.125rem 4.813rem;
  background-color: #ffffff;

  .pernote-logo {
    margin-right: 10rem;
    font-weight: 700;
    font-size: 30px;
  }

  .router {
    display: flex;

    div {
      margin-right: 3.75rem;
      font-weight: 400;
      font-size: 20px;
    }
  }

  .navbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;

    .search-input {
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
    }
    .login {
      font-weight: 400;
      font-size: 20px;
    }
  }
`;
