import React from "react";
import FoodCard from "../components/food-card"

export default class FoodChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //Change later to deal with state, for now get it to work
      yelpBusiness: {},
      isPlaying: false
    };

    //List of Businesses from server
    this.yelpList = [];
    //List of BusinessLikes
    this.yelpLikes = [];
    this.handleUserChoice = this.handleUserChoice.bind(this);

  }

  //Pass a function to the foodCard, when they push like or dislike come back to here and do logic
  handleUserChoice(like){
    if(like){
      //Add to another array
    }
    else{
      //Remove from array
    }
  }
    //Change yelpBusiness state to the next card in the array

  // }

  //This page will be where users start to match their likes
  //The server will send the user a list
  //Once that list is sent, the user will begin to like or dislike
  //After each like or dislike the user will render a new card
  //If a card is liked then throw that card into an array
  //Once the end of the list is complete, send to the server and await other users
  //Once the server knows the winner
  //Send it back to the users
  //End game
  render(){
    //Add logic to only display this if yelpList is not empty, else display a Loading page waiting for other players...

    //for now
    return(
      <div className="d-flex justify-content-center align-items-center">
        <FoodCard
          business={this.props.yelpBusiness}
          handleUserChoice = {this.handleUserChoice}
        />
      </div>
    );
  }
}
