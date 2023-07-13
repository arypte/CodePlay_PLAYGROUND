import "../style/rafflebox.css";
import React, { useEffect } from "react";

const RaffleCard = ({ r_data }) => {
  const handleEntry = () => {
    console.log(`Entering raffle for ${r_data.name}`);
  };

  return (
    <div className="product-box ">
      <img className="product-image" src ={r_data.url}></img>
      <div className="product-info">
        <h3>{r_data.name}</h3>
        <button className="raffle-button" onClick={handleEntry}>
          자세히보기
        </button>
      </div>
    </div>
  );
};

export default RaffleCard;
