import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const Author = () => {
  const [authorItems, setAuthorItems] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      fetchAuthorItems();
    }, 500);
  }, [loading]);

  async function fetchAuthorItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorItems(data);
    setLoading(false);
  }

  function follow() {
    setFollowing(!following);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={150} height={150} borderRadius={80} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <div>
                            <h4>
                              <Skeleton width={200} height={24} />
                            </h4>

                            <span className="profile_username">
                              <Skeleton width={200} height={16} />
                            </span>

                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={200} height={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={150} height={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItems.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName}
                            <span className="profile_username">
                              @{authorItems.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {following
                            ? authorItems.followers + 1
                            : authorItems.followers}{" "}
                          followers
                        </div>
                        <Link to="#" className="btn-main" onClick={follow}>
                          {following ? "Unfollow" : "follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collection={authorItems} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
