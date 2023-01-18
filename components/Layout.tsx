import NavBar from "./NavBar";
import { useEffect } from "react";

export default function Layout({ children }: any) {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
