import React from "react";
import SearchBar from "../components/search-bar"
import SearchResult from "../components/search-result"

export default class YelpSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      yelpBusinesses: [],
      isLoading: false
    }
    this.getYelpBusinesses = this.getYelpBusinesses.bind(this);

    //Test data
    // {
    //   id: "2HpaSK_Z192prp_0yRKBMw",
    //     name: "Katsu Bar",
    //       image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/SGCzykeI6epmAYBtBjHjsw/o.jpg",
    //         rating: 4.5,
    //           review_count: 201,
    //             categories: ["Burgers", "Japanese", "Sandwiches"],
    //               url: "https://www.yelp.com/biz/katsu-bar-cerritos?adjust_creative=gAJmYlWMyrpK9vZqoYbqbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gAJmYlWMyrpK9vZqoYbqbg"
    // }


  }

  getYelpBusinesses(result){
    this.setState({yelpBusinesses: result});
  }

  render(){
    return(
      <div>
        <SearchBar
          getYelpBusinesses={this.getYelpBusinesses}
        />
        {
          this.state.yelpBusinesses.map((business) =>
            <SearchResult
              key={business.id}
              business={business}
            />
          )
        }
        {/* <SearchResult/> */}
      </div>
    );
  }
}
