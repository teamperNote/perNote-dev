/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";

const Pernote: NextPage = () => {
  return (
    <div className="container">
      <div className="title">PER. NOTE STORY</div>
      <div className="subTitle">향수 여정의 시작을 편안하게</div>
      <img className="slide-image" src="/homeimg1.png" />
      <div className="description">
        향수는 첫인상이죠. 무언의 감각이며 단어가 없는 언어 입니다. <br />
        저희는 향수를 뿌림으로 사랑스러워 질 수도 시크해 질 수도 있습니다.
      </div>
      <img className="image" src="/perNoteImg1.png" />
      <div className="description">
        세상에는 너무나 많은 향수가 존재합니다.
        <br /> 자신에게 어울리는, 자신이 원하는 향수를 찾고 싶지만 향수를
        맡아보러 <br />
        백화점, 드러그 스토어까지 가는 것도 쉽지 않은 일입니다
      </div>
      <video controls>
        <source src="https://video.wixstatic.com/video/11062b_1134a743c90247bd95970e575baa005c/1080p/mp4/file.mp4"></source>
      </video>
      <div className="wrapper">
        <img className="background-image" src="/perNoteBackImg.png" />
        <div className="cover-text">
          그래서 저희는 여러분들이 언제 어디서든 향수를 맡아보지 않더라도
          비교하고 <br />
          선택하기 쉽게 이런 사이트를 만들었습니다
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 4rem 0 8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          font-size: 2.8rem;
          border-bottom: 1.6px solid black;
          padding: 0 1.4rem;
        }
        .subTitle {
          font-size: 1.6rem;
          font-weight: bolder;
          margin: 2rem 0;
        }
        .slide-image {
          width: 62rem;
          height: 30rem;
        }
        .image {
          width: 54rem;
          height: 26rem;
        }
        .description {
          margin: 3rem 0;
          font-size: 1.4rem;
        }

        video {
          width: 50rem;
          height: 28rem;
          margin-bottom: 8rem;
        }

        video:hover {
          cursor: pointer;
          filter: brightness(95%);
        }

        .wrapper {
          position: relative;
        }

        .background-image {
          width: 100%;
        }

        .cover-text {
          position: absolute;
          top: 6%;
          left: 40%;
          font-size: 1.4rem;
          line-height: 2rem;
          text-indent: -8rem;
        }
      `}</style>
    </div>
  );
};

export default Pernote;
