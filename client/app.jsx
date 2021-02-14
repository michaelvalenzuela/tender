import React from 'react';
import Login from './pages/login';
import ChatRoom from './pages/chat-room';
import AppContext from './lib/app-context';
import PageContainer from './components/page-container';
import Header from './components/header';
import Footer from './components/footer';
import YelpSearch from './pages/yelp-search';
import parseRoute from './lib/parse-route';
import FoodChoice from './pages/food-choice';
import WaitRoom from './pages/wait-room';
import WinnerRoom from './pages/winner-room';
import client from './lib/client';

/**
 * Handles most things
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      room: '',
      yelpChoices: [],
      yelpWinner: {},
      client: client(),
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleAddYelpSearch = this.handleAddYelpSearch.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.onGameMessageReceived = this.onGameMessageReceived.bind(this);
    this.handleSendLikes = this.handleSendLikes.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

  }

  componentWillUnmount() {
    this.state.client.stopListeningGame();
  }

  handleSignIn(result) {
    // Change later
    const { username, room } = result;
    this.setState({ username, room });
    // Create a user class later
    this.state.client.joinRoom({ username, room });
    this.state.client.listenGame(this.onGameMessageReceived);
    // client.joinRoom({username, room});
    // client({username, room});
  }

  onGameMessageReceived(messageFromServer) {
    // Check for a waiting route, if it is then we wait for other users to finish
    if (messageFromServer.business) {
      this.setState({ yelpChoices: messageFromServer.business });
    }
    if(messageFromServer.yelpWinner){
      this.setState({ yelpWinner: messageFromServer.yelpWinner});
      // this.yelpWinner = messageFromServer.yelpWinner;
    }
    window.location.hash = messageFromServer.route;
  }

  handleSignOut() {
    this.setState({
      username: null,
      room: ''
    });
  }

  handleSendLikes(businesses){
    const messageToServer = {
      room: this.state.room,
      route: 'winner',
      yelpLikes: businesses
    }
    console.log(messageToServer);
    this.state.client.sendGameMessage(messageToServer);
  }

  handleAddYelpSearch(business) {
    // This wouldve gotten the list of choices from a user
    this.setState({ yelpChoices: business });
    console.log("add yelp:",business);
    // Send all that to the server
    // This is after the user has selected all of their businesses
    const messageToServer = {
      room: this.state.room,
      route: 'wait',
      business
    };
    this.state.client.sendGameMessage(messageToServer);
  }

  // This will start the game listener to pass notifications back and forth
  handleStartGame() {
    const messageToServer = {
      room: this.state.room,
      route: 'search'
    };
    this.state.client.sendGameMessage(messageToServer);
  }

  renderPage() {
    const { path } = this.state.route;
    const { username, room } = this.state;

    if (path === '' && !username) {
      return <Login onSignIn={this.handleSignIn} />;
    } else if (path === 'chat-room' && username) {
      return (
        <ChatRoom
          onSendMessage={
            message => {
              const messageToServer = { username, room, message };
              this.state.client.sendMessage(messageToServer);
            }
          }
          listenMessage={this.state.client.listenMessage}
          stopListening={this.state.client.stopListening}
          handleStartGame = {this.handleStartGame}
        />
      );
    } else if (path === 'search' && username) {
      return (
      <YelpSearch
        onAddYelp={this.handleAddYelpSearch}
      />
      );
    } else if (path === 'game' && username) {
      return (
        <FoodChoice
          yelpBusiness={this.state.yelpChoices}
          sendLikes={this.handleSendLikes}
        />
      );
    } else if (path === 'wait' && username) {
      return (
        <WaitRoom/>
      );
    }
      else if(path ==="winner" && username){
        return(
          <WinnerRoom
            business={this.state.yelpWinner}
          />
        );
      }
    else {
      return <Login onSignIn={this.handleSignIn} />;
    }
  }

  render() {
    const { username, room, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { username, room, route, handleSignIn, handleSignOut };
    return (
      // Add users and page routes
      <AppContext.Provider value={contextValue}>
        <>
          <Header/>
          <PageContainer>
            { this.renderPage() }
          </PageContainer>
          <Footer/>
        </>
      </AppContext.Provider>
    );
  }
}
