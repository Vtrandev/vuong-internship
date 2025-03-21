import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const Card = ({ item, loading, collection }) => {
  const [time, setTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function Timing(expiryDate) {
    let milliseconds = expiryDate - time;
    let secondleft = milliseconds / 1000;
    let minutesLeft = secondleft / 60;
    let hoursLeft = minutesLeft / 60;

    let secText = Math.floor(secondleft) % 60;
    let minText = Math.floor(minutesLeft) % 60;
    let hrText = Math.floor(hoursLeft) % 60;

    return hrText + "h " + minText + "m " + secText + "s"
  }

  return (
    <>
      {loading ? (
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton width={50} height={50} borderRadius={50} />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft__item_wrap">
            <Skeleton width={250} height={250} borderRadius={5} />
          </div>

          <div className="nft__item_info">
            <h4>
              <Skeleton width={100} height={20} />
            </h4>
            <div className="nft__item_price">
              <Skeleton width={60} height={20} />
            </div>
            <div className="nft__item_like">
              <Skeleton width={40} height={20} />
            </div>
          </div>
        </div>
      ) : (
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to={`/author/${item.authorId || collection.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator:"
            >
              <img
                className="lazy"
                src={item.authorImage || collection.authorImage}
                alt=""
              />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {item.expiryDate && (
            <div className="de_countdown">{Timing(item.expiryDate)}</div>
          )}

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Link to={`/item-details/${item.nftId || collection.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to={`/item-details/${item.nftId || collection.nftId}`}>
              <h4>{item.title}</h4>
            </Link>
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
