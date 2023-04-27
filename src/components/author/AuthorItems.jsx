import React from "react";
import Card from "../UI/Card";

const AuthorItems = ({ collection, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <Card loading={loading} />
                </div>
              ))
            : collection.nftCollection.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <Card item={nft} loading={loading} collection={collection} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
