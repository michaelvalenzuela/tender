import React from 'react';
import AppContext from '../lib/app-context';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {username, room } = this.state;
    // No auth for now
    // Send the username and room to chat room
    this.props.onSignIn({username, room});
    window.location.hash = "chat-room";

  }

  render() {
    const { username, room, route } = this.context;

    const { handleChange, handleSubmit } = this;

    return (
      <div className="signin container">
        <form className="form-signin d-flex flex-column" onSubmit={handleSubmit}>
          <label className="mt-4">Room Code
            <input
              type="text"
              id="room"
              name="room"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="ENTER ROOM CODE"/>
          </label>
          <label className="mt-4">NAME
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="ENTER NAME"/>
          </label>
          <button
            className="mt-5 btn btn-lg btn-primary btn-block"
            type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

Login.contextType = AppContext;
