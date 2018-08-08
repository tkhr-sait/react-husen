import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Uuid from 'uuid'
import Husen from './Husen'

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: props.notes,
			id: Uuid.v1()
    }
	}
	 
	updateNoteState(notes) {
		this.setState({
			notes: notes
		})
	}
	 
	moveNote(source, component) {
		let notes = source.notes.filter(note => note.id !== source.id);
		source.updateNoteState(notes);
		notes = [].concat(component.state.notes, source);
		component.updateNoteState(notes);
	}
	moveNoteXY(source,x,y) {
		let notes = source.notes.map(note => {
			if ( note.id === source.id ) {
				let newNote = Object.assign({},note)
				newNote.x = x
				newNote.y = y
				return newNote
			}
			return note
		})
		source.updateNoteState(notes);
	}
	
	render() {
		const notes = this.state.notes.map(note => {
			return (
			<Husen
				id={note.id ? note.id : Uuid.v1()}
				title={note.title}
				description={note.description}
				x={note.x}
				y={note.y}
				color={this.props.color}
				boardId={this.state.id}
				notes={this.state.notes}
				updateNoteState={this.updateNoteState.bind(this)}
			/>
			)
		})
    const { connectDropTarget } = this.props;
 		return connectDropTarget(
		  <div className="Container">
		  	{this.props.label}
			{notes}
		  </div>
		)
	}
}

export default DropTarget(
  ItemTypes.HUSEN,
  {
	  drop(props, monitor, component) {
			if (!component) {
				return
			}
			const delta = monitor.getDifferenceFromInitialOffset()
			const item = monitor.getItem()
      if ( item.boardId === component.state.id ) {
				let x = Math.round(item.x + delta.x)
				let y = Math.round(item.y + delta.y)
				// snap to grid
				x = Math.round(x / 16) * 16
				y = Math.round(y / 16) * 16
				component.moveNoteXY(item, x, y);
			} else {
				component.moveNote(item, component);
			}	
	  },
	},
  (connect, monitor) => ({
	  connectDropTarget: connect.dropTarget()
	}))(Container);