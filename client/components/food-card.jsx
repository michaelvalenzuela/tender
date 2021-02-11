import React from "react";
import Categories from "./categories";
import StarRating from "./star-rating";

export default class FoodCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    //Change info into props should be populated from the list
    return(
      <div className="card align-center" style={{maxWidth: "300px"}}>
        <img className="card-img-top" style={{maxHeight:"350px"}} src="https://s3-media4.fl.yelpcdn.com/bphoto/SGCzykeI6epmAYBtBjHjsw/o.jpg" alt="Food Picture"/>
        <div className="card-body">
          <h5 className="card-title">Food Place Name</h5>
          <h6 style={{fontSize: "14px", lineHeight:".5px"}}>Cerritos, CA</h6>
          <StarRating rating="4.5" reviewCount="100"/>
          <Categories categories={[{ title: "Sandwiches" }, { title: "Burgers" }, { title: "Chicken" }]} />
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-danger"><i className="fas fa-times"></i></button>
            {/* Change this to the yelp button */}
            <button className="btn"><i className="fab fa-yelp"></i></button>
            <button className="btn btn-success"><i className="fas fa-check"></i></button>
          </div>
        </div>
      </div>
    );
  }
}
