import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";

import Chat from "./Chat";
import Login from "./Login";
import "./App.css";

class App extends Component {
  chatManager = null;
  currentUser = null;
  tokenProvider = null;

  state = {
    chatMessage: "",
    messages: []
  };

  componentDidMount() {
    console.log(process.env);

    this.tokenProvider = new Chatkit.TokenProvider({
      url: process.env.REACT_APP_TOKEN_URL
    });
  }

  handleLogin = username => {
    this.chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
      userId: username,
      tokenProvider: this.tokenProvider
    });

    this.chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        // re-render the child after we get back a user
        this.forceUpdate();
      })
      .catch(error => {
        console.log("error", { error });
        alert("It looks like you've entered the wrong creds.");
      });
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Chatkit Demo</h1>
        </header>
        {this.currentUser ? (
          <Chat currentUser={this.currentUser} />
        ) : (
          <Login handleLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default App;
