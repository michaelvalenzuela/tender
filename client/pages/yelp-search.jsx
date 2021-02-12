import React from 'react';
import SearchBar from '../components/search-bar';
import SearchResult from '../components/search-result';

export default class YelpSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpBusinesses: [],
      isLoading: false
    };
    this.getYelpBusinesses = this.getYelpBusinesses.bind(this);
    // this.addYelpBusiness = this.addYelpBusiness.bind(this);
  }

  getYelpBusinesses(result) {
    this.setState({ yelpBusinesses: result });
  }

  //add later
  // removeYelpBusiness(){

  // }

  render() {
    return (
      <div>
        <SearchBar
          getYelpBusinesses={this.getYelpBusinesses}
        />
        {
          this.state.yelpBusinesses.map(business =>
            <SearchResult
              key={business.id}
              business={business}
              onAddYelp={this.props.onAddYelp}
            />
          )
        }
      </div>
    );
  }
}
