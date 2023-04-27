import React from "react";
import Skeleton from "../UI/Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width={546} height={485} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    <Skeleton width={300} height={40} />
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <Skeleton width={0} height={0} />
                    </div>

                    <div className="item_info_like">
                      <Skeleton width={0} height={0} />
                    </div>
                  </div>
                  
                    <Skeleton width={526} height={80} />
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={80} />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={125} height={20} />
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={80} />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={125} height={20} />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <Skeleton width={75} height={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
