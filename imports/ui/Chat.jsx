/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages.js';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import '../style/Chat.css';
/* eslint-enable no-unused-vars */

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      comment: ''
    };
  }

  toggleHidden() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  updateComment(comment) {
    this.setState({
      comment
    });
  }

  addComent() {
    // console.log('adding comment: ' + this.state.comment);
  }

  render() {
    return this.state.hidden ? (
      <div className="panel panel-primary">
        <div className="panel-heading" id="accordion" onClick={ () => { this.toggleHidden(); } }>
          <span className="fa fa-comments"></span> Chat
          <span className="pull-right fa fa-caret-down"/>
        </div>
      </div>
    ) : (
      <div className="panel panel-primary">
        <div className="panel-heading" id="accordion">
          <span className="fa fa-comments"></span> Chat
          <span
            className="pull-right fa fa-caret-up"
            onClick={ () => { this.toggleHidden(); } }
          />
        </div>
        <div className="panel-body">
          <ul className="chat">
          {
            this.props.messages.map( (msg) => {
              <ChatMsg
                message={msg}
              />;
            })
          }
          </ul>
        </div>
        <div className="panel-footer">
          <div className="input-group">
            <input id="btn-input"
              type="text"
              className="form-control input-sm"
              placeholder="Escribe tu mensaje..."
              onChange={ (e) => this.updateComment(e.target.value) }
            />
            <span className="input-group-btn">
              <button
                className="btn btn-warning btn-sm"
                onClick={ () => this.addComent() }
              >
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  event: PropTypes.string,
  messages: PropTypes.array,
};

export default createContainer( props => {
  Meteor.subscribe('messages');
  console.log(props.event);
  return {
    messages: Messages.find({}).fetch()
  };
}, Chat);
