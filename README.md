# react-husen

Overview  
[![npm version](https://badge.fury.io/js/react-husen.svg)](https://badge.fury.io/js/react-husen)  

## Description

husen(sticky note) for react

## Requirement

react  
react-dnd  
uuid  

## Install

```
npm i react-husen
```

## Usage

### minimal

```
import React, { Component } from 'react';
import HusenBoard from 'react-husen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HusenBoard />
      </div>
    );
  }
}

export default App;
```

### customize

```
import React, { Component } from 'react';
import HusenBoard from 'react-husen';
import './App.css';

class App extends Component {
  constructor(props){}
    this.state = {
      notes: [
        {
          title: "test1"
        },
        {
          id: "2",
          title: "test2",
          description: "description",
          x: 64,
          y: 32,
          items: {user: "test2",timestamp: "2000-01-01 00:00:00"}
        }
      ]
    }
  }

  // husen event
  handleNoteClick(note){
  }
  handleNoteAdd(note){
  }
  handleNoteDelete(note){
  }
  handleNotesChange(notes){
    // update state
    this.setState({notes: notes})
  }
  handleNoteInitialize(note){
    // additional items
    note.items.user = note.items.user ? note.items.user : "unknown user"
    note.items.timestamp = note.items.timestamp ? note.items.timestamp : "2000-01-01 00:00:00"
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
    return note.id + "\n" + note.items.user + " wrote:\n" + note.description
  }
  handleContainerRendarLabel(container){
    return(
    <h2 style={{margin: "0.2em 0.4em"}}>
      {container.props.label}
      <button onMouseUp={container.addNewNote.bind(container)} style={{right: 0,top: 0, position: "absolute"}}>Add New Husen</button>
    </h2>)
  }

  render() {
    return (
      <div className="App">
        <HusenBoard 
           label="customize" 
           color="lightgreen"
           defaultTitle="please input title"
           defaultDescription="please input description"
           addButton={false}
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
        />
      </div>
    )
  }
}

export default App;
```

### develop

```
git clone https://github.com/tkhr-sait/react-husen.git
cd react-husen
npm i
npm start
```

## Licence

Apache License 2.0

## Author

[tkhr.sait](https://github.com/tkhr-sait)

## Feature

### drag & drop

### husen events

### additional info

### inline edit

## Todo

* [x] drag & drop
* [x] move
* [x] delete button@demo
* [x] edit title/descriotion@demo
* [x] event
* [x] component package
* [x] deploy demo
* [x] additional info
* [x] customize note
* [x] add button@demo
* [x] inline edit
* [ ] improve style
* [ ] save
* [ ] refactoring
* [ ] redux

