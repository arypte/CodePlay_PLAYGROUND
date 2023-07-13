import React from "react";
import { Link } from "react-router-dom";
import "../style/rafflebox.css";

const AuctionCard = ({ r_data }) => {
  const handleEntry = () => {
    console.log(`Entering raffle for ${r_data.name}`);
  };

  return (
    <div className="product-box ">
      <img className="product-image" src={r_data.url}></img>
      <div className="product-info">
        <h3>{r_data.name}</h3>
        <Link to={`/ATDetail`}>
          <button className="raffle-button" onClick={handleEntry}>
            자세히보기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
