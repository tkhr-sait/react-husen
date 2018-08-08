import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import './Husen.css'

const source = {
  beginDrag(props) {
    return props
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

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
  
  render() {
  const { connectDragSource, title } = this.props;
  return connectDragSource(
    <div className="Husen" style={this.getStyles(this.props)}>
      {title}
    </div>
  )}
}
Husen.propTypes = propTypes;
export default DragSource(ItemTypes.HUSEN, source, collect)(Husen);
