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
    this.setState({
	    notes: this.convertNotes(nextProps.notes)
	  })
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
	  n.id = n.id ? n.id : Uuid.v1()
	  n.key = n.id
	  n.x = n.x ? n.x : 0
	  n.y = n.y ? n.y : 0
	  n.title = n.title ? n.title : ( this.props.defaultTitle ? this.props.defaultTitle : "title" )
	  n.description = n.description ? n.description : ( this.props.defaultDescription ? this.props.defaultDescription : "description")
		n.items = n.items ? n.items : {}
		if (typeof this.props.onNoteInitialize === 'function') {
			n = this.props.onNoteInitialize(n)
		}
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
	deleteNote(note){
		let notes = this.state.notes.filter(n => note.id !== n.id);
		this.updateNoteState(notes);
		if (typeof this.props.onNoteDelete === 'function') {
			this.props.onNoteDelete(note)
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
		// delete from source container
		let notes = source.container.state.notes.filter(note => note.id !== source.id);
		source.container.updateNoteState(notes);
		if (typeof source.container.props.onNoteDelete === 'function') {
			source.container.props.onNoteDelete(source)
		}
		// add to target component 
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
		let deleteButton = this.props.deleteButton === undefined ? true : this.props.deleteButton 

		const notes = this.state.notes.map(note => {
		  return (
			<Husen
				id={note.id}
				key={note.id}
				title={note.title}
				description={note.description}
				x={note.x}
				y={note.y}
				items={note.items}

				defaultTitle={this.props.defaultTitle}
				defaultDescription={this.props.defaultDescription}
				color={this.props.color}
				deleteButton={deleteButton}
				container={this}
				onNoteClick={this.props.onNoteClick}
				onNoteRendarText={this.props.onNoteRendarText}
				onNoteRendarTooltip={this.props.onNoteRendarTooltip}
			/>
		  )
		})
		this.state.rendarAddButton=""
		if (this.props.addButton !== false) {
      this.state.rendarAddButton=(
			  <span title="add note." style={{right: "0.4em",top: "0.2em", position: "absolute", cursor: "pointer"}} onClick={this.addNewNote.bind(this)}>
			    +
			  </span>)
		}
		this.state.rendarLabel=(
		  <h2 style={{margin: "0.2em 0.4em"}}>
		    {this.props.label}
		    {this.state.rendarAddButton}
			</h2>)
		if (typeof this.props.onContainerRendarLabel === 'function') {
			this.state.rendarLabel = this.props.onContainerRendarLabel(this)
		}
		const { connectDropTarget } = this.props;
 		return connectDropTarget(
		  <div className="Container" style={{position:"relative"}}>
				{this.state.rendarLabel}
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