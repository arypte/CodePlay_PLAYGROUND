import React from 'react';
import { Link } from 'react-router-dom';
import '../style/rafflebox.css';

const AuctionCard = ({ r_data }) => {
  return (
    <div className="product-box ">
      <img className="product-image" src={r_data.url}></img>
      <div className="product-info">
        <h3>{r_data.name}</h3>
        <Link to={`/ATDetail/${r_data.id}`}>
          <button className="raffle-button">자세히보기</button>
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
