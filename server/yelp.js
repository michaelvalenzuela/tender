const fetch = require('node-fetch');

class YelpApi {
  constructor(apiKey){
    this.apiKey = apiKey;
  }

  async getYelpBusinesses(location, category){
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=${category}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Origin': 'localhost',
        'withCredentials': true,
        'Content-type': "application/json"
      }
    });
    const data = await response.json();
    return data.businesses;
  }
}

module.exports = YelpApi;
