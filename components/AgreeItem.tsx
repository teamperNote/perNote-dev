import styled from "styled-components";
import { IoIosCheckboxOutline } from "react-icons/io";

interface agreeProps {
  isCheckAll: boolean;
  text: string;
}
function AgreeItem({ isCheckAll, text }: agreeProps) {
  return (
    <div>
      {isCheckAll ? (
        <CheckItem>
          <label htmlFor="agree_all">
            <CheckIcon>
              <IoIosCheckboxOutline className="check-icon" />
            </CheckIcon>
          </label>
          <input
            type="checkbox"
            name="agree_all"
            id="agree_all"
            className="read-only"
          />
          <AllCheck>약관 전체 동의</AllCheck>
        </CheckItem>
      ) : (
        <CheckItem>
          <label htmlFor="agree"></label>
          <CheckIcon>
            <IoIosCheckboxOutline className="check-icon" />
          </CheckIcon>
          <input
            type="checkbox"
            name="agree"
            id="agree"
            className="read-only"
          />
          <CheckText>{text}</CheckText>
          <MoreText>보기</MoreText>
        </CheckItem>
      )}
    </div>
  );
}

export default AgreeItem;

const CheckItem = styled.li`
  width: 100%;
  margin: 17px 0;
  padding: 0 70px;
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 70px;
  color: #d9d9d9;
  .check-icon {
    width: 100%;
    height: 100%;
  }
`;

const AllCheck = styled.span`
  font-weight: 700;
  font-size: 35px;
`;

const CheckText = styled.span`
  font-weight: 400;
  font-size: 30px;
  flex-grow: 1;
`;

const MoreText = styled.span`
  font-weight: 400;
  font-size: 30px;
  display: inline-block;
  text-align: right;
  color: #d9d9d9;
`;
