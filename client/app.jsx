import React from 'react';
// import Home from './pages/home';
import Login from './pages/login';
import AppContext from './lib/app-context';
import PageContainer from './components/page-container';
import Header from './components/header';
import Footer from './components/footer';

export default class App extends React.Component {

  renderPage() {
    return <Login/>;
  }

  render() {
    const contextValue = {};
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
