import React, { Component } from 'react'
import { Container, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import HusenBoard from './components'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      notesA: [
        {
          title: "test1",
          description: ""
        },
        {
          id: "2",
          title: "test2",
          description: "",
          x: 64,
          y: 32
        }
      ],
      notesB: [
        {
          id: "3",
          title: "test3",
          description: "text",
          x: 32,
          y: 32
        },
        {
          id: "4",
          title: "test4",
          description: "text",
          x: 64,
          y: 32
        }
      ],
      modal: false,
      target: {},
      title: "",
      description: ""
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleNoteClick(note){
    this.setState({
      target: note,
      title: note.title,
      description: note.description
    })
    this.toggle()
  }
  handleSave(){
    let newNotes = this.state.target.container.state.notes.map(n => {
      if (this.state.target.id === n.id) {
        let newNote = Object.assign({},this.state.target)
        newNote.title = this.state.title
        newNote.description = this.state.description
        return newNote
      }
      return n
    })
    let notesId = "notesB"
    let current = this.state.notesA.filter(note => {
      if (note.id === this.state.target.id) {
        return note
      }
    })
    if (current.length > 0) {
      notesId = "notesA"
    }
    this.setState({[notesId]: newNotes})
    this.toggle()
  }
  handleDelete(){
    let newNotes = this.state.target.container.state.notes.filter(n => {
      if (this.state.target.id !== n.id) {
        return n
      }
    })
    let notesId = "notesB"
    let current = this.state.notesA.filter(note => {
      if (note.id === this.state.target.id) {
        return note
      }
    })
    if (current.length > 0) {
      notesId = "notesA"
    }
    this.setState({[notesId]: newNotes})
    this.toggle()
  }
  handleNoteAdd(note){
  }
  handleNoteDelete(note){
  }
  handleNotesAChange(notes){
    this.setState({notesA: notes})
  }
  handleNotesBChange(notes){
    this.setState({notesB: notes})
  }
  handleTitleChange(e){
    this.setState({title: e.target.value})
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
  }
  render() {
    return (
      <div className="App">
        <div className="a">
          <HusenBoard
           label="A" 
           color="lightgreen"
           defaultTitle="入力してください"
           defaultDescription="詳細を入力してください"
           onNoteClick={this.handleNoteClick.bind(this)}
           onNoteAdd={this.handleNoteAdd.bind(this)}
           onNoteDelete={this.handleNoteDelete.bind(this)}
           onNotesChange={this.handleNotesAChange.bind(this)}
           notes={this.state.notesA} />
        </div>
        <div className="b">
          <HusenBoard
           label="B" 
           color="lightpink"
           onNoteClick={this.handleNoteClick.bind(this)}
           onNoteAdd={this.handleNoteAdd.bind(this)}
           onNoteDelete={this.handleNoteDelete.bind(this)}
           onNotesChange={this.handleNotesBChange.bind(this)}
           notes={this.state.notesB} />
        </div>
        <Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} fullHeight position="right">
            <ModalHeader toggle={this.toggle.bind(this)}>Edit</ModalHeader>
            <ModalBody>
              <Input
               label="title"
               onChange={this.handleTitleChange.bind(this)}
               value={this.state.title} />
              <Input
               type="textarea"
               label="description"
               onChange={this.handleDescriptionChange.bind(this)}
               value={this.state.description} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleDelete.bind(this)}>Delete</Button>
              <Button color="secondary" onClick={this.toggle.bind(this)}>Close</Button>
              <Button color="primary" onClick={this.handleSave.bind(this)}>Save</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    )
  }
}

export default App;
