import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import Container from './Container'
import './Board.css'

class Board extends Component {
  render() {
    return (
      <div className="Board">
        <Container
         label={this.props.label}
         color={this.props.color}
         notes={this.props.notes}/>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board);