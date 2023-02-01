import { useRouter } from "next/router";
import styled from "styled-components";

export default function StoryDetail() {
  const router = useRouter();
  const { storyId } = router.query;
  return <StoryDetailContainer>StoryDetail - {storyId}</StoryDetailContainer>;
}

const StoryDetailContainer = styled.div`
  padding-top: 110px;
  width: 1920px;
  margin: 0 auto;
`;
