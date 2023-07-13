import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../style/home.css';

const Homepage = ({ account }) => {
  const cardTitle = '인기 경기';
  const tickets = [
    {
      title: '두산 베어스 vs 롯데 자이언츠',
      description: '다시 찾아온 빅매치!',
      image:
        'https://github.com/team-codeplay-project/images/blob/main/image1.png?raw=true',
    },
    {
      title: 'LG 트윈스 vs 기아 타이거즈',
      description: '호랑이 타이틀 매치',
      image: '/images/image6.png',
    },
    {
      title: 'SSG 랜더스 vs 두산 베어스',
      description: '연승의 주인공은?',
      image: '/images/image13.jpg',
    },
    {
      title: '한화 이글스 vs LG 트윈스',
      description: '5연패 신화, 한화 이글스',
      image: '/images/image11.jpg',
    },
  ];

  const cardTitle2 = '예정 경기';
  const popularGames = [
    {
      title: '두산 vs 키움',
      date: '7월 15일 토 14:00 PM',
      image: '/images/image3.png',
    },
    {
      title: '두산 VS 삼성',
      date: '7월 21일 금 17:00 PM',
      image: '/images/image12.jpg',
    },
    {
      title: '두산 vs 롯데',
      date: '7월 22일 토 15:00 PM',
      image: '/images/image1.png',
    },
    {
      title: '롯데 vs SSG ',
      date: '7월 29일 토 18:00 PM',
      image: '/images/image5.png',
    },
  ];

  return (
    <>
      <div className="black-shape-cotainer">
        <div className="black-shape text-white ">{cardTitle}</div>
        <div className="home-gallery">
          <div className="ticket-gallery mt-6 mb-6">
            <div className="gallery-container">
              {tickets.map((v, index) => (
                <div className="ticket-box" key={index}>
                  <div
                    className="ticket-image"
                    style={{ backgroundImage: `url(${v.image})` }}
                  ></div>
                  <div className="ticket-info">
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="black-shape-cotainer">
          <h1 className="black-shape text-white">{cardTitle2}</h1>
          <div className="icard-container">
            {popularGames.map((game, index) => (
              <div className="icard mt-1" key={index}>
                <div
                  className="icard-image-placeholder"
                  style={{ backgroundImage: `url(${game.image})` }}
                ></div>
                <div className="icard-content">
                  <h5 className="icard-title">{game.title}</h5>
                  <small className="icard-updated">{game.date}</small>
                  <div className="icard-button-container">
                    <div className="icard-button-wrapper">
                      <Link to="/GameDetail">
                        {' '}
                        <div className="icard-button">
                          <IoIosArrowForward className="icard-button-icon" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
