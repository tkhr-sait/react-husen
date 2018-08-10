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
          description: "",
          items: {user: "test1",timestamp: "2018/08/10 12:34:56"}
        },
        {
          id: "2",
          title: "test2",
          description: "",
          x: 64,
          y: 32,
          items: {user: "test2",timestamp: "2000/01/01 00:00:00"}
        }
      ],
      notesB: [
        {
          id: "3",
          title: "test3",
          description: "text",
          x: 32,
          y: 32,
          items: {user: "test3"}
        },
        {
          id: "4",
          title: "test4",
          description: "text",
          x: 64,
          y: 32,
          items: {user: "test4"}
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
  handleNoteInitialize(note){
    let user = window.navigator.userAgent
    note.items = {user: user,timestamp: "2018/08/10 12:34:56"}
    return note
  }
  handleNoteRendarText(note){
    return(<div style={{height:"100%",width:"100%",position: "relative"}}>
             <span>{note.title}</span>
             <span style={{fontSize: "50%",right:0,bottom:0,position: "absolute"}}>
               {note.items.timestamp}
             </span>
           </div>)
  }
  handleNoteRendarTooltip(note){
    return note.items.user + " wrote:\n" + note.description
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
           onNoteInitialize={this.handleNoteInitialize.bind(this)}
           onNoteRendarText={this.handleNoteRendarText.bind(this)}
           onNoteRendarTooltip={this.handleNoteRendarTooltip.bind(this)}
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
               value={this.state.title}
               />
              <Input
               type="textarea"
               label="description"
               onChange={this.handleDescriptionChange.bind(this)}
               value={this.state.description} 
               />
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
