import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Uuid from 'uuid'
import Husen from './Husen'

class Container extends Component {
	constructor(props) {
		super(props);
		let notes = this.convertNotes(props.notes)
		this.state = {
			notes: notes,
			id: Uuid.v1()
    }
		if (typeof this.props.onNotesChange === 'function') {
      this.props.onNotesChange(notes)
		}
	}
  componentWillReceiveProps(nextProps) {
		// TODO check id and emit add/delete event
		this.setState({
			notes: this.convertNotes(nextProps.notes)
		});
	}
	convertNotes(notes){
		let newNotes = []
		if (notes && notes.length) {
			newNotes = notes.map(note => {
				return this.convertNote(note)
			})
		}
    return newNotes
	}
	convertNote(note){
		let n = Object.assign({},note)
		n.id = note.id ? note.id : Uuid.v1()
		n.key = n.id
		n.x = note.x ? note.x : 0
		n.y = note.y ? note.y : 0
		// FIXME i18n
		n.title = note.title ? note.title : ( this.props.defaultTitle ? this.props.defaultTitle : "title" )
		n.description = note.description ? note.description : ( this.props.defaultDescription ? this.props.defaultDescription : "description")
		return n
  }

	addNewNote(){
		let note = this.convertNote({})
		let notes = this.state.notes.concat(note)
		this.updateNoteState(notes)
		if (typeof this.props.onNoteAdd === 'function') {
			this.props.onNoteAdd(note)
		}
	}
	updateNoteState(notes) {
		this.setState({
			notes: notes
		})
		if (typeof this.props.onNotesChange === 'function') {
      this.props.onNotesChange(notes)
		}
	}
	moveNote(source, component) {
		let notes = source.container.state.notes.filter(note => note.id !== source.id);
		source.container.updateNoteState(notes);
		if (typeof source.container.props.onNoteDelete === 'function') {
			source.container.props.onNoteDelete(source)
		}
		notes = [].concat(component.state.notes, source);
		component.updateNoteState(notes);
		if (typeof component.props.onNoteAdd === 'function') {
			component.props.onNoteAdd(source)
		}
	}
	moveNoteXY(source,x,y) {
		let notes = source.container.state.notes.map(note => {
			if ( note.id === source.id ) {
				let newNote = Object.assign({},note)
				newNote.x = x
				newNote.y = y
				return newNote
			}
			return note
		})
		source.container.updateNoteState(notes);
	}
	render() {
		const notes = this.state.notes.map(note => {
		  return (
			<Husen
				id={note.id}
				key={note.id}
				title={note.title}
				description={note.description}
				x={note.x}
				y={note.y}

				defaultTitle={this.props.defaultTitle}
				defaultDescription={this.props.defaultDescription}
				color={this.props.color}
				container={this}
				onNoteClick={this.props.onNoteClick}
			/>
		  )
		})
    const { connectDropTarget } = this.props;
 		return connectDropTarget(
		  <div className="Container">
		  	<h2>{this.props.label}<span style={{float: "right"}} onClick={this.addNewNote.bind(this)}>+</span></h2>
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
      if ( item.container.state.id === component.state.id ) {
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