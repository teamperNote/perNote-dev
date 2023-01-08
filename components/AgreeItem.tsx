import styled from "styled-components";
import { IoIosCheckboxOutline } from "react-icons/io";
function AgreeItem(props) {
  return (
    <div>
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

      <CheckItem>
        <label htmlFor="agree"></label>
        <CheckIcon>
          <IoIosCheckboxOutline className="check-icon" />
        </CheckIcon>
        <input type="checkbox" name="agree" id="agree" className="read-only" />
        <CheckText>[필수] 이용약관 동의</CheckText>
        <MoreText>보기</MoreText>
      </CheckItem>

      <CheckItem>
        <label htmlFor="agree"></label>
        <CheckIcon>
          <IoIosCheckboxOutline className="check-icon" />
        </CheckIcon>
        <input type="checkbox" name="agree" id="agree" className="read-only" />
        <CheckText>[필수] 개인정보 수집 및 이용 동의</CheckText>
        <MoreText>보기</MoreText>
      </CheckItem>

      <CheckItem>
        <label htmlFor="agree"></label>
        <CheckIcon>
          <IoIosCheckboxOutline className="check-icon" />
        </CheckIcon>
        <input type="checkbox" name="agree" id="agree" className="read-only" />
        <CheckText>[선택] 광고성 메세지 수신 동의</CheckText>
        <MoreText>보기</MoreText>
      </CheckItem>

      <CheckItem>
        <label htmlFor="agree"></label>
        <CheckIcon>
          <IoIosCheckboxOutline className="check-icon" />
        </CheckIcon>
        <input type="checkbox" name="agree" id="agree" className="read-only" />
        <CheckText>[선택] 마케팅 정보 수집 동의</CheckText>
        <MoreText>보기</MoreText>
      </CheckItem>
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
