import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Login.css";

class Login extends Component {
  static propTypes = { handleLogin: PropTypes.func.isRequired };

  state = {
    password: "",
    username: "jas"
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.handleLogin(this.state.username);
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { password, username } = this.state;

    return (
      <article className="login">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              onChange={this.handleInputChange}
              required
              type="text"
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              value={password}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </article>
    );
  }
}

export default Login;
