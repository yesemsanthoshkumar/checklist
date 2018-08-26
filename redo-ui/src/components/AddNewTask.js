import React, { Component } from "react";

class AddNewTask extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="add-new-form">
        <input
          name="taskName"
          placeholder="Task Name"
          value={this.props.taskValue}
          onChange={this.props.onValueChange}
        />
				<input
          name="taskDesc"
          placeholder="Description"
          value={this.props.taskDesc}
          onChange={this.props.onValueChange}
        />
        <button onClick={this.props.onButtonSubmit}>Update</button>
      </form>
    );
  }
}

export default AddNewTask;