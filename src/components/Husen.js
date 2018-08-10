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
  
  handleClick(){
    if (typeof this.props.onNoteClick === 'function') {
      this.props.onNoteClick(this.props)
    }
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

    return connectDragSource(
      <div
       className="Husen" 
       style={this.getStyles(this.props)}
       title={tooltip}
       onClick={this.handleClick.bind(this)}
       >
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
