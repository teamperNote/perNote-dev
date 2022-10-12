import type { NextPage } from "next";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Pagination from "@mui/material/Pagination";
import Options from "../components/Options";

const Note: NextPage = () => {
  return (
    <div className="container">
      <div className="feature-container">
        <Options options={options1} />
        <Options options={options2} />
        <Options options={options3} />
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

export default Note;

const options1 = [
  {
    id: 1,
    name: "AMBER",
  },
  {
    id: 2,
    name: "AQUATIC",
  },
  {
    id: 3,
    name: "AROMATIC",
  },
  {
    id: 4,
    name: "CHYPRE",
  },
  {
    id: 5,
    name: "CITRUS",
  },
  {
    id: 6,
    name: "COTTON",
  },
];

const options2 = [
  {
    id: 1,
    name: "FLORAL",
  },
  {
    id: 2,
    name: "FOUGERE",
  },
  {
    id: 3,
    name: "FRESH",
  },
  {
    id: 4,
    name: "FRUITY",
  },
  {
    id: 5,
    name: "GREEN",
  },
  {
    id: 6,
    name: "LEATHER",
  },
  {
    id: 7,
    name: "LEMONY",
  },
  {
    id: 8,
    name: "MINERAL",
  },
];
const options3 = [
  {
    id: 1,
    name: "MUSKY ORIENTAL",
  },
  {
    id: 2,
    name: "SPICY",
  },
  {
    id: 3,
    name: "SPOTIFY",
  },
  {
    id: 4,
    name: "WOODY",
  },
];
