/* eslint-disable react/no-unknown-property */
import Link from "next/link";
import { useRouter } from "next/router";
export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <div className="header">
        <div className="title">Per. note</div>
        <div className="sub-title">당신의 향수와 여정을 편안하게</div>
      </div>
      <div className="navigator">
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>HOME</a>
        </Link>
        <Link href="/pernote">
          <a className={router.pathname === "/pernote" ? "active" : ""}>
            PER.NOTE
          </a>
        </Link>
        <Link href="/perfumeStory">
          <a className={router.pathname === "/perfumeStory" ? "active" : ""}>
            PERFUME STORY
          </a>
        </Link>
        <Link href="/">
          <a>PERSONAL SCENT</a>
        </Link>
        <Link href="/note">
          <a>노트</a>
        </Link>
        <Link href="/brand">
          <a>브랜드</a>
        </Link>
        <Link href="/character">
          <a>성격</a>
        </Link>
        <Link href="/">
          <a>특징</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.2rem 0;
          border-bottom: 1.6px solid black;
          box-shadow: 0 6px 6px -6px gray;
        }
        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          font-size: 5.5rem;
          padding-bottom: 1.2rem;
        }
        .sub-title {
          padding-bottom: 2.4rem;
        }
        .navigator {
          display: flex;
          gap: 6rem;
        }
        a {
          font-size: 1.4rem;
          text-decoration: none;
          color: black;
        }
        a:hover {
          color: #794577;
        }
        .active {
          color: #793577;
        }
      `}</style>
    </nav>
  );
}
