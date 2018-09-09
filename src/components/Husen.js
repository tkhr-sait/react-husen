import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import './Husen.css'

class Husen extends Component {
  constructor(props){
    super(props)
    this.state = {
    	isWritable: false,
      title: this.props.title,
      description: this.props.description,
    }
  }
  componentWillReceiveProps(nextProps) {
    // FIXME
    if ( this.state.isWritable === false ) {
      this.setState({
        isWritable: false,
        title: nextProps.title,
        description: nextProps.description
      })
    } 
  }
  getStyles(props) {
    const { color, x, y, isDragging } = props
    const transform = `translate3d(${x}px, ${y}px, 0)`
  
    return {
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
  updateHusenState(e) {
 		this.setState({
			[e.target.name]: e.target.value
		})
		if (typeof this.props.onNoteUpdate === 'function') {
      let note = Object.assign({},this.props)
      if (e.target.name === "title") {
        note.title = e.target.value
      } else {
        note.description = e.target.value
      }
      this.props.onNoteUpdate(note)
		}
	}
  render() {
    const { connectDragSource } = this.props;
    let tooltip = ""
    if (typeof this.props.onNoteRendarTooltip === 'function') {
      tooltip = this.props.onNoteRendarTooltip(this.props)
    }
    let text = (
      this.state.isWritable ? (
        <div>
          <input name="title" type="text" style={{width:"90%"}} value={this.state.title} onChange={this.updateHusenState.bind(this)}/>
          <textarea name="description" style={{width:"90%"}} value={this.state.description} onChange={this.updateHusenState.bind(this)}/>
          <div style={{color: "rgb(255,255,255)",backgroundColor: "rgba(0,0,0,0.3)"}} onClick={() => this.setState({isWritable: !this.state.isWritable})}>close</div>
        </div>
      ) : ( 
       <div style={{width:"100%", height:"100%"}} onClick={() => this.setState({isWritable: !this.state.isWritable})}>
         {this.state.title}<br />
         {this.state.description}
       </div>
      )
    )
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
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}
export default DragSource(ItemTypes.HUSEN,  {
  beginDrag(props,monitor,component) {
    let note = Object.assign({},props)
    note.title = component.state.title
    note.description = component.state.description
    return note
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(Husen);

