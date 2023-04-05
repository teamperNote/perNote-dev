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
        params: { userId: "64023ce1c704c82c11f5df20", storyId: storyId },
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
          <StoryDetailHeader>
            <Image
              src={story.data.targetStory.imgUrl[0]}
              alt={"스토리 메인 이미지"}
              width={1920}
              height={855}
              objectFit={"cover"}
              style={{ zIndex: "-1" }}
            />
            <HeaderBox>
              <HeaderDate>
                {dateFormat(story.data.targetStory.createdAt)}
              </HeaderDate>
              <RowFlex>
                <HeaderTitle>{story.data.targetStory.title}</HeaderTitle>
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
                    style={{ marginRight: "20px" }}
                  />
                  <IconSpan>{story.data.targetStory.viewCount}</IconSpan>
                </IconBox>
              </RowFlex>
            </HeaderBox>
          </StoryDetailHeader>
          <ContentContainer>
            <ContentBox>
              <ContentText>{story.data.targetStory.body}</ContentText>
              <TagBox className={"regular f30"}>
                {story.data.targetStory.tags.map((tag, idx) => (
                  <NoteTag key={idx} from={"StoryDetail"} text={tag} />
                ))}
              </TagBox>
            </ContentBox>
            {!loginInfo ? (
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
                <Image
                  src={"/shareIcon.svg"}
                  alt={"공유 아이콘"}
                  width={61}
                  height={61}
                />
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
          <OrderStoryContainer>
            {story.data.prev && (
              <OrderStoryBox>
                <OrderStoryTitle>이전 게시물</OrderStoryTitle>
                <RowStoryCard data={story.data.prev} />
              </OrderStoryBox>
            )}
            {story.data.next && (
              <OrderStoryBox>
                <OrderStoryTitle>다음 게시물</OrderStoryTitle>
                <RowStoryCard data={story.data.next} />
              </OrderStoryBox>
            )}
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin-bottom: 120px;
`;

const HeaderBox = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 65px 250px;
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
  margin-bottom: 7px;
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

const ContentText = styled(HeaderDate)`
  color: var(--black-color);
  font-size: 35px;
  line-height: 51px;
  margin-bottom: 100px;
`;

const TagBox = styled.ul`
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
