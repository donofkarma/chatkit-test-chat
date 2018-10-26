import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Chat from "./Chat";
import BackIcon from "./back-icon.svg";
import "./RoomList.css";

class RoomList extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired
  };

  state = {
    selectedRoom: null
  };

  handleBackAction = e => {
    e.preventDefault();

    this.setState({
      selectedRoom: null
    });
  };

  handleRoomChange = e => {
    e.preventDefault();

    this.setState({
      selectedRoom: e.target.dataset.roomId
    });
  };

  render() {
    const { currentUser } = this.props;

    if (this.state.selectedRoom) {
      return (
        <Fragment>
          <button
            className="chat-back-button"
            onClick={this.handleBackAction}
            type="button"
          >
            <img alt="" src={BackIcon} />
            <span>Back</span>
          </button>
          <Chat currentUser={currentUser} roomId={this.state.selectedRoom} />
        </Fragment>
      );
    }

    return (
      <article className="rooms">
        <h2 className="rooms-title">Your Rooms</h2>

        <ul className="rooms-list">
          {currentUser.rooms.map(item => (
            <li key={item.id}>
              <button
                className="rooms-list-button"
                data-room-id={item.id}
                onClick={this.handleRoomChange}
                type="button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}

export default RoomList;
