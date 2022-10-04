/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";

const Card: NextPage = () => {
  return (
    <a className="card-container" href="/qwe">
        <img className="item-img" src="https://static.wixstatic.com/media/a9ff3b_b2039d1e6a954631a41b85d674400f19.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a9ff3b_b2039d1e6a954631a41b85d674400f19.jpg"/>
        <div className="item-name">
            제품명
        </div>
        <div className="item-price">₩85</div>
      <style jsx>{`
        .card-container {
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 361px;
        }
        .item-img {
            width: 300px;
            height: 300px;
        }
        .item-name {
            margin-top: 16px;
        }
        .item-price {
            margin-top: 5px;
            color: #757575;
            font-size: 13px;
        }
      `}</style>
    </a>
  );
};

export default Card;
