import React from "react";
import Categories from "./categories";
import StarRating from "./star-rating";

export default function WinnerCard(props){
  if (!props.business) {
    return (<div />);
  }

  const { name, rating, review_count, image_url, categories, url, location } = this.props.business;
  const { city, state } = location;

  return(
    <div className="card align-center" style={{ maxWidth: "300px" }}>
      <img className="card-img-top" style={{ maxHeight: "350px" }} src={image_url} alt="Food Picture" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 style={{ fontSize: "14px", lineHeight: ".5px" }}>{`${city}, ${state}`}</h6>
        <StarRating rating={rating} reviewCount={review_count} />
        <Categories categories={categories} />
        <div className="d-flex justify-content-center align-items-center">
          <a href={url} rel="noopener noreferrer" target="_blank" className="btn"><i className="fab fa-yelp"></i></a>
        </div>
      </div>
    </div>
  );
}
