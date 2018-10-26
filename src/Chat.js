import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Chat.css";

const ChatMessage = ({ currentUserId, message }) => {
  let className = "chat-message";
  if (currentUserId === message.senderId) {
    className += " chat-message__sent";
  }

  return (
    <li className={className}>
      <div>{message.text}</div>
      <span className="chat-message-date">{message.createdAt}</span>
    </li>
  );
};

class Chat extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    roomId: PropTypes.string.isRequired
  };

  state = {
    chatMessage: "",
    isUserTyping: false,
    messages: [],
    typingUser: null
  };

  componentDidMount() {
    this.subscribeToRoom();
  }

  subscribeToRoom() {
    const { currentUser, roomId } = this.props;

    currentUser.subscribeToRoom({
      roomId: Number(roomId),
      hooks: {
        onNewMessage: this.handleNewMessage,
        onUserStartedTyping: this.handleUserStartedTyping,
        onUserStoppedTyping: this.handleUserStoppedTyping
      }
    });
  }

  handleChatSubmit = e => {
    const { currentUser, roomId } = this.props;

    e.preventDefault();

    currentUser.sendMessage({
      text: this.state.chatMessage,
      roomId: Number(roomId)
    });

    this.setState({
      chatMessage: ""
    });
  };

  handleInputChange = e => {
    const { currentUser, roomId } = this.props;

    this.setState({
      [e.target.id]: e.target.value
    });

    if (e.target.id === "chatMessage" && e.target.value !== "") {
      currentUser.isTypingIn({
        roomId: Number(roomId)
      });
    } 
  };

  handleNewMessage = message => {
    const { messages } = this.state;

    messages.push(message);

    this.setState({
      messages: messages
    });
  };

  handleUserStartedTyping = user => {
    this.setState({
      isUserTyping: true,
      typingUser: user
    });
  }

  handleUserStoppedTyping = () => {
    this.setState({
      isUserTyping: false,
      typingUser: null
    });
  }

  render() {
    const currentUserId = this.props.currentUser.id;
    const { chatMessage, isUserTyping, messages, typingUser } = this.state;
    
    let typingClassName = "chat-typing-message";
    if (isUserTyping && typingUser) {
      typingClassName += " chat-typing-message__visible"
    }

    return (
      <article className="chat">
        <div className="chat-window">
          <ul className="chat-list">
            {messages.map((item, index) => (
              <ChatMessage
                key={`${item.senderId}_${index}`}
                currentUserId={currentUserId}
                message={item}
              />
            ))}
          </ul>
          <span className={typingClassName}>{typingUser && `${typingUser.name}`} is typing...</span>
        </div>
        <form className="chat-form" onSubmit={this.handleChatSubmit}>
          <label className="chat-form__label" htmlFor="chatMessage">
            Message
          </label>
          <textarea
            className="chat-form__input"
            id="chatMessage"
            name="chatMessage"
            placeholder="Your message"
            rows="2"
            value={chatMessage}
            onChange={this.handleInputChange}
          />
          <button className="chat-form__button" type="submit">
            Send
          </button>
        </form>
      </article>
    );
  }
}

export default Chat;
