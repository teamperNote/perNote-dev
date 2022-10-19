import type { NextPage } from "next";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Pagination from "@mui/material/Pagination";
import Options from "../components/Options";

const characteristics: NextPage = () => {
  return (
    <div className="container">
      <div className="feature-container">
        <Options options={options1} />
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

export default characteristics;

const options1 = [
  {
    id: 1,
    name: "강렬한",
  },
  {
    id: 2,
    name: "경쾌한",
  },
  {
    id: 3,
    name: "고급스러운",
  },
  {
    id: 4,
    name: "깊은",
  },
  {
    id: 5,
    name: "모던한",
  },
  {
    id: 6,
    name: "산뜻한",
  },
  {
    id: 7,
    name: "신선한",
  },
  {
    id: 8,
    name: "풍부한",
  },
];
