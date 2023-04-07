import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import NoteTag from "components/NoteTag";
import RowStoryCard from "components/story/RowStoryCard";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";
import LikeButton from "components/LikeButton";
import { useRecoilValue } from "recoil";
import { loginState } from "@store/loginState";

interface IStoryList {
  isLoading: boolean;
  data: {
    targetStory: IStory;
    prev?: IStory;
    next?: IStory;
  } | null;
}

export default function StoryDetail() {
  const router = useRouter();
  const { storyId } = router.query;

  // 스토리 정렬 모달
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

  // 스토리 데이터 조회 api
  const [story, setStory] = useState<IStoryList>({
    isLoading: false,
    data: null,
  });
  const getStory = async () => {
    await axios
      .get("/api/story", {
        // TODO 서지수 로그인 구현 후 userId 빼기
        params: { userId: "6427c8c4aa6de7f827ba0fac", storyId: storyId },
      })
      .then(({ data }) => {
        setStory({ ...story, isLoading: true, data: data });
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

  const loginInfo = useRecoilValue<string>(loginState);

  // TODO 서지수 유저 정보 저장 있으면 삭제
  const [isNoti, setIsNoti] = useState<boolean>(false);

  return (
    <StoryDetailContainer>
      {story.isLoading && (
        <>
          <section>
            <StoryDetailHeader>
              <Image
                src={story.data.targetStory.imgUrl[0]}
                alt={"스토리 메인 이미지"}
                layout="fill"
                objectFit={"cover"}
                style={{ zIndex: "-1" }}
                priority
              />
              <HeaderBox>
                <HeaderDate className="regular f50">
                  {dateFormat(story.data.targetStory.createdAt)}
                </HeaderDate>
                <RowFlex>
                  <HeaderTitle className="regular">
                    {story.data.targetStory.title}
                  </HeaderTitle>
                  <IconFlex>
                    <LikeButton
                      content={"story"}
                      id={story.data.targetStory.id}
                      liked={story.data.targetStory.liked}
                      likeCount={story.data.targetStory.likeCount}
                      size={60}
                      countSize={30}
                      countMargin={"0 25px 0 15px"}
                    />
                    <IconBox>
                      <Image
                        src={"/viewIcon_white.svg"}
                        alt={"조회수 아이콘"}
                        width={61}
                        height={42}
                      />
                      <IconSpan className="regular f30">
                        {story.data.targetStory.viewCount}
                      </IconSpan>
                    </IconBox>
                  </IconFlex>
                </RowFlex>
              </HeaderBox>
            </StoryDetailHeader>
            <ContentContainer>
              <ContentBox>
                <ContentText className="regular f35">
                  {story.data.targetStory.body}
                </ContentText>
                <TagBox className={"regular f30"}>
                  {story.data.targetStory.tags.map((tag, idx) => (
                    <NoteTag key={idx} from={"StoryDetail"} text={tag} />
                  ))}
                </TagBox>
              </ContentBox>
              {!loginInfo ? (
                <NotiBox>
                  <NotiText className="bold f40">
                    새로운 메거진이 궁금하신가요? <br />
                    지금 회원가입하고 알림을 받아보세요!
                  </NotiText>
                  <Link href={"/signup"}>
                    <SignupLink className="regular f35">
                      회원가입 바로가기 &gt;
                    </SignupLink>
                  </Link>
                </NotiBox>
              ) : (
                !isNoti && (
                  <NotiBox>
                    <NotiText className="bold f40">
                      매주 업로드 되는 스토리가 궁금하신가요? <br />
                      알림 설정 후 가장 먼저 최신 스토리를 확인해보세요!
                    </NotiText>
                    <Link href={"/mypage/edit-info"}>
                      <SignupLink className="regular f35">
                        알림설정 바로가기 &gt;
                      </SignupLink>
                    </Link>
                  </NotiBox>
                )
              )}
              <ShareBox>
                <ShareIconBox
                  ref={ModalRef}
                  onClick={() => setIsShowModal(true)}
                >
                  <Image
                    src={"/shareIcon.svg"}
                    alt={"공유 아이콘"}
                    width={61}
                    height={61}
                  />
                  {isShowModal && (
                    <BubbleBox>
                      <BubbleTitle className="regular f20">
                        스토리를 SNS에 공유해보세요.
                      </BubbleTitle>
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
                  <LikeButton
                    content={"story"}
                    id={story.data.targetStory.id}
                    liked={story.data.targetStory.liked}
                    likeCount={story.data.targetStory.likeCount}
                    size={74}
                    isCount={false}
                  />
                </ShareIconBox>
              </ShareBox>
            </ContentContainer>
          </section>

          <OrderStoryContainer>
            {story.data.prev && (
              <OrderStoryBox>
                <OrderStoryTitle className="bold f40">
                  이전 게시물
                </OrderStoryTitle>
                <RowStoryCard data={story.data.prev} />
              </OrderStoryBox>
            )}
            {story.data.next && (
              <OrderStoryBox>
                <OrderStoryTitle className="bold f40">
                  다음 게시물
                </OrderStoryTitle>
                <RowStoryCard data={story.data.next} />
              </OrderStoryBox>
            )}
          </OrderStoryContainer>
        </>
      )}
    </StoryDetailContainer>
  );
}

const StoryDetailContainer = styled.main`
  padding-top: 110px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1440px) {
    padding-top: 80px;
  }
`;

const StoryDetailHeader = styled.div`
  position: relative;
  width: 100%;
  height: 855px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin-bottom: 120px;
  @media screen and (max-width: 1440px) {
    height: 350px;
    margin-bottom: 100px;
  }
  @media screen and (max-width: 1440px) {
    height: 300px;
    margin-bottom: 50px;
  }
`;

const HeaderBox = styled.div`
  width: 1420px;
  display: flex;
  flex-direction: column;
  padding: 4.0625rem 0;
  margin: 0 auto;
  z-index: 10;
  @media screen and (max-width: 1440px) {
    width: 80vw;
  }
`;

const HeaderDate = styled.time`
  color: var(--white-color);
`;

const RowFlex = styled.div`
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: start;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 6.25rem;
  line-height: 7.5rem;
  margin-right: 5.8125rem;
  color: var(--white-color);
  @media screen and (max-width: 700px) {
    margin-right: 0;
  }
`;

const IconFlex = styled.div`
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
`;

const IconSpan = styled.span`
  margin-left: 1.25rem;
  color: var(--white-color);
`;

const ContentContainer = styled.div`
  width: 1420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--black-color);
  @media screen and (max-width: 1440px) {
    width: 80vw;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 110px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 80px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 40px;
  }
`;

const ContentText = styled.h2`
  color: var(--black-color);
  margin-bottom: 85px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 65px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 45px;
  }
`;

const TagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.625rem;
  border: 1px solid var(--secondary-color);
  border-radius: 20px;
  margin-bottom: 90px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 70px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 40px;
  }
`;

const NotiText = styled.span`
  text-align: center;
  color: var(--black-color);
  margin-bottom: 2.8125rem;
`;

const SignupLink = styled.span`
  text-align: center;
  padding: 0.3125rem;
  cursor: pointer;
  border-bottom: 1px solid var(--secondary-color);
`;

const ShareBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ShareIconBox = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  cursor: pointer;
  :first-child {
    margin-right: 2.75rem;
  }
  margin-bottom: 6.875rem;
  position: relative;
`;

const BubbleBox = styled.div`
  position: absolute;
  top: 180px;
  left: -28px;
  background: #ffffff;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  padding: 2.5rem 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BubbleTitle = styled.h3`
  color: var(--black-color);
  margin-bottom: 1.25rem;
`;

const BubbleIconContainer = styled.div`
  display: flex;
`;

const BubbleIconBox = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 0.9375rem;
  border-radius: 100%;
  background: var(--third-color);
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
`;

const OrderStoryContainer = styled.section`
  width: 1420px;
  margin: 0 auto;
  margin-bottom: 11.25rem;
  @media screen and (max-width: 1440px) {
    width: 80vw;
    margin-bottom: 60px;
  }
`;

const OrderStoryBox = styled.div`
  margin: 3.125rem 0 1.875rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const OrderStoryTitle = styled.h3`
  margin-bottom: 1.875rem;
`;
