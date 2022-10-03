import type { NextPage } from "next";
import { GrFormDown } from "react-icons/gr";

const Dropdown: NextPage = () => {
  return (
    <div className='dropdown'>
        <div className='dropdown-text'>인기순</div>
        <span className="icon">
            <GrFormDown />
        </span>
        <style jsx>{`
            .dropdown {
            display: flex;
            align-items: center;
            width: 298px;
            height: 37px;
            border-bottom: 2px solid black;
            margin: 0 5px 12px 0;
            }
            .dropdown-text {
            width: 253px;
            }
            .icon {
            padding: 0 20px;
            }
        `}</style>
  </div>
  );
};

export default Dropdown;
