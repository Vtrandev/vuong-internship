import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";

const ExploreItems = () => {
  const [nftItem, setNftItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchItem();
      setLoading(false)
    }, 1500);
  }, [loading])

  async function fetchItem() {
    const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore')
    setNftItem(data);
  }

  async function filterItem(value) {
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    setLoading(false)
    setNftItem(data)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => filterItem(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? 
      new Array(8).fill(0).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <Card item={item} loading={loading} />
        </div>
      )):
        nftItem.slice(0, 8).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <Card item={item} index={index}/>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
