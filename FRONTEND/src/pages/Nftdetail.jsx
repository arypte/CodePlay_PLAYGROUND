import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/RFDetail.css';
import { AppContext } from '../App';
import axios from 'axios';

const NftDetail = () => {
  const [chkscreen, setChkScreen] = useState(false);

  const [data, setData] = useState();
  const { account, nft_c } = useContext(AppContext);
  const { idx } = useParams();
  const navigate = useNavigate();

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

  const refundticket = async (e) => {
    e.preventDefault();

    try {
      // console.log( account ) ;

      await nft_c.methods.refund(data.day, data.type).send({
        from: account.address,
      });

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/nft`,
        {
          data: {
            day: Number(data.day),
            type: Number(data.type),
            owner: account.address,
          },
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      console.log('delete end!');
      navigate('/mypage');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) {
      navigate('/');
    }
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
              <img src={`https://github.com/team-codeplay-project/images/blob/main/image5.png?raw=true`} alt="NFT 이미지" />
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
              <button className="button" onClick={refundticket}>
                환불하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NftDetail;
