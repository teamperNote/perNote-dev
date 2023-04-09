import Image from "next/image";

function KakaoShare({ id, imgUrl, name, brand }) {
  const onClick = () => {
    const { Kakao } = window;
    Kakao.Share.createDefaultButton({
      container: "#kakao-button",
      objectType: "feed",
      content: {
        title: "취향에 맞는 5가지 향수를 추천합니다.",
        description: `'자세히 보기'를 클릭하여 Per.Per 홈페이지에서 확인해보세요.`,
        imageUrl: imgUrl,
        link: {
          webUrl: `${location.origin}/product-detail/${id}`,
        },
      },
      itemContent: {
        titleImageText: name,
        titleImageCategory: brand,
        // items: [
        //   {
        //     item: "TOP 1",
        //     itemOp: "Dior - gris montaigne",
        //   },
        //   {
        //     item: "TOP 2",
        //     itemOp: "Dior - homme intense 2011",
        //   },
        //   {
        //     item: "TOP 3",
        //     itemOp: "Dior - homme parfum",
        //   },
        //   {
        //     item: "TOP 4",
        //     itemOp: "Frederic Malle - iris poudre",
        //   },
        //   {
        //     item: "TOP 5",
        //     itemOp: "Prada - infusion d'iris cedre",
        //   },
        // ],
        // sum: "Total",
        // sumOp: "15000원",
      },
      // social: {
      //   likeCount: 1,
      //   commentCount: 2,
      //   sharedCount: 3,
      //   viewCount: 10000,
      //   subscriberCount: 1231241,
      // },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
  };
  return (
    <>
      <Image
        id="kakao-button"
        src={"/login_kakao.svg"}
        alt={`카카오톡 공유`}
        layout="fill"
        unoptimized
        onClick={onClick}
      />
    </>
  );
}

export default KakaoShare;
