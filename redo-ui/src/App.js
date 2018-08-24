import React, { Component } from 'react';
import './App.css';
import RedoList from "./components/redoList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedRedo: [],
      active: null
    }
    this.getSingleRedo = this.getSingleRedo.bind(this);
  }

  componentWillMount() {
    fetch("http://127.0.0.1:15000/checklists/",{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=> this.setState({
      savedRedo: data.value
    }))
    .catch(err=>console.log("Error requests", err));
  }

  getSingleRedo(id){
    fetch("http://127.0.0.1:15000/checklists/" + id)
    .then(res=>res.json())
    .then(data=>{
      const savedRedo = this.state.savedRedo.map(x=>{
        return {
          ...x,
          tasks: x.id===id?data.value: []
        }
      });
      this.setState({
        savedRedo: savedRedo,
        active: id
      })
    })
  }

  render() {
    return (
      <div className="App container">
        <p>Header</p>
        <div className="content-wrapper">
          <div className="side-content-wrapper">
            <RedoList
              redoArray={this.state.savedRedo}
              getRedo={this.getSingleRedo}
              active={this.state.active}
            />
          </div>
          <div className="main-content-wrapper">
            Today
          </div>
        </div>
      </div>
    );
  }
}

export default App;
