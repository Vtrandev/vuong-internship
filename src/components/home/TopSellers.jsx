import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSellers();
    setLoading(false);
  }, [loading])
  

  async function fetchTopSellers() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    setTopSellers(data);
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp topseller__skeleton--author skeleton-box">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="topseller__skeleton--name"></div>
                        <div className="topseller__skeleton--price"></div>
                      </div>
                    </li>
                  ))
                : topSellers.map((sellers, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={sellers.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{sellers.authorName}</Link>
                        <span>{sellers.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
