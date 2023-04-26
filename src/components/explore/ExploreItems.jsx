import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";

const ExploreItems = () => {
  const [nftItem, setNftItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slice, setSlice] = useState(8);

  useEffect(() => {
    setTimeout(() => {
      setSlice(8);
      fetchItem();
      setLoading(false);
    }, 1500);
  }, []);

  async function fetchItem() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setNftItem(data);
  }

  async function filterItem(value) {
    setLoading(true);
    setSlice(8);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setNftItem(data);
    setLoading(false);
  }

  function loadMore(add) {
    slice < 16 && setSlice(slice + add);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterItem(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Card item={item} loading={loading} />
            </div>
          ))
        : nftItem.slice(0, slice).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Card item={item} index={index} />
            </div>
          ))}
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => loadMore(4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
