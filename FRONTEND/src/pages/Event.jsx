import React, { useContext, useEffect, useState } from 'react';
import '../style/rafflebox.css';
import axios from 'axios';
import RaffleCard from '../components/list_rafflecard';
import AuctionCard from '../components/list_auctioncard';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState();
  const [toggle, setToggle] = useState(false);
  const { account, getbalance } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [sp, setSp] = useState(1);
  const [items, setItems] = useState();
  let content;
  let buttonGroup = null;

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const onClickPage = (p) => () => {
    setSp(p);
  };

  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`page-button
          ${i + 1 === 1 ? 'text-white' : 'text-gray-400'}`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base"></span>
        </button>
      );
    }

    return pageArray;
  };

  const get_Raffle_Data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle`,
        {
          params: {
            isEnd: toggle,
          },
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );
      setdata(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getitem = async () => {
    setIsLoading(true);

    try {
      console.log(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${account.address}`
      );
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${account.address}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );
      setItems(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const get_Auction_Data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auction`,
        {
          params: {
            isEnd: toggle,
          },
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );
      setdata(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setPage((data.length + 1) / 2);
    }
  }, [data]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account) {
      navigate('/');
    }
    getbalance();
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      get_Raffle_Data();
    } else if (activeTab === 2) {
      get_Auction_Data();
    }
    setSp(1);
  }, [toggle]);

  useEffect(() => {
    if (activeTab === 1) {
      get_Raffle_Data();
    } else if (activeTab === 2) {
      get_Auction_Data();
    } else if (activeTab === 3) {
      getitem();
    }

    setSp(1);
  }, [activeTab]);

  if (activeTab === 1) {
    content = (
      <div className="product-box">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div>
            <div>{pageComp()}</div>
            <div>
              {data?.map((v, i) => {
                if (i == (sp - 1) * 2 || i == (sp - 1) * 2 + 1) {
                  return <RaffleCard r_data={v} key={i} />;
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    );
    buttonGroup = (
      <div className="button-group">
        <button className="ongoing-button" onClick={() => setToggle(false)}>
          {/* 진행 */}
        </button>
        <button className="completed-button " onClick={() => setToggle(true)}>
          {/* 마감 */}
        </button>
      </div>
    );
  } else if (activeTab === 2) {
    content = (
      <div className="product-box">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div>
            <div>{pageComp()}</div>
            <div>
              {data?.map((v, i) => {
                if (i == (sp - 1) * 2 || i == (sp - 1) * 2 + 1) {
                  return <AuctionCard r_data={v} key={i} />;
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    );
    buttonGroup = (
      <div className="button-group">
        <button className="ongoing-button" onClick={() => setToggle(false)}>
          {/* 진행 */}
        </button>
        <button className="completed-button" onClick={() => setToggle(true)}>
          {/* 마감 */}
        </button>
      </div>
    );
  } else if (activeTab === 3) {
    content = (
      <div>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div>
            <div>
              {items?.map((item) => (
                <div className="item-box" key={item.id}>
                  <div className="item">
                    <div className="item-image-container">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="item-image"
                      />
                    </div>
                    <div className="item-content">
                      <h3 className="item-name">{item.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="tab2-container shadow-md">
        <button
          className={`tab2 ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
          role="tab"
        >
          래플
        </button>
        <button
          className={`tab2 ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
          role="tab"
        >
          옥션
        </button>
        <button
          className={`tab2 ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabClick(3)}
          role="tab"
        >
          확인하기
        </button>
      </div>

      {buttonGroup}

      <div className="product-gallery min-h-[844px]">{content}</div>
    </>
  );
};

export default EventPage;
