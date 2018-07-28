import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

window.redoId = 0;

class Redo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myRedo: [],
      redoToday: []
    };

    this.APIURL = "http://127.0.0.1:15000"
  }

  componentDidMount(){
    axios.get(this.APIURL + '/checklists')
      .then(resp=>{
        this.setState({
          myRedo: resp.data.value
        })
      });
  }

  addNewRedo(newRedo) {
    // return (
    //   <div classname='newRedoForm'>
    //   <NewRedoForm/>
    //   </div>
    // );
    const redo = {
      name: newRedo,
      id: window.redoId++
    };

    this.state.myRedo.push(redo);
    console.log(this.state.myRedo);
  }

  addToday(redo) {
    this.state.redoToday.push(redo);
    console.log(this.state.redoToday);
  }

  render() {
    return (
      <div className="Redo">
        <div className="sidebar-content">
          <div className="user-details">
            Username
          </div>
          <div className="redo-list">
          <RedoList
            redos={this.state.myRedo}
            addToday={this.addToday.bind(this)}
            />
          </div>
          <AddNewRedo addNewRedo={this.addNewRedo.bind(this)}/>
        </div>
        <div className="content-wrapper">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <AppTitle/>
          </header>
        </div>
      </div>
    );
  }
}

const AppTitle = () => {
  return (
    <h1 className="App-title">Welcome to Redo</h1>
  );
}

function AddNewRedo({addNewRedo}) {

  let input = '';

  return (
    <div>
      <input ref={node=>{
        input=node
      }}/>
      <button onClick={()=>{
        addNewRedo(input.value);
        input = '';
      }}>
        +
      </button>
    </div>
  );
}

const Checklist = ({redo, addToday}) =>{
  return (
    <li onClick={()=>addToday(redo)}>{redo.name}</li>
  );
}

const RedoList = ({redos, addToday}) =>{

  return (
    <ul>
      {redos.map(redoItem => <Checklist redo={redoItem} key={redoItem.id} addToday={addToday}/>)}
    </ul>
  );
}

class NewRedoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'name': '',
      'tasks': [],
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    this.state({name: event.target[0].value});
  }
  render() {
    return (
      <div>
        <form>
          <label>
            Checklist Name
          <input type="text" value={this.state.name} onChange={this.changeHandler}/>
          this.state.tasks.foreach(task=>{
            <NewRedoTask name={this.task}/>
          })
          </label>
        </form>
      </div>
    );
  }
}

function NewRedoTask({task}) {
  return <input value={task}/>;
}

export default Redo;
