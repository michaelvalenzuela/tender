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

  }

  getYelpBusinesses(result) {
    this.setState({ yelpBusinesses: result });
    window.location.hash = 'chat-room';
  }

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
            />
          )
        }
      </div>
    );
  }
}
