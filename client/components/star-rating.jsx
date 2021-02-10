import React from "react";

export default function StarRating(props){
  const {rating, reviewCount} = props;
  const maxRating = 5;
  let fullStars = Math.floor(rating);
  let halfStars = Math.ceil(rating%1);
  const starList = [];

  for(let i = 0; i < maxRating; i++){
    if(fullStars !== 0){
      starList.push("fa fa-star");
      fullStars--;
    }
    else if(halfStars !== 0){
      starList.push("fas fa-star-half-alt");
      halfStars--;
    }
    else{
      starList.push("far fa-star")
    }
  }

  return(

    <i className={starList[0]}>
      <i className={starList[1]}></i>
      <i className={starList[2]}></i>
      <i className={starList[3]}></i>
      <i className={starList[4]}></i>
      <h5 className="d-inline-block ps-2">{reviewCount}</h5>
    </i>

  );
}
