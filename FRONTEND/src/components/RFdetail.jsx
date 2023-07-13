import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/RFDetail.css';
import { AppContext } from '../App';
import axios from 'axios';

const RfDetailPage = () => {
  const [chkscreen, setChkScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const { account, token_c } = useContext(AppContext);
  const { idx } = useParams();

  const get_R_data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${idx}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      setData(response.data);

      const endchk = response.data.isEnd;

      if (endchk == true) {
        setChkScreen(2);
      } else {
        const f_B = response.data.start_block; // fromBlock : 은 디비에서
        const a = await token_c.getPastEvents('Raffle', {
          filter: { _idx: idx },
          fromBlock: f_B,
          toBlock: 'latest',
        });

        for (const v of a) {
          const nowdata = v.returnValues._add.toLowerCase();
          if (nowdata === account) {
            setChkScreen(1);
            break; // 중지
          }
        }
      }

      setIsLoading(false);
      //console.log( 'chk_raffle!' ) ;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onclickRaffle_participate = async () => {
    setIsLoading(true);
    try {
      await token_c.methods.Raffle_participate(idx).send({ from: account });
      get_R_data();
    } catch (error) {
      setIsLoading(false);
      error(error);
    }
  };

  useEffect(() => {
    get_R_data();
  }, []);

  return (
    <div className="container">
      {!data ? (
        <div> Loading </div>
      ) : (
        <div>
          <div className="nft-details">
            <div className="nft-image">
              <div className="text-white">{isLoading}</div>

              <img src={data.url} alt="NFT 이미지" />
            </div>
            <div className="nft-info">
              <h1 className="nft-title">{data.name}</h1>
            </div>
          </div>
          {chkscreen === 2 ? (
            <div> 래플 종료 </div>
          ) : chkscreen === 1 ? (
            <div> 이미 참가 </div>
          ) : (
            <div className="buttons">
              <button className="button" onClick={onclickRaffle_participate}>
                응모하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RfDetailPage;
