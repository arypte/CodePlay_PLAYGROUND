import React, { useEffect, useState } from "react";
import "../style/RFDetail.css";

const ATDetailPage = () => {
  const [nftData, setNftData] = useState({
    image: "",
    title: "",
  });

  useEffect(() => {
    fetchNftData();
  }, []);

  const fetchNftData = async () => {
    try {
      const response = await fetch("API_URL");
      const data = await response.json();

      setNftData({
        image: data.image,
        title: data.title,
      });
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }
  };

  const handleEntry = () => {
    console.log("Entering Auction...");
    // 응모하기 버튼 동작 내용
  };

  const handleUse = () => {
    console.log("Using...");
    // 사용하기 버튼 동작 내용
  };

  return (
    <div className="container">
      <div className="nft-details">
        <div className="nft-image">
          <img src={nftData.image} alt="NFT 이미지" />
        </div>
        <div className="nft-info">
          <h1 className="nft-title">{nftData.title}</h1>
          <p className="nft-description">{nftData.description}</p>
        </div>
      </div>
      <div className="buttons">
        <button className="button" onClick={handleEntry}>
          응모하기
        </button>
        <button className="button" onClick={handleUse}>
          사용하기
        </button>
      </div>
    </div>
  );
};

export default ATDetailPage;
