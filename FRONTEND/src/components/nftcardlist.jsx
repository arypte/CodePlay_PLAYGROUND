import React, { useEffect } from 'react';
import '../style/mypage.css';
import { Link } from 'react-router-dom';
const Nftcardlist = ({ data }) => {
  return (
    <Link to={`/NFTDetail/${data.id}`}>
      <div className="nft-item">
        <img src="nft1.png" alt="NFT 1" />
        <div className="nft-overlay">
          <span>
            {data.day}
            {data.type}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Nftcardlist;
