import React from "react";

export default function Categories(props){
  //Yelp returns an array of objects
  const {categories} = props;
  const titles = categories.map(category => category.title);
  const text = titles.join(", ");

  return(
    <p>{text}</p>
  );
}
