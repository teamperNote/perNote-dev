import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import NoteTag from "components/NoteTag";
import RowStoryCard from "components/story/RowStoryCard";
import { dateFormat } from "lib/numberFomat";

interface IStory {
  isLoading: boolean;
  data: {
    body: string;
    createdAt: string;
    id: string;
    liked: boolean;
    likeCount: number;
    tags: string[];
    title: string;
    viewCount: number;
  };
}

export default function StoryDetail() {
  const router = useRouter();
  const { storyId } = router.query;

  const [story, setStory] = useState<IStory>({
    isLoading: false,
    data: {
      body: "",
      createdAt: "",
      id: "",
      liked: false,
      likeCount: 0,
      tags: [],
      title: "",
      viewCount: 0,
    },
  });
  const getStory = async () => {
    await axios
      .get("/api/story", {
        params: { storyId: storyId },
      })
      .then((res) => {
        console.log(res.data);
        setStory({ ...story, isLoading: true, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (storyId) {
      getStory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  const [isShowModal, setIsShowModal] = useState(false);

  const ModalRef = useRef<HTMLDivElement>();
  useEffect(() => {
    // 모달 영역 외 클릭 시 종료
    const handleCloseModal = (e) => {
      if (!ModalRef.current || !ModalRef.current.contains(e.target)) {
        setIsShowModal(false);
      }
    };
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isNoti, setIsNoti] = useState<boolean>(false);

  return (
    <StoryDetailContainer>
      {story.isLoading && (
        <>
          <StoryDetailHeader>
            <HeaderImg
              src={
                "https://www.idaegu.co.kr/news/photo/202112/2021123101001036600063001.jpg"
              }
            />
            <HeaderBox>
              <HeaderDate>{dateFormat(story.data.createdAt)}</HeaderDate>
              <RowFlex>
                <HeaderTitle>{story.data.title}</HeaderTitle>
                <IconBox>
                  <IconImg src={"/heatIcon.png"} />
                  <IconSpan>{story.data.likeCount}</IconSpan>
                </IconBox>
                <IconBox>
                  <IconImg src={"/viewIcon_white.svg"} />
                  <IconSpan>{story.data.viewCount}</IconSpan>
                </IconBox>
              </RowFlex>
            </HeaderBox>
          </StoryDetailHeader>
          <ContentContainer>
            <ContentBox>
              <SubTitle>subtitle</SubTitle>
              <ContentText>{story.data.body}</ContentText>
              <TagBox>
                {/* {story.data.tags.map((tag, idx) => (
                  <NoteTag key={idx} from={"StoryDetail"} text={tag} />
                  ))} */}
                <NoteTag from={"StoryDetail"} text={story.data.tags} />
              </TagBox>
            </ContentBox>
            {!isLogin ? (
              <NotiBox>
                <NotiText>
                  새로운 메거진이 궁금하신가요? <br />
                  지금 회원가입하고 알림을 받아보세요!
                </NotiText>
                <Link href={"/signup"}>
                  <SignupLink>회원가입 바로가기 &gt;</SignupLink>
                </Link>
              </NotiBox>
            ) : (
              !isNoti && (
                <NotiBox>
                  <NotiText>
                    매주 업로드 되는 스토리가 궁금하신가요? <br />
                    알림 설정 후 가장 먼저 최신 스토리를 확인해보세요!
                  </NotiText>
                  <Link href={"/signup"}>
                    <SignupLink>알림설정 바로가기 &gt;</SignupLink>
                  </Link>
                </NotiBox>
              )
            )}
            <ShareBox>
              <ShareIconBox ref={ModalRef} onClick={() => setIsShowModal(true)}>
                <ShareIcon src={"/shareIcon.svg"} />
                {isShowModal && (
                  <BubbleBox>
                    <BubbleTitle>스토리를 SNS에 공유해보세요.</BubbleTitle>
                    <BubbleIconContainer>
                      <BubbleIconBox></BubbleIconBox>
                      <BubbleIconBox></BubbleIconBox>
                      <BubbleIconBox></BubbleIconBox>
                      <BubbleIconBox></BubbleIconBox>
                    </BubbleIconContainer>
                  </BubbleBox>
                )}
              </ShareIconBox>
              <ShareIconBox>
                <ShareIcon src={"/heatIcon.png"} />
              </ShareIconBox>
            </ShareBox>
          </ContentContainer>
          <OrderStoryContainer>
            <OrderStoryBox>
              <OrderStoryTitle>이전 게시물</OrderStoryTitle>
              <RowStoryCard />
            </OrderStoryBox>
            <OrderStoryBox>
              <OrderStoryTitle>다음 게시물</OrderStoryTitle>
              <RowStoryCard />
            </OrderStoryBox>
          </OrderStoryContainer>
        </>
      )}
    </StoryDetailContainer>
  );
}

const StoryDetailContainer = styled.div`
  padding-top: 110px;
  width: 1920px;
`;

const StoryDetailHeader = styled.div`
  position: relative;
  width: 100%;
  height: 855px;
  background: rgba(0, 0, 0, 0.4);
  padding: 65px 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin-bottom: 120px;
`;

const HeaderImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderDate = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 50px;
  line-height: 72px;
  color: var(--white-color);
`;

const RowFlex = styled.div`
  display: flex;
  align-items: flex-end;
`;

const HeaderTitle = styled(HeaderDate)`
  font-size: 100px;
  line-height: 145px;
  margin-right: 93px;
`;

const IconBox = styled.div`
  font-size: 100px;
  line-height: 145px;
  margin-right: 25px;
  display: flex;
  align-items: center;
`;

const IconImg = styled.img`
  margin-right: 20px;
`;

const IconSpan = styled(HeaderDate)`
  font-size: 30px;
  line-height: 43px;
`;

const ContentContainer = styled.div`
  width: 1420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--black-color);
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 110px;
`;

const SubTitle = styled(HeaderDate)`
  color: var(--black-color);
  margin-bottom: 35px;
`;

const ContentText = styled(SubTitle)`
  font-size: 35px;
  line-height: 51px;
  margin-bottom: 100px;
`;

const TagBox = styled.div`
  display: flex;
`;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px;
  border: 1px solid var(--secondary-color);
  border-radius: 20px;
  margin-bottom: 90px;
`;

const NotiText = styled(HeaderDate)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  text-align: center;
  color: var(--black-color);
  margin-bottom: 45px;
`;

const SignupLink = styled(NotiText)`
  width: 314.43px;
  font-weight: 400;
  font-size: 35px;
  line-height: 51px;
  margin-bottom: 0;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid var(--secondary-color);
`;

const ShareBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ShareIconBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  cursor: pointer;
  :first-child {
    margin-right: 44px;
  }
  margin-bottom: 110px;
  position: relative;
`;

const ShareIcon = styled.img`
  width: 61px;
`;

const BubbleBox = styled.div`
  position: absolute;
  top: 180px;
  left: -28px;
  width: 400px;
  height: 179px;
  background: #ffffff;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  padding: 40px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
  ::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 87px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 14px 24px 14px;
    border-color: transparent transparent #ffffff transparent;
  }
`;

const BubbleTitle = styled(HeaderDate)`
  font-size: 20px;
  line-height: 29px;
  color: var(--black-color);
  margin-bottom: 20px;
`;

const BubbleIconContainer = styled(HeaderDate)`
  display: flex;
`;

const BubbleIconBox = styled(HeaderDate)`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 100%;
  background: var(--third-color);
  cursor: pointer;
  :last-child {
    margin-right: 0px;
  }
`;

const OrderStoryContainer = styled.div`
  width: 1420px;
  margin: 0 auto;
  margin-bottom: 180px;
`;

const OrderStoryBox = styled.div`
  margin: 50px 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const OrderStoryTitle = styled(NotiText)`
  margin-bottom: 30px;
`;
