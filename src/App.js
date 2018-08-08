import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      notesA: [
        {
          id: 1,
          title: "test1",
          description: "text",
          x: 32,
          y: 32
        },
        {
          id: 2,
          title: "test2",
          description: "text",
          x: 64,
          y: 32
        }
      ],
      notesB: [
        {
          id: 3,
          title: "test3",
          description: "text",
          x: 32,
          y: 32
        },
        {
          id: 4,
          title: "test4",
          description: "text",
          x: 64,
          y: 32
        }
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <div className="a">
          <Board
           label="A" 
//           color="lightgreen"
           notes={this.state.notesA} />
        </div>
        <div className="b">
          <Board label="B" 
           color="lightpink"
           notes={this.state.notesB} />
        </div>
      </div>
    )
  }
}

export default App;
