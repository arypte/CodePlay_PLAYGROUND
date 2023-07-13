import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/rafflebox.css';

const RaffleCard = ({ r_data }) => {
  return (
    <div className="product-box">
      <img className="product-image" src={r_data.url} alt={r_data.name} />
      <div className="product-info">
        <h3>{r_data.name}</h3>

        <Link to={`/RfDetail/${r_data.id}`}>
          <button className="raffle-button">자세히보기</button>
        </Link>
      </div>
    </div>
  );
};

export default RaffleCard;
