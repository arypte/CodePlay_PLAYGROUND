import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/RFDetail.css';
import { AppContext } from '../App';
import axios from 'axios';

const NftDetail = () => {
  const [chkscreen, setChkScreen] = useState(false);

  const [data, setData] = useState();
  const { account, nft_c } = useContext(AppContext);
  const { idx } = useParams();

  const get_Data = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nft/id/${idx}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      setData(response.data[0]);

      if (response.data[0].isUsed) setChkScreen(1);
      else setChkScreen(2);
    } catch (error) {
      console.error(error);
    }
  };

  const useticket = async (e) => {
    e.preventDefault();

    try {
      await nft_c.methods.use(data.day, data.type).send({
        from: account.address,
      });

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/nft/done`,
        {
          day: Number(data.day),
          type: Number(data.type),
          owner: account.address,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      get_Data();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_Data();
  }, []);

  return (
    <div className="container">
      {!data ? (
        <div> Loading </div>
      ) : (
        <div>
          <div className="nft-details">
            <div className="nft-image">
              <img src={data.url} alt="NFT 이미지" />
            </div>
            <div className="nft-info">
              <h1 className="nft-title">{data.name}</h1>
            </div>
          </div>
          {chkscreen === 1 ? (
            <div className="button"> 사용됨 </div>
          ) : (
            <div className="buttons">
              <button className="button" onClick={useticket}>
                사용하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NftDetail;
