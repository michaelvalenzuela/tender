import React from 'react';
import Login from './pages/login';
import ChatRoom from './pages/chat-room';
import AppContext from './lib/app-context';
import PageContainer from './components/page-container';
import Header from './components/header';
import Footer from './components/footer';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      room: "",
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
    const {username, room } = result;
    this.setState({ username, room});
  }

  handleSignOut() {
    this.setState({
       username: null,
       room:""
    });
  }

  renderPage() {
    const { path } = this.state.route;
    //Switch
    if(path === 'chat-room'){
      return <ChatRoom />;
    }
    if (path === ""){
          return <Login onSignIn={this.handleSignIn}/>;
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
