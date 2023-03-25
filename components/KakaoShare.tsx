import React from "react";
import styled from "styled-components";

function KakaoShare() {
  // const onClick = () => {
  //   const { Kakao, location } = window;
  //   Kakao.Share.createDefaultButton({
  //     container: "#kakao-button",
  //     objectType: "feed",
  //     content: {
  //       title: "pernote",
  //       description: "오소민이 했숴여!!!!!!",
  //       imageUrl: "IMAGE_URL",
  //       link: {
  //         webUrl: location.href,
  //       },
  //     },
  //     social: {
  //       likeCount: 1,
  //       commentCount: 2,
  //       sharedCount: 3,
  //       viewCount: 10000,
  //       subscriberCount: 1231241,
  //     },
  //     buttons: [
  //       {
  //         title: "웹으로 이동",
  //         link: {
  //           mobileWebUrl: "https://developers.kakao.com",
  //           webUrl: "https://developers.kakao.com",
  //         },
  //       },
  //       {
  //         title: "앱으로 이동",
  //         link: {
  //           mobileWebUrl: "https://developers.kakao.com",
  //           webUrl: "https://developers.kakao.com",
  //         },
  //       },
  //     ],
  //   });
  // };
  return (
    <>
      <button
        id="kakao-button"
        onClick={() => {
          console.log("share");
        }}
      >
        카카오 공유하기
      </button>
    </>
  );
}

export default KakaoShare;
