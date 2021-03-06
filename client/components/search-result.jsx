import React from "react";
import StarRating from "../components/star-rating";
import Categories from "../components/categories";


export default class SearchResult extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.addLikedYelpBusiness(this.props.business);
    // this.props.onAddYelp(this.props.business);
    //For now to go to the next page
    // window.location.hash = "game";
  }

  render(){
    if (!this.props.business) {
      return (<div />);
    }

    const { name, rating, review_count, image_url, categories, url, onAddYelp } = this.props.business;

    return(
      <div className="row border mt-2">
        <div className="col col-lg-2 border border-end-0">
          <img className="img-thumbnail rounded" src={image_url} alt="test"/>
        </div>
        <div className="col-8 border border-start-0 border-end-0">
          <div className="row">
            <h3>{name}</h3>
          </div>
          <div className="row">
            <StarRating rating={rating} reviewCount={review_count}/>
          </div>
          <div className="row">
            <Categories categories={categories}/>
          </div>
          <div className="row d-inline-block">
            <a href={url} rel="noopener noreferrer" target="_blank">Go to Yelp Page</a>
          </div>
        </div>
        <div className="col col-lg-2 border text-center d-flex justify-content-center align-items-center border-start-0">
          <button onClick={this.handleClick} className="btn btn-primary">Add</button>
        </div>
      </div>
    );
  }
}
