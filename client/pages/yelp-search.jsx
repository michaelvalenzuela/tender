import React from "react";
import SearchBar from "../components/search-bar"

export default class YelpSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      yelpBusinesses: []
    }
  }

  render(){
    return(
      <SearchBar/>
    );
  }
}
