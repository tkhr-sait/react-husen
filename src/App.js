import React, { Component } from 'react'
import { Container, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import HusenBoard from './components'
import Dateformat from 'dateformat'
import './App.css'


class App extends Component {
  getIP(){
    var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
    Promise.all([findIP]).then(ip => this.setState({ip: ip})).catch(e => alert(e))
  }
  constructor(props){
    super(props)
    this.getIP()
    this.state = {
      notes: [
        {
          title: "test1"
        },
        {
          id: "2",
          title: "",
          description: "description",
          x: 64,
          y: 32,
          items: {user: "test2",timestamp: "2000-01-01 00:00:00"}
        }
      ],
      modal: false,
      target: {},
      title: "",
      description: ""
    }
  }
  // husen event
  handleNoteClick(note){
    this.setState({
      target: note,
      title: note.title,
      description: note.description
    })
    // show modal
    this.toggle()
  }
  handleNoteAdd(note){
  }
  handleNoteDelete(note){
  }
  handleNotesChange(notes){
    this.setState({notes: notes})
  }
  handleNoteInitialize(note){
    // additional items
    note.items.user = note.items.user ? note.items.user : this.state.ip
    note.items.timestamp = note.items.timestamp ? note.items.timestamp : Dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
    return note
  }
  handleNoteRendarText(note){
    return(<div style={{height:"100%",width:"100%",position: "relative"}}>
             <h6 style={{backgroundColor:"rgba(32,192,32,0.3)"}}>{note.title}</h6>
             <span>{note.description}</span>
             <span style={{fontSize: "50%",right:0,bottom:0,position: "absolute"}}>
               {note.items.timestamp}
             </span>
           </div>)
  }
  handleNoteRendarTooltip(note){
    return note.id + "\n" + note.items.user
  }
  handleContainerRendarLabel(container){
    return(
    <h2 style={{margin: "0.2em 0.4em"}}>
      {container.props.label}
      <Button onMouseUp={container.addNewNote.bind(container)} style={{right: 0,top: 0, position: "absolute"}}>Add New Husen</Button>
    </h2>)
  }

  // modal events
  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleTitleChange(e){
    this.setState({title: e.target.value})
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value})
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
    this.setState({notes: newNotes})
    this.toggle()
  }
  handleDelete(){
    let newNotes = this.state.target.container.state.notes.filter(n => {
      if (this.state.target.id !== n.id) {
        return n
      }
    })
    this.setState({notes: newNotes})
    this.toggle()
  }

  render() {
    return (
      <div className="App">
        <div className="a">
          <HusenBoard
           label="customize" 
           color="lightgreen"
           defaultTitle="入力してください"
           defaultDescription="詳細を入力してください"
           addButton={true}
           deleteButton={false}
           onNoteClick={this.handleNoteClick.bind(this)}
           onNoteAdd={this.handleNoteAdd.bind(this)}
           onNoteDelete={this.handleNoteDelete.bind(this)}
           onNotesChange={this.handleNotesChange.bind(this)}
           onNoteInitialize={this.handleNoteInitialize.bind(this)}
           onNoteRendarText={this.handleNoteRendarText.bind(this)}
           onNoteRendarTooltip={this.handleNoteRendarTooltip.bind(this)}
           onContainerRendarLabel={this.handleContainerRendarLabel.bind(this)}
           notes={this.state.notes} />
        </div>
        <div className="b">
          <HusenBoard label="minimal" />
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
