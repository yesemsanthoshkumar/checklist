import React, {Component} from 'react';
import SkyLight from 'react-skylight';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import 'normalize.css';

import RedoList from "./components/redoList";
import AddNewTask from "./components/AddNewTask";

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedRedo: [],
			active: -1,
			creatingNewTask: {
				status: false,
				taskName: '',
				taskDesc: ''
			}
		}
		this.getSingleRedo = this.getSingleRedo.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.OnInputChange = this.OnInputChange.bind(this);
	}

	componentWillMount() {
		fetch("http://localhost:15000/checklists/",{
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

	getSingleRedo(redoObj){
		fetch("http://localhost:15000/checklists/" + redoObj.id)
		.then(res=>res.json())
		.then(data=>{
			const redoArr = [];
			let targeted = -1;
			for (let idx = 0; idx < this.state.savedRedo.length; idx++) {
				const element = this.state.savedRedo[idx];
				if (element.id === redoObj.id) {
					redoArr.push({
						...element,
						tasks: data.value
					});
					targeted = idx;
					console.log("Active change ", targeted);
				} else {
					redoArr.push({...element});
				}
			}
			this.setState({
				active: targeted,
				savedRedo: redoArr
			})
			console.log("State: ", this.state);
			
			this.redoModal.show()
		})
	}

	OnInputChange(event) {
		console.log("Change", event.target.value);
		const inputName = event.target.name;
		const inputVal = event.target.value;

		this.setState({
			creatingNewTask: {
				...this.state.creatingNewTask,
				[inputName]: inputVal
			}
		})
		
	}

	addNewTask(rId) {
		console.log(rId, "<==RedoID");
		this.setState({
			creatingNewTask: {
				...this.state.creatingNewTask,
				status : true
			}
		})
		console.log("CRTStatus", this.state.creatingNewTask);
		// fetch("http://localhost:15000/addToRedo?redo=", rId)
	}

	render() {
		return (
			<div className="App container">
				<div className="header">
					<h1 className="header">Header</h1>
				</div>
				<div className="content-wrapper">
					<div className="sidebar">
							<RedoList
										redoArray={this.state.savedRedo}
							getRedo={this.getSingleRedo}
						/>
						{
							this.state.active !== -1 ?
							<SkyLight
							ref={ref=>this.redoModal = ref}
							title={<h2 className="modal-title">{this.state.savedRedo[this.state.active].name}</h2>}
							>
							<ListGroup>
							{
								this.state.savedRedo[this.state.active].tasks.map(x=>(
									<ListGroupItem
									key={x.id}
									header={x.name}
									className="task-wrapper"
									>
									{x.description}
									</ListGroupItem>
								))
							}
							<ListGroupItem>
								{
									this.state.creatingNewTask.status?
									<AddNewTask
										taskValue={this.state.creatingNewTask.taskName}
										taskDesc={this.state.creatingNewTask.taskDesc}
										onValueChange={this.OnInputChange}
										onButtonSubmit={this.addNewTask}
									/>
									:<div className="add-new" onClick={()=>this.addNewTask(this.state.savedRedo[this.state.active].id)}>
									<p>Add new task</p>
									</div>
								}
							</ListGroupItem>
							</ListGroup>
							</SkyLight> : ''
						}
						</div>
					<div className="toDay">
					
					<input type="text"/> 
						Today
					</div>
			</div>
        	</div>);
	}
}

export default App;
