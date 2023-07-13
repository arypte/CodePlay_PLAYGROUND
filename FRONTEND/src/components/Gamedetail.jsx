import React from "react";
import { Link } from "react-router-dom";
import "../style/RFDetail.css";

const GameDetailPage = () => {
  const handleEntry = () => {
    console.log("BUYING...");
  };

  return (
    <div className="container">
      <div className="nft-details">
        <div className="nft-image">
          <img src="/images/image12.jpg" alt="NFT 이미지" />
        </div>
        <div className="nft-info">
          <h1 className="nft-title">두산 베어스 VS 삼성 라이온즈</h1>
          <p className="nft-description">7월 21일 금 17:00 PM</p>
        </div>
      </div>
      <div className="buttons">
        <Link to="/" className="button">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default GameDetailPage;
