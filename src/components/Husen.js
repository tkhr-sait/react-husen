import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import './Husen.css'

class Husen extends Component {
  getStyles(props) {
    const { color, x, y, isDragging } = props
    const transform = `translate3d(${x}px, ${y}px, 0)`
  
    return {
      position: 'static',
      transform,
      backgroundColor: color ? color : 'lightyellow',
      WebkitTransform: transform,
      opacity: isDragging ? 0 : 1,
      height: isDragging ? 0 : '',
    }
  }
  
  handleNoteClick(e){
    if (typeof this.props.onNoteClick === 'function') {
      this.props.onNoteClick(this.props)
    }
  }
  handleDeleteClick(e){
    this.props.container.deleteNote(this.props)
    e.stopPropagation()
  }
  render() {
    const { connectDragSource, title, description } = this.props;
    let tooltip = description
    if (typeof this.props.onNoteRendarTooltip === 'function') {
      tooltip = this.props.onNoteRendarTooltip(this.props)
    }
    let text = title
    if (typeof this.props.onNoteRendarText === 'function') {
      text = this.props.onNoteRendarText(this.props)
    }
    let deleteButton = ""
    if (this.props.deleteButton === true) {
      deleteButton = (<span title="delete note." style={{fontSize:"150%",top:0,right:"5px",position:"absolute",zIndex:1,cursor: "pointer"}} onClick={this.handleDeleteClick.bind(this)}>×</span>)
    }
    return connectDragSource(
      <div
        className="Husen" 
        style={this.getStyles(this.props)}
        title={tooltip}
        onClick={this.handleNoteClick.bind(this)}
      >
        {deleteButton}
        {text}
      </div>
    )
  }
}

Husen.propTypes = {
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}
export default DragSource(ItemTypes.HUSEN,  {
  beginDrag(props) {
    return props
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(Husen);
