import React from 'react';
import Login from './pages/login';
import ChatRoom from './pages/chat-room';
import AppContext from './lib/app-context';
import PageContainer from './components/page-container';
import Header from './components/header';
import Footer from './components/footer';
import YelpSearch from "./pages/yelp-search";
import parseRoute from './lib/parse-route';
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
      client: client(),
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

  }

  handleSignIn(result) {
    // Change later
    const { username, room } = result;
    this.setState({ username, room });
    // Create a user class later
    // Put the user inside of a chatroom'
    // console.log(client);
    this.state.client.joinRoom({ username, room });
    // client.joinRoom({username, room});
    // client({username, room});
  }

  handleSignOut() {
    this.setState({
      username: null,
      room: ''
    });
  }

  renderPage() {
    const { path } = this.state.route;
    return <YelpSearch/>;
    // Temporary to get the app started
    //Commenting until i finish the search page
    // if (path === 'chat-room') {
    //   const { username, room } = this.state;

    //   return (
    //     <ChatRoom
    //       onSendMessage={
    //         message => {
    //           const messageToServer = { username, room, message };
    //           this.state.client.sendMessage(messageToServer);
    //         }
    //       }
    //       listenMessage={this.state.client.listenMessage}
    //       stopListening={this.state.client.stopListening}
    //     />
    //   );
    // }
    // if (path === '') {
    //   return <Login onSignIn={this.handleSignIn}/>;
    // }
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
