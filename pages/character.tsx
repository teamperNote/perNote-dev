import type { NextPage } from "next";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Pagination from "@mui/material/Pagination";
import Options from "../components/Options";

const character: NextPage = () => {
  return (
    <div className="container">
      <div className="feature-container">
        <Options options={options1} />
        <Options options={options2} />
      </div>
      <div className="dropdown-container">
        <Dropdown />
      </div>
      <div className="card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="pagination-box">
        <Pagination count={10} />
      </div>
      <style jsx>{`
        .container {
          width: 1280px;
          margin: 0 auto;
        }
        .feature-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 41px 0 36px 0;
        }
        .dropdown-container {
          display: flex;
          justify-content: flex-end;
        }
        .card-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }
        .pagination-box {
          display: flex;
          justify-content: center;
          margin-bottom: 100px;
        }
      `}</style>
    </div>
  );
};

export default character;

const options1 = [
  {
    id: 1,
    name: "관능적인",
  },
  {
    id: 2,
    name: "남성적인",
  },
  {
    id: 3,
    name: "모험적인",
  },
  {
    id: 4,
    name: "생동감있는",
  },
  {
    id: 5,
    name: "섬세한",
  },
  {
    id: 6,
    name: "성숙한",
  },
];

const options2 = [
  {
    id: 1,
    name: "순수한",
  },
  {
    id: 2,
    name: "여성적인",
  },
  {
    id: 3,
    name: "차분한",
  },
  {
    id: 4,
    name: "청순한",
  },
  {
    id: 5,
    name: "편안한",
  },
  {
    id: 6,
    name: "활기찬",
  },
];
