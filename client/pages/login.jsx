import React from 'react';
import AppContext from '../lib/app-context';

export default class Login extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    return (
      <div className="signin container">
        <form className="form-signin d-flex flex-column">
          <label className="mt-4">Room Code
            <input type="text" className="form-control mt-1" placeholder="ENTER ROOM CODE"/>
          </label>
          <label className="mt-4">NAME
            <input type="text" className="form-control mt-1" placeholder="ENTER NAME"/>
          </label>
          <button className="mt-5 btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

Login.contextType = AppContext;
