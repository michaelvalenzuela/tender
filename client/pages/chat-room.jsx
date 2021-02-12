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
      message: '',
      users: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.updateChat = this.updateChat.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
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

  // Modify all this... trash
  onMessageReceived(messageFromServer) {
    const { message, users, chatHistory } = messageFromServer;
    if (!this.state.chatMessages.length) {
      this.updateChatHistory(chatHistory);
    } else if (message) {
      this.updateChat(message);
    }

    if (users) {
      this.updateUsers(users);
    }
  }

  updateChat(message) {
    this.setState({ chatMessages: this.state.chatMessages.concat(message) });
  }

  updateUsers(users) {
    this.setState({ users });
  }

  updateChatHistory(chatHistory) {
    this.setState({ chatMessages: chatHistory });
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

  handleStartGame() {
    this.props.handleStartGame();
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
              {
                this.state.users.map((user, i) =>
                <li key={i}>
                  {user}
                </li>
                )}
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
            <div className="row">
              <button
                onClick={this.handleStartGame}
                className="btn btn-success">Start Game</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.contextType = AppContext;
