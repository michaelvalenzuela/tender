import React from 'react';
import AppContext from '../lib/app-context';

export default class ChatRoom extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 col-sm-2">
            <h4 className="text-center">Room:</h4>
            <h5 className="text-center mt-1">ABCD</h5>
            <h4 className="text-center mt-4">Users</h4>
            {/* <ul></ul> */}
          </div>

          <div className="col-xs-10 col-sm-10">
            <div className="h-100 overflow-auto">
            </div>
            <div className="py-2 ps-2">
              <form id="chat-form" className="d-flex">
                <input id="msg" className="flex-grow-1" type="text" placeholder="Enter Message" required autoComplete="off" />
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
