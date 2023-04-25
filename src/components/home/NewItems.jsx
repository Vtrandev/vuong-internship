import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItem, setNewItem] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchNewItem();
    timeSet();
    setLoadingState(false);
  }, [loadingState]);

  async function fetchNewItem() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItem(data);
  }

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };

  function timeSet() {
    setTime(Date.now());
  }

  function Timing(expiryDate) {
    let milliseconds = expiryDate - time;
    let secondleft = milliseconds / 1000;
    let minutesLeft = secondleft / 60;
    let hoursLeft = minutesLeft / 60;

    let secondsText = Math.floor(secondleft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft) % 60;

    return hoursText + "h " + minutesText + "m " + secondsText + "s";
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <ReactOwlCarousel className="navClass" {...options}>
            {loadingState
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp newitem__skeleton--author skeleton-box">
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap newitem__skeleton--nft skeleton-box"></div>
                    <div className="nft__item_info">
                      <h4 className="newitem__skeleton--title skeleton-box"></h4>
                      <div className="newitem__skeleton--price skeleton-box"></div>
                      <div className="nft__item_like newitem__skeleton--like skeleton-box"></div>
                    </div>
                  </div>
                ))
              : newItem.map((item, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        {Timing(item.expiryDate)}
                      </div>
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

                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
