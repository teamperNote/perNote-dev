import React from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import NoteTag from "./NoteTag";
function PerfumeStoryItem() {
  return (
    <ItemContainer>
      <ImageContainer>
        <SecretImage src="/perNoteBackImg.png"></SecretImage>
        <LikeButton>
          <FiHeart />
        </LikeButton>
      </ImageContainer>
      <TextContainer>
        <Date>2022.11.01</Date>
        <Title>향수의 비밀</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit
          malesuada pulvinar in nulla.
        </Description>
        <TagContainer>
          <NoteTag>AQUATIC</NoteTag>
          <NoteTag>WOODY</NoteTag>
          <NoteTag>AQUATIC</NoteTag>
        </TagContainer>
        <UserAccess>
          <Like>
            <FiHeart size="18px" />
            <span>108</span>
          </Like>
          <Watch>
            <AiOutlineEye size="22px" />
            <span>108</span>
          </Watch>
        </UserAccess>
      </TextContainer>
    </ItemContainer>
  );
}

export default PerfumeStoryItem;

const ItemContainer = styled.div`
  width: 554px;
  height: 731px;
  border: 1px solid black;
  font-size: 0px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const SecretImage = styled.img`
  width: 554px;
  height: 370px;
`;

const LikeButton = styled.div`
  position: absolute;
  top: 35px;
  right: 35px;
  font-size: 2rem;
`;

const TextContainer = styled.div`
  background-color: #d9d9d9;
  padding-top: 30px;
  padding-left: 34px;
  height: 361px;
`;

const Date = styled.div`
  color: #595757;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
`;

const Description = styled.div`
  margin-top: 10px;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  color: #595757;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TagContainer = styled.div`
  margin-top: 25px;
`;

const UserAccess = styled.div`
  display: flex;
  margin-top: 26px;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  span {
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    margin-left: 10px;
  }
`;

const Watch = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    margin-left: 10px;
  }
`;
