import React from "react";

//Add more styling later
export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      category: "",
      location: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(`/api/yelp/search/${this.state.location}/${this.state.category}`, req)
      .then(res => res.json())
      .then(result => {
        this.props.getYelpBusinesses(result);
      });
  }

  render(){
    const { handleChange, handleSubmit } = this;
    return(
      <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold" }} className="p-1">FIND
            <input
              type="text"
              id="category"
              name="category"
              value={this.state.category}
              onChange={handleChange}
              required
              className="m-1 ps-1"
              placeholder="food"
              />
          </label>
          <label style={{fontWeight:"bold"}} className="p-1">NEAR
            <input
              type="text"
              id="location"
              name="location"
              value={this.state.location}
              onChange={handleChange}
              required
              className="m-1 ps-1"
              placeholder="address, state or zip"
            />
          </label>
          <button className="btn"><i className="fas fa-search"></i></button>
        </form>
      </div>
   );
  }
}
