import React from "react";
import Categories from "./categories";
import StarRating from "./star-rating";

export default class FoodCard extends React.Component{
  constructor(props){
    super(props);
    this.handleUserChoice = this.handleUserChoice.bind(this);
  }

  handleUserChoice(event){
    //Send this back to the user
    if(event.target.name === "like"){
      this.props.handleUserChoice(this.props.business);
    }
    else {
      this.props.handleUserChoice("");
    }
  }

  render(){
    //Change info into props should be populated from the list
    if(!this.props.business){
      return (<div/>);
    }

    const { name, rating, review_count, image_url, categories, url, location} = this.props.business;
    const {city, state} = location;

    return(
      <div className="card align-center" style={{maxWidth: "300px"}}>
        <img className="card-img-top" style={{maxHeight:"350px"}} src={image_url} alt="Food Picture"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 style={{fontSize: "14px", lineHeight:".5px"}}>{`${city}, ${state}`}</h6>
          <StarRating rating={rating} reviewCount={review_count}/>
          <Categories categories={categories} />
          <div className="d-flex justify-content-center align-items-center">
            <button onClick={this.handleUserChoice} className="btn btn-danger"><i className="fas fa-times"></i></button>
            <a href={url} rel="noopener noreferrer" target="_blank" className="btn"><i className="fab fa-yelp"></i></a>
            <button onClick={this.handleUserChoice} name="like" className="btn btn-success"><i className="fas fa-check"></i></button>
          </div>
        </div>
      </div>
    );
  }
}
