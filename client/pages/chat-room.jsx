import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

/**
 * This class should strictly deal with the ChatRoom
 */
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.updateChat = this.updateChat.bind(this);
  }

  componentDidMount() {
    this.props.listenMessage(this.onMessageReceived);
  }

  componentDidUpdate() {
    const $chatDiv = document.getElementById('chatDiv');
    $chatDiv.scrollTop = $chatDiv.scrollHeight;
  }

  componentWillUnmount() {
    this.props.stopListening();
  }

  onMessageReceived(msg) {
    this.updateChat(msg);
  }

  updateChat(msg) {
    this.setState({ chatMessages: this.state.chatMessages.concat(msg) });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Submit means to enter
    // Send message from client to server
    this.props.onSendMessage(this.state.message);
    // Return to empty message
    return this.setState({ message: '' });
    // When we return from this, we should update the chatMessages
    // rerender
  }

  render() {
    const { username, room } = this.context;
    const { handleChange, handleSubmit } = this;

    if (!username) return <Redirect to="" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 col-sm-2">
            <h4 className="text-center">Room:</h4>
            <h5 className="text-center mt-1">{room}</h5>
            <h4 className="text-center mt-4">Users</h4>
            <ul
              className="m-1 p-1"
              style={{ listStyle: 'none', textAlign: 'center' }}>
              <li>{username}</li>
              <li>fill</li>
              <li>fill2</li>
              <li>fill3</li>
            </ul>
          </div>

          <div className="col-xs-10 col-sm-10">
            <div
              id="chatDiv"
              className="h-100 overflow-auto">
              <ul
                  className="m-1 p-1"
                  style={{ listStyle: 'none', height: '40px' }}>
                {
                  // Add user, msg, time for later
                  this.state.chatMessages.map((msg, i) =>
                    <li key={i}>
                      {msg}
                    </li>
                  )
                }
              </ul>
            </div>
            <div className="py-2 ps-2">
              {/* //Chat messages */}
              <form id="chat-form" className="d-flex" onSubmit={handleSubmit}>
                <input
                  id="message"
                  name="message"
                  value={this.state.message}
                  className="flex-grow-1 p-1"
                  type="text"
                  placeholder="Enter Message"
                  required
                  onChange={handleChange}
                  autoComplete="off" />
                <button className="btn btn-primary ms-2">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.contextType = AppContext;
