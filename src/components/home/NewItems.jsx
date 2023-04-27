import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItem, setNewItem] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    fetchNewItem();
  }, [loadingState]);

  async function fetchNewItem() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItem(data);
    setLoadingState(false);
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
              ? new Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index} loading={loadingState} />
                  ))
              : newItem.map((item, index) => (
                  <Card item={item} key={index} />
                ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
