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
    this.addedBusinesses = [];
    this.getYelpBusinesses = this.getYelpBusinesses.bind(this);
    this.addLikedYelpBusiness = this.addLikedYelpBusiness.bind(this);
    this.onAddYelpLikes = this.onAddYelpLikes.bind(this);
  }

  getYelpBusinesses(result) {
    if (this.addedBusinesses.length !== 0) {
      result = result.filter(({ id: idResult }) => !this.addedBusinesses.some(({ id: idLikedBusiness }) => idResult === idLikedBusiness));
    }
    this.setState({ yelpBusinesses: result });
  }

  // 2 layers of adding, add to the list of this
  // Once the list is ready, use the onAddYelp to send the list to the APP
  // App will then send a message

  // This will remove it from the list and trigger a reRender
  addLikedYelpBusiness(business) {
    this.addedBusinesses.push(business);
    const removedYelpList = this.state.yelpBusinesses.filter(x => x.id !== business.id);
    this.setState({ yelpBusinesses: removedYelpList });
  }

  onAddYelpLikes() {
    this.props.onAddYelp(this.addedBusinesses);
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.onAddYelpLikes} className="btn btn-primary">Done Searching</button>
        </div>
        <div>
          <SearchBar
            getYelpBusinesses={this.getYelpBusinesses}
          />
          {
            this.state.yelpBusinesses.map(business =>
              <SearchResult
                key={business.id}
                business={business}
                // onAddYelp={this.props.onAddYelp}
                addLikedYelpBusiness={this.addLikedYelpBusiness}
              />
            )
          }
        </div>
      </div>

    );
  }
}
